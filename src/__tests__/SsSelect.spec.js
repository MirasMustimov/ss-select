import { mount } from '@vue/test-utils'
import SsSelect from '../SsComponents/SsSelect'
import SsOption from '../SsComponents/SsOption'
import SsSearchInput from '../SsComponents/SsSearchInput'
import SsPlaceholder from '../SsComponents/SsPlaceholder'

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
          stubs: { SsOption, SsSearchInput, SsPlaceholder },
          scopedSlots: {
              default: `
                  <div slot-scope="{ filteredOptions, selectedOption, isOpen, $selected, $get }">
                      <ss-placeholder class="selected-option placeholder">
                          {{ $get(selectedOption, 'name') || 'Select a song' }}
                      </ss-placeholder>

                      <div v-show="isOpen" class="dropdown-list">
                          <ss-search-input class="search-input"></ss-search-input>
                          <ss-option v-for="(song, index) in filteredOptions" :index="index" :value="song" :key="song.name" class="option">
                              {{ song.name }}
                          </ss-option>
                      </div>
                  </div>
              `
          }
      })

      vm = wrapper.vm
    });

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

    it('changes active option index when option is being hovered', () => {
        expect(vm.activeOptionIndex).toBe(0)

        wrapper.findAll('.option').at(1).trigger('mouseover')

        expect(vm.activeOptionIndex).toBe(1)
    })

    it('changes active option index on navigating using arrow keys', () => {
        expect(vm.activeOptionIndex).toBe(0)

        keydown('down')
        expect(vm.activeOptionIndex).toBe(1)

        keydown('up')
        expect(vm.activeOptionIndex).toBe(0)
    })

    it('skips disabled options when navigating using arrow keys', () => {
        expect(vm.activeOptionIndex).toBe(0)

        keydown('down')
        expect(vm.activeOptionIndex).toBe(1)

        keydown('down')
        expect(vm.activeOptionIndex).toBe(3)
    })

    it('sets last option as active before first', () => {
        expect(vm.activeOptionIndex).toBe(0)

        keydown('up')

        expect(vm.activeOptionIndex).toBe(vm.filteredOptions.length - 1)
    })

    it('sets first option as active after last', () => {
        expect(vm.activeOptionIndex).toBe(0)
        keydown('down')
        keydown('down')
        keydown('down')
        expect(vm.activeOptionIndex).toBe(0)
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
})
