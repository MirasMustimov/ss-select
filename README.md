# ss-select

[![npm](https://flat.badgen.net/npm/v/ss-select)](https://www.npmjs.com/package/ss-select) [![npm](https://flat.badgen.net/npm/dm/ss-select)](https://www.npmjs.com/package/ss-select) [![npm](https://flat.badgen.net/bundlephobia/min/ss-select)](https://bundlephobia.com/result?p=ss-select) [![npm](https://flat.badgen.net/travis/miggiboy/ss-select)](https://flat.badgen.net/travis/miggiboy/ss-select) [![npm](https://img.shields.io/github/license/miggiboy/ss-select.svg?style=flat-square)](https://github.com/miggiboy/ss-select/blob/master/LICENSE.md)

> **Stylable searchable select component for VueJS. This component is `renderless` so you are free to customize it however you need to!**


### Features
- Renderless
- Single and multiple mode
- Filtering
- Disabling options
- Keyboard navigation
- v-model and vuex support
- No dependencies

### Documentation:

Read [documentation](https://festive-edison-f92c64.netlify.com/) with examples.

### Demo:
<a href="https://codesandbox.io/s/ss-select-613v2?fontsize=14&hidenavigation=1&module=%2Fsrc%2FSelect.vue" target="_blank">Play with it online!</a>


### Installation:
```bash
npm install ss-select
```
or
```bash
yarn add ss-select
```

Pull ss-select components in
```js
<script>
    import { SsSelect, SsSelectToggle, SsSelectOption, SsSelectSearchInput } from 'ss-select'

    components: { SsSelect, SsSelectToggle, SsSelectOption, SsSelectSearchInput }
</script>
```

Basic usage:
```html
<!-- ss-select is the root component. Give it your options and a unique key to track them by. -->
<ss-select v-model="model" :options="options" track-by="id" search-by="name" class="relative">
    <!-- Then create a div so you can resolve data and methods you need from slot scope -->
    <div slot-scope="{ selectedOption, isOpen, $get }">
        <!-- toggle component opens and closes the dropdown -->
        <ss-select-toggle>
            {{ $get(selectedOption, 'name') || 'Select a car' }}
        </ss-select-toggle>

        <!-- Create a div to display options -->
        <div v-show="isOpen" class="absolute min-w-full z-10">
            <!-- search input component is used to filter options -->
            <!-- Be sure to provide search-by prop that will be the key to filter options by -->
            <ss-select-search-input placeholder="Search cars"></ss-select-search-input>

            <!-- Here go options -->
            <ss-select-option v-for="(option, index) in options"
                              :index="index"
                              :value="option">
                {{ option.name }}
            </ss-select-option>
        </div>
    </div>
</ss-select>
```

## License

[MIT](https://github.com/miggiboy/ss-select/blob/master/LICENSE)
