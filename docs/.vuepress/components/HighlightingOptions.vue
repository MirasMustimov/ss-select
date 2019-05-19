<template>
  <ss-select :options="songs" track-by="name" search-by="name" class="select">
      <!-- resolve pointerIndex from slot scope -->
      <div slot-scope="{ filteredOptions, selectedOption, isOpen, pointerIndex, $selected, $get }">
          <ss-select-toggle class="select-toggle">
              <div class="select-toggle-placeholder">
                  {{ $get(selectedOption, 'name') || 'Pick a song' }}
              </div>
              <svg class="cheveron-svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </ss-select-toggle>

          <div v-show="isOpen" class="select-dropdown">
              <ss-select-search-input class="select-search-input"></ss-select-search-input>

              <ss-select-option v-for="(song, index) in filteredOptions"
                                :value="song"
                                :index="index"
                                :key="song.name"
                                :class="[
                                   // check if option index matches pointerIndex and bind a class
                                   pointerIndex == index ? 'pointed-option' : '',
                                   $selected(song) ? 'selected-option' : ''
                                ]"
                         class="select-option">
                {{ song.name }}
              </ss-select-option>
          </div>
      </div>
  </ss-select>
</template>

<script>
  import { SsSelectComponents } from '../../../src/components'

  export default {
    components: { ...SsSelectComponents },

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
                  disabled: false
                },

                {
                  band: 'Paramore',
                  name: 'Hard Times',
                  disabled: true
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

<style scoped>
  .select {
    width: 12rem;
    position: relative;
  }

  .select-toggle {
    display: flex;
    align-items: center;
    border: 1px solid #CBD5E0;
    padding: .25rem;
  }

  .select-toggle-placeholder {
    flex: 1;
  }

  .reset-button {
    flex: none;
    display: flex;
    align-items: center;
  }

  .reset-button-svg {
    display: inline-block;
    width: .75rem;
    height: .75rem;
  }

  .cheveron-svg {
    display: inline-block;
    width: .75rem;
    height: .75rem;
    flex: none;
  }

  .select-dropdown {
    position: absolute;
    z-index: 10;
    min-width: 100%;
    border: 1px solid #CBD5E0;
    margin-top: -1px;
  }

  .select-search-input {
    width: 100%;
    border: 1px solid #CBD5E0;
  }

  .select-search-input:focus {
    outline: none;
  }

  .select-option {
    padding: .25rem;
    cursor: default;
    white-space: nowrap;
    background-color: white;
  }

  .select-option:not(:last-child) {
    border-bottom: 1px solid #CBD5E0;
  }

  .pointed-option {
    background-color: #4299E1;
    color: white;
  }

  .selected-option {
    background-color: #9F7AEA;
    color: white;
  }

  .disabled-option {
    color: white;
    background-color: #CBD5E0;
  }
</style>
