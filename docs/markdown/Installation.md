## Yarn/ NPM

```bash
npm install ss-select
```
or
```bash
yarn add ss-select
```

Pull ss-select components in
```vue
<script>
    import { SsSelect, SsSelectToggle, SsSelectOption, SsSelectSearchInput } from 'ss-select'

    components: { SsSelect, SsSelectToggle, SsSelectOption, SsSelectSearchInput }
</script>
```

## Basic usage
<br />
<basic-example></basic-example>

```vue
<!-- ss-select is the main component. -->
<ss-select :options="songs" track-by="name" search-by="name" class="select">
    <!-- Create a div to resolve data and methods you need from slot scope -->
    <div slot-scope="{ filteredOptions, selectedOption, isOpen, pointerIndex, $selected, $get }">
        <!-- toggle component opens and closes dropdown -->
        <ss-select-toggle class="select-toggle">
            <div class="select-toggle-placeholder">
                {{ $get(selectedOption, 'name') || 'Pick a song' }}
            </div>
            <svg class="cheveron-svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </ss-select-toggle>

        <!-- Create a div to display options -->
        <div v-show="isOpen" class="select-dropdown">
            <!-- search input component is used to filter options -->
            <!-- Be sure to provide search-by prop that will be the key to filter options by -->
            <ss-select-search-input class="select-search-input"></ss-select-search-input>

            <!-- Here go options -->
            <ss-select-option v-for="(song, index) in filteredOptions"
                              :value="song"
                              :index="index"
                              :key="song.name"
                              :class="[
                                 pointerIndex == index ? 'pointed-option' : '',
                                 $selected(song) ? 'selected-option' : ''
                              ]"
                       class="select-option">
              {{ song.name }}
            </ss-select-option>
        </div>
    </div>
</ss-select>
```

