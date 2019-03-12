<template>
  <div id="app" class="flex flex-col items-center justify-center h-screen mb-2">
      <ss-select :options="songs" track-by="name" search-by="name" class="relative" style="width: 12rem">
        <div slot-scope="{ filteredOptions, selectedOption, isOpen, pointerIndex, $selected, $disabled, $get, $reset }">
          <ss-select-placeholder class="flex items-center border p-1 select-none">
            <div class="flex-1">{{ $get(selectedOption, 'name') || 'Pick a song' }}</div>
            <button v-if="selectedOption && !isOpen" @click.stop="$reset" class="flex-none">
              <svg class="inline-block w-3 h-3" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
            </button>
            <svg v-else class="inline-block w-3 h-3 flex-none" :class="[ isOpen ? 'ss-rotate-180' : '' ]" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </ss-select-placeholder>

          <div v-show="isOpen" class="absolute z-10 min-w-full border">
            <ss-select-search-input class="w-full border focus:outline-none"></ss-select-search-input>

            <div>
              <ss-select-option v-for="(song, index) in filteredOptions"
                                :value="song"
                                :index="index"
                                :key="song.name"
                                :class="[
                                   pointerIndex == index ? 'bg-blue text-white' : '',
                                   $selected(song) ? 'bg-purple text-white' : '',
                                   $disabled(song) ? 'opacity-50' : ''
                                ]"
                         class="p-1 border-b cursor-default whitespace-no-wrap">
                {{ song.name }}
              </ss-select-option>
            </div>
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
