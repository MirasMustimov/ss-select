## Custom filtering
If you need to implement custom filtering algorithm just remove `search-by` prop from `ss-select` that way default filtering will not be triggered.
Add input listener to `ss-select-search-input` so you can filter options that you pass to `ss-select` component yourself.

## Ajax search
When your options need to be pulled from api. Simply add input listener to `ss-select-search-input` component so you can make an api call and change options that you pass to `ss-select` component.
Make sure to remove `search-by` prop from `ss-select` if it is provided so default filtering is disabled.

## v-model
You can bind your data to `ss-select` by setting `v-model`.

## Disabling options
Pass `disable-by` prop to ss-select component.
The prop holds a key in options that `$disabled(option)` method will check.

## Highlighting options
To highlights options that are being hovered at or pointed at using arrow keys
simply compare option `index` to `pointerIndex` that you can get from `scoped slot`.

## Styling selected options
Bind classes that you need by checking whether option is selected using `$selected(option)` method that you need to resolve from `scoped slot`.

## Option groups
Unfortunately option groups are not supported. PRs are welcome!
