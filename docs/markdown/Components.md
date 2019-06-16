## `ss-select`
Main renderless component that holds other components and provides data like `selectedOption`, `isOpen` etc and useful methods.
Requires a `div` to resolve `scoped slot` data and methods.


### `ss-select` props

| Prop | Description | Type | Required | Default |
|---|---|---|---|---|
| options | Array of options (objects) | Array | required |  |
| track-by | Unique option key (supports dot notation)  | String | required |  |
| search-by | Option key to filter them by (supports dot notation) | String | optional | |
| disable-by | Option key to disable options (supports dot notation) | String | optional | |
| multiple | Enable multiple mode | Boolean | optional | false |
| hide-selected | Hide selected options (for multiple mode only) | Boolean | optional | false |
| disable-selected | Disable selected options | Boolean | optional | false |
| close-on-select | Close select when option is selected | Boolean | optional | true |
| max | Limit number of allowed selections | Number | optional | null |


### `ss-select` scoped slot data
| Data | Description |
|---|---|
| options | Options that you provided as prop |
| filteredOptions | Options filtered by search query and by hideSelected prop |
| isOpen | whether Select is open or not |
| selectedOption | Selected option |
| selectedOptions | Selected options |
| pointerIndex | Index of option that is currently active (hovered at or pointed at using arrow keys) |

### `ss-select` scoped slot methods
| Method | Description |
|---|---|
| $get(option, key) | Gets key of an object (usually used to get selected option name when there can be no selected option) |
| $selected(option) | Check if option is selected |
| $disabled(option) | Check if option is disabled |
| $deselect(option) | Deselect an option |
| $reset() | Reset selected option(-s) |
| $open() | Open select |

### `ss-select` events
open()
close()
change(selectedOption)
select(option)

<br />

## `ss-select-toggle`

Component that opens and closes your select on click.
Has a default slot where you can display selected option title or a placeholder.

<br />


## `ss-select-option`
Component to hold values of your options. Has a default slot to show option title.

### `ss-select-option` props
| Prop | Description | Type | Required | Default |
|---|---|---|---|---|
| value | Option object | Object | required |  |
| index | Numeric index of an option (resolved when looping through options) | Number | required |  |


## `ss-select-search-input`
Component that triggers filtering options. Be sure to provide an option key via `search-by` prop to `ss-select` component so filtering takes place.
If you don't need filtering in your select then simply don't use this component.

### `ss-select-search-input` props
| Prop | Description | Type | Required | Default |
|---|---|---|---|---|
| clear-on-close | clear input on select close | Boolean | optional | true |

Can accept any attribuites of normal html inputs. Supports `v-model`.
