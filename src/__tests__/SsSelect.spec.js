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

    let wrapper

    beforeEach(() => {
      wrapper = mount(SsSelect, {
          propsData: { options: songs, trackBy: 'name', searchBy: 'name' },
          //  if search y is not provided then bugs appear in search algorithm

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
    });

    it('can render options', () => {
        songs.forEach(song => expect(wrapper.html()).toContain(song.name))
    })

    it('can select options', () => {
        expect(wrapper.find('.selected-option').html()).toContain('Select a song')

        wrapper.find('.option').trigger('click')

        expect(wrapper.vm.selectedOption.name).toBe(songs[0].name)
    })

    it('opens when placeholder is clicked and closes when option is selected', () => {
        expect(wrapper.vm.isOpen).toBe(false)
        wrapper.find('.placeholder').trigger('click')

        expect(wrapper.vm.isOpen).toBe(true)

        wrapper.find('.option').trigger('click')
        expect(wrapper.vm.isOpen).toBe(false)
    })

    it('can filter options', () => {
        expect(wrapper.vm.filteredOptions.length).toBe(songs.length)

        wrapper.find('.search-input').element.value = songs[0].name
        wrapper.find('.search-input').trigger('input')

        expect(wrapper.vm.filteredOptions.length).toBe(1)
        expect(wrapper.vm.filteredOptions[0].name).toBe(songs[0].name)
    })

    it('changes active option index when option is being hovered', () => {
        expect(wrapper.vm.activeOptionIndex).toBe(0)

        wrapper.findAll('.option').at(1).trigger('mouseover')

        expect(wrapper.vm.activeOptionIndex).toBe(1)
    })

    it('changes active option index on navigating using arrow keys', () => {
        expect(wrapper.vm.activeOptionIndex).toBe(0)

        wrapper.trigger('keydown.down')
        expect(wrapper.vm.activeOptionIndex).toBe(1)

        wrapper.trigger('keydown.up')
        expect(wrapper.vm.activeOptionIndex).toBe(0)
    })

    it('skips disabled options when navigating using arrow keys', () => {
        expect(wrapper.vm.activeOptionIndex).toBe(0)

        wrapper.trigger('keydown.down')
        expect(wrapper.vm.activeOptionIndex).toBe(1)

        wrapper.trigger('keydown.down')
        expect(wrapper.vm.activeOptionIndex).toBe(3)
    })

    it('sets last option as active before first', () => {
        expect(wrapper.vm.activeOptionIndex).toBe(0)

        wrapper.trigger('keydown.up')

        expect(wrapper.vm.activeOptionIndex).toBe(wrapper.vm.filteredOptions.length - 1)
    })

    it('sets first option as active after last', () => {
        expect(wrapper.vm.activeOptionIndex).toBe(0)
        wrapper.trigger('keydown.down')
        wrapper.trigger('keydown.down')
        wrapper.trigger('keydown.down')
        expect(wrapper.vm.activeOptionIndex).toBe(0)
    })
})
