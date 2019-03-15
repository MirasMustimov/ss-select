import { mount } from '@vue/test-utils'
import SsSelect from '../components/SsSelect'
import SsSelectOption from '../components/SsSelectOption'
import SsSelectSearchInput from '../components/SsSelectSearchInput'
import SsSelectToggle from '../components/SsSelectToggle'

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
          propsData: { options: songs, trackBy: 'name', searchBy: 'name', multiple: true },
          stubs: { SsSelectOption, SsSelectSearchInput, SsSelectToggle },
          scopedSlots: {
              default: `
                  <div slot-scope="{ filteredOptions, selectedOption, isOpen, $selected, $get, $reset }">
                      <ss-select-toggle class="selected-option placeholder">
                          {{ $get(selectedOption, 'name') }}
                          <button class="reset-button" @click="$reset"></button>
                      </ss-select-toggle>

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

    it('can select multiple options', () => {
        expect(vm.selectedOption).toEqual([])

        click('.option')

        expect(vm.selectedOption.length).toBe(1)
        expect(vm.selectedOption[0]['name']).toBe('Californication')

        wrapper.findAll('.option').at(1).trigger('click')
        expect(vm.selectedOption.length).toBe(2)
    })

    it('can unselect options by clicking on them', () => {
        expect(vm.selectedOption).toEqual([])
        click('.option')
        expect(vm.selectedOption.length).toBe(1)
        click('.option')
        expect(vm.selectedOption).toEqual([])
    })

    it('can reset options', () => {
        expect(vm.selectedOption).toEqual([])
        click('.option')
        expect(vm.selectedOption.length).toBe(1)
        click('.reset-button')
        expect(vm.selectedOption).toEqual([])
    })
})
