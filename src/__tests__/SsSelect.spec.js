import { mount } from '@vue/test-utils'
import SsSelect from '../components/SsSelect'
import SsSelectOption from '../components/SsSelectOption'
import SsSelectSearchInput from '../components/SsSelectSearchInput'
import SsSelectPlaceholder from '../components/SsSelectPlaceholder'

window.HTMLElement.prototype.scrollIntoView = function() {};

describe('SsSelect', () => {
    let songs = [
        { name: 'Californication', disabled: false },
        { name: 'By the Way', disabled: false },
        { name: 'Fortube Faded', disabled: true },
        { name: 'Make You Feel Better', disabled: false },
    ]

    let wrapper, vm

    let click = (selector) => {
        let element = selector ? wrapper.find(selector) : wrapper
        element.trigger('click')
    }

    let type = (selector, text) => {
        let input = wrapper.find(selector)
        input.element.value = text
        input.trigger('input')
    }

    let keydown = key => {
        wrapper.trigger('keydown.' + key)
    }

    beforeEach(() => {
      wrapper = mount(SsSelect, {
          //  if search y is not provided then bugs appear in search algorithm
          propsData: { options: songs, trackBy: 'name', searchBy: 'name' },
          stubs: { SsSelectOption, SsSelectSearchInput, SsSelectPlaceholder },
          scopedSlots: {
              default: `
                  <div slot-scope="{ filteredOptions, selectedOption, isOpen, $selected, $get, $reset }">
                      <ss-select-placeholder class="selected-option placeholder">
                          {{ $get(selectedOption, 'name') }}
                          <button class="reset-button" @click="$reset"></button>
                      </ss-select-placeholder>

                      <div v-show="isOpen" class="dropdown-list">
                          <ss-select-search-input class="search-input"></ss-select-search-input>
                          <ss-select-option v-for="(song, index) in filteredOptions" :index="index" :value="song" :key="song.name" class="option">
                              {{ song.name }}
                          </ss-select-option>
                      </div>
                  </div>
              `
          }
      })

      vm = wrapper.vm
    })

    it('can render options', () => {
        songs.forEach(song => expect(wrapper.html()).toContain(song.name))
    })

    it('can select options on click', () => {
        expect(vm.selectedOption).toBe(null)

        click('.option')

        expect(vm.selectedOption.name).toBe(songs[0].name)
    })

    it('can select options on enter key press', () => {
        expect(vm.selectedOption).toBe(null)

        click('.placeholder')
        keydown('enter')
        expect(vm.selectedOption.name).toBe(songs[0].name)
    })

    it('opens when placeholder is clicked and closes when option is selected', () => {
        expect(vm.isOpen).toBe(false)
        click('.placeholder')

        expect(vm.isOpen).toBe(true)

        click('.option')
        expect(vm.isOpen).toBe(false)
    })

    it('closes on escape key press', () => {
        expect(vm.isOpen).toBe(false)
        click('.placeholder')

        expect(vm.isOpen).toBe(true)

        keydown('esc')
        expect(vm.isOpen).toBe(false)
    })

    it('closes on outclick', () => {
        //
    })

    it('can filter options', () => {
        expect(vm.filteredOptions.length).toBe(songs.length)

        type('.search-input', songs[0].name)

        expect(vm.filteredOptions.length).toBe(1)
        expect(vm.filteredOptions[0].name).toBe(songs[0].name)
    })

    it('changes pointer index when option is being hovered', () => {
        expect(vm.pointerIndex).toBe(0)

        wrapper.findAll('.option').at(1).trigger('mouseover')

        expect(vm.pointerIndex).toBe(1)
    })

    it('changes pointer index on navigating using arrow keys', () => {
        expect(vm.pointerIndex).toBe(0)

        keydown('down')
        expect(vm.pointerIndex).toBe(1)

        keydown('up')
        expect(vm.pointerIndex).toBe(0)
    })

    it('skips disabled options when navigating using arrow keys', () => {
        expect(vm.pointerIndex).toBe(0)

        keydown('down')
        expect(vm.pointerIndex).toBe(1)

        keydown('down')
        expect(vm.pointerIndex).toBe(3)
    })

    it('sets last option as active before first', () => {
        expect(vm.pointerIndex).toBe(0)

        keydown('up')

        expect(vm.pointerIndex).toBe(vm.filteredOptions.length - 1)
    })

    it('sets first option as active after last', () => {
        expect(vm.pointerIndex).toBe(0)
        keydown('down')
        keydown('down')
        keydown('down')
        expect(vm.pointerIndex).toBe(0)
    })

    it('emits open and close events', () => {
        click('.placeholder')
        expect(wrapper.emitted().open).toBeTruthy();

        keydown('esc')
        expect(wrapper.emitted().close).toBeTruthy()
    })

    it('emits change event on select', () => {
        click('.placeholder')

        click('.option')

        expect(wrapper.emitted().change).toBeTruthy()
        expect(wrapper.emitted().change[0][0].name).toBe(songs[0].name)
    })

    it('can reset selected option', () => {
        expect(vm.selectedOption).toEqual(null)
        click('.option')
        expect(vm.selectedOption.name).toBe(songs[0].name)
        click('.reset-button')
        expect(vm.selectedOption).toEqual(null)
    })

    it('resets pointer index when filtered options are updated', () => {
        keydown('down')
        expect(vm.pointerIndex).toBe(1)

        type('.search-input', songs[0].name)
        expect(vm.pointerIndex).toBe(0)
    })
})
