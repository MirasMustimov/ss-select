<template>
  <div id="app" class="flex flex-col items-center justify-center h-screen mb-2">
      <ss-select :options="songs" track-by="name" search-by="name" class="relative">
        <div slot-scope="{ filteredOptions, selectedOption, isOpen, activeOptionIndex, $selected, $disabled, $get, $open }">
            <ss-select-placeholder class="flex items-center border" :class="[ isOpen ? 'border-blue' : 'border-browny-grey' ]">
                <ss-select-search-input class="text-grey py-3 px-2 placeholder-text-browny-grey outline-none"
                                        :placeholder="$get(selectedOption, 'name') || 'Pick a song'"
                                        @keydown.down.native="$open"
                                        @keydown.up.native="$open">
                </ss-select-search-input>
                <svg class="inline block w-4 h-4 fill-current text-black mr-3" :class="[ isOpen ? 'ss-rotate-180' : '' ]" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </ss-select-placeholder>

            <div v-show="isOpen" class="absolute mt-3 overflow-x-auto shadow-lg w-full">
                <ss-select-option v-for="(option, index) in filteredOptions"
                                  :value="option"
                                  :key="index"
                                  :index="index"
                                  class="p-2 cursor-pointer"
                                  :class="[
                                        $selected(option) ? 'text-blue' : '',
                                        $disabled(option) ? 'opacity-50 pointer-events-none' : '',
                                        activeOptionIndex == index ? 'bg-grey-lighter' : ''
                                  ]">
                    {{ option.name }}
                </ss-select-option>
            </div>
        </div>
      </ss-select>
  </div>
</template>

<script>
  import { SsComponents } from './components'

  export default {
      components: { ...SsComponents },

      data() {
          return {
              songs: [
                {
                  band: 'Paramore',
                  name: 'Ignorance',
                  disabled: false
                },

                {
                  band: 'Paramore',
                  name: 'Rose Coloured Boy',
                  disabled: true
                },

                {
                  band: 'Paramore',
                  name: 'Hard Times',
                  disabled: false
                },

                {
                  band: 'Paramore',
                  name: 'Decode',
                  disabled: false
                },
              ]
          }
      }
  }
</script>

<style>
    .placeholder-text-black::placeholder {
        color: #22292f;
        opacity: 100;
    }

    .browny-grey {
        color: rgba(105, 105, 105, 0.5);
    }

    .border-browny-grey {
        border-color: rgba(105, 105, 105, 0.5);
    }

    .placeholder-text-browny-grey::placeholder {
        color: rgba(105, 105, 105, 0.5);
        opacity: 100;
    }
</style>
