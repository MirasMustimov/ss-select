Installation:
```bash
npm install vue-ss-select
```
or
```bash
yarn add vue-ss-select
```

Pull ss components in
```vue
<script>
    import { SsSelect, SsSelectToggle, SsSelectOption, SsSelectSearchInput } from 'vue-ss-select'
    components: { SsSelect, SsSelectToggle, SsSelectOption, SsSelectSearchInput }
</script>
```

Basic usage:
```vue
<!-- ss-select is the root component. Give it your options and a unique key to track them by. -->
<ss-select :options="options" track-by="id" search-by="name" class="relative">
    <!-- Then create a div so you can resolve data and methods you need from slot scope -->
    <div slot-scope="{ selectedOption, isOpen, $get }">
        <!-- toggle component opens and closes your select dropdown -->
        <ss-select-toggle>
            {{ $get(selectedOption, 'name') || 'Select a car' }}
        </ss-select-toggle>

        <!-- Create a div to display options that will only show up if select is open -->
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
# Compoennts
## Ss select
Main renderless component that holds other components and provides data like selectedOption, isOpen etc and useful methods.
Requires a div to resolve scoped slot data and methods


### ss-select props

| Prop | Description | type | required | default |
|---|---|---|---|---|
| options | Options | Array | required |  |
| track-by | Unique option key (supports dot notation)  | String | required |  |
| search-by | Option key to filter them by (supports dot notation) | String | optional | |
| disable-by | Option key to disable options (supports dot notation) | String | optional | |
| multiple | Enable multiple mode | Boolean | optional | false |
| hide-selected | Hide selected options | Boolean | optional | false |
| disable-selected | Disable selected options | Boolean | optional | false |
| close-on-select | Close select when option is selected | Boolean | optional | true |

### ss-select scoped slot data
1. options - options that you provided as prop
2. filteredOptions - options filtered by search query and by hideSelected prop
3. isOpen - whether select is open or not
4. selectedOption - selected option
5. selectedOptions - selected options
6. pointerIndex - index of opttion that is currently active (hovered at or pointed at using arrow keys)

### ss-select scoped slot methods
1. $get(option, key) - gets key of an object (usually used to get selected option name when there can be no selected option)
2. $selected(option) - check if option is selected
3. $disabled(option) - check if option is disabled
4. $unselect(option) - unselect an option
5. $reset() - reset selected option(-s)
6. $open() - open select

### ss-select events
open()
close()
change(selectedOption)
select(option)


## ss-select-toggle

Component that opens and closes your select on click. Has a default slot where you can display selected option title or placeholder
props - none


## ss-select-option
Compoenent to hold values of your options. Has a default slot to show option title.

### Props
value - option object - required,
index - numeric index of an option (resolved when looping throught options), required


## ss-select-search-input
Component that triggers filtering options. Be sure to provide an option key to search-by prop to ss-select component so filtering takes place.
If you don't need filtering in your select then simply don't use this component.

### props
Can accept any attribuites of normal html inputs


### Custom filtering
If you need to implement custom filtering algorithm just remove search-by prop from ss-select that way default filtering will not be triggered.
Add input listener to ss-select-search-input so you can filter options that you pass to ss-select  component yourself.

#### Ajax search
When your options need to be pulled from api. Simply add input listener to ss-select-search-input component so you can make an api call and change options that you pass to ss-select component.
Make sure to remove search-by prop from ss-select if it is provided so default filtering is disabled.

#### v-model
You can bind your data to ss-select by setting v-model.

#### Disabling options
Pass disable by prop to ss-select component.
The prop holds a key in options that defines whenther $disabled(option) method will check.

#### Highlighting options
To highlights options that are being hovered at or pointed at using arrow keys
simply compapre option index to pointerIndex that you can get from scoped slot.

#### Styling selected options
bind classes that you need by checking whether option is selected using $selected(option) method that you need to resolve from scoped slot

#### Option groups
Unfortunately option groups are not supported. PR's are welcome!
