import { mount } from '@vue/test-utils'
import SsSelect from '../src/components/SsSelect'
import SsSelectOption from '../src/components/SsSelectOption'
import SsSelectSearchInput from '../src/components/SsSelectSearchInput'
import SsSelectToggle from '../src/components/SsSelectToggle'

let options = [
    { name: 'Californication', disabled: false },
    { name: 'By the Way', disabled: false },
    { name: 'Fortune Faded', disabled: true },
    { name: 'Make You Feel Better', disabled: false },
]

let click = (wrapper, selector) => {
    let element = selector ? wrapper.find(selector) : wrapper
    element.trigger('click')
}

let keydown = (wrapper, key) => {
    wrapper.trigger('keydown.' + key)
}

let type = (wrapper, selector, text) => {
    let input = wrapper.find(selector)
    input.element.value = text
    input.trigger('input')
}

let mountSelect = (props = {}) => {
    let wrapper = mount(SsSelect, {
          attachToDocument: true,
          propsData: {
            ...{ options, trackBy: 'name', searchBy: 'name'  },
            ...props
          },
          stubs: { SsSelectOption, SsSelectSearchInput, SsSelectToggle },
          scopedSlots: {
              default: `
                  <div slot-scope="{ filteredOptions, selectedOption, isOpen, $selected, $get, $reset }">
                      <ss-select-toggle class="toggle">
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

    wrapper.click = selector => click(wrapper, selector)
    wrapper.keydown = selector => keydown(wrapper, selector)
    wrapper.type = (selector, text) => type(wrapper, selector, text)

    return wrapper
}

let mountWithParent = (props = {}) => {
     let parentWrapper = mount({
        data: () => ({
            ...{ model: null, multiple: false },
            ...{ options, trackBy: 'name', searchBy: 'name'  },
            ...props
        }),
        template: `<div>
            <div class="element-outside"></div>
            <ss-select v-model="model" :options="options" :track-by="trackBy" :search-by="searchBy" :multiple="multiple">
                <div slot-scope="{ filteredOptions, selectedOption, isOpen, $selected, $get, $reset }">
                    <ss-select-toggle class="toggle">
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
            </ss-select>
        </div>`,
        components: { SsSelect, SsSelectOption, SsSelectSearchInput, SsSelectToggle }
    })

     parentWrapper.click = selector => click(parentWrapper, selector)
     parentWrapper.keydown = selector => keydown(parentWrapper, selector)
     parentWrapper.type = (selector, text) => type(parentWrapper, selector, text)

     return parentWrapper
}

export { mountSelect, mountWithParent, options }
