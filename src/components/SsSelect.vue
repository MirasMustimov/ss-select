<script>
    import 'outclick'
    import event from './event-mixin'
    import utils from './utils-mixin'
    import nextOption from './next-option-mixin'

    const ESC = 27
    const ENTER = 13
    const ARROW_UP = 38
    const ARROW_DOWN = 40

    export default {
        name: 'ss-select',

        mixins: [ event, utils, nextOption ],

        props: {
            options: {
                type: Array,
                required: true
            },

            value: {
                required: false,
                default: null
            },

            trackBy: {
                type: String,
                required: false,
                default: ''
            },

            searchBy: {
                type: String,
                required: false,
                default: null
            },

            disableBy: {
                type: String,
                required: false,
                default: 'disabled'
            },

            multiple: {
                default: false
            }
        },

        data() {
            return {
                isOpen: false,
                selectedOption: this.multiple ? [] : null,
                filteredOptions: this.options,
                eventBusId: Math.random().toString(36).substring(7),
                pointerIndex: 0
            }
        },

        created() {
            if (this.value) {
                this.selectedOption = this.value
            }

            this.$watch('options', () => this.filteredOptions = this.options)
            this.$watch('filteredOptions', () => this.pointerIndex = 0)

            this.$watch('isOpen', () => {
                this.$emit(this.isOpen ? 'open' : 'close')
                this.busEmit(this.isOpen ? 'open' : 'close')
            })
        },

        mounted() {
            this.$el.classList.add('outline-none')

            this.applyListeners()

            this.busEmit('selectMounted')
        },

        provide () {
            return {
                selectedOption: this.selectedOption,
                eventBusId: this.eventBusId,
                multiple: this.multiple,
                selected: this.selected
            }
        },

        render() {
            return this.$scopedSlots.default({
                options: this.options,
                filteredOptions: this.filteredOptions,
                isOpen: this.isOpen,
                selectedOption: this.selectedOption,
                selectedOptions: this.selectedOption, // multiple mode api improvement
                pointerIndex: this.pointerIndex,
                $get: this.get,
                $selected: this.selected,
                $disabled: this.disabled,
                $unselect: this.unselect,
                $reset: this.reset,
                $open: this.open,
            })
        },

        methods: {
            open() {
                if (! this.isOpen) this.isOpen = true
            },

            selected(option) {
                if (this.multiple) {
                    return this.contains(this.selectedOption, option, this.trackBy)
                }

                return this.get(this.selectedOption, this.trackBy) == this.get(option, this.trackBy)
            },

            disabled(option) {
                return !! this.get(option, this.disableBy)
            },

            unselect(option) {
                let index = this.selectedOption.findIndex(selectedOption => {
                    return this.get(selectedOption, this.trackBy) == this.get(option, this.trackBy)
                })

                this.selectedOption.splice(index, 1)
            },

            reset() {
                this.selectedOption = this.multiple ? [] : null
            },

            applyListeners() {
                this.keyControl()
                    .clickOutside()
                    .toggleOpen()
                    .selectOptions()
                    .unselectOptions()
                    .hoverOverOptions()
                    .filterOptions()
            },

            keyControl() {
                this.$el.tabIndex = 0

                this.$el.addEventListener('keydown', event => {
                    let keyCode = event.keyCode
                    if (! [ ESC, ENTER, ARROW_UP, ARROW_DOWN ].includes(keyCode)) return

                    event.preventDefault()
                    this.onEscape(keyCode)
                        .onEnter(keyCode)
                        .onUpAndDown(keyCode)
                }, false)

                return this
            },

            clickOutside() {
                this.$el.addEventListener('outclick', () => this.isOpen = false)

                return this
            },

            toggleOpen() {
                this.busListen('toggleOpen', () => this.isOpen = !this.isOpen)

                return this
            },

            selectOptions() {
                this.busListen('optionSelected', option => {
                    if (this.multiple) this.selectedOption.push(option)
                    else this.selectedOption = option

                    this.$emit('input', this.selectedOption)
                    this.$emit('change', this.selectedOption)
                    this.isOpen = this.multiple
                })

                return this
            },

            unselectOptions() {
                this.busListen('optionUnselected', option => this.unselect(option))

                return this
            },

            hoverOverOptions() {
                this.busListen('optionHover', index => {
                    if (! this.disabled(this.filteredOptions[index])) {
                        this.pointerIndex = index
                    }
                })

                return this
            },

            filterOptions() {
                this.busListen('searchInput', query => {
                    if (this.searchBy == null) return

                    this.filteredOptions = this.options.filter(option => {
                        // TODO: fails if it is an object and seach by is not provided
                        return (this.searchBy ? this.get(option, this.searchBy) : option)
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    })

                    if (this.filteredOptions.length === 0) {
                        this.$emit('noSearchResults')
                    }
                })

                return this
            },

            onEscape(keyCode) {
                if (keyCode === ESC) this.isOpen = false

                return this
            },

            onEnter(keyCode) {
                if (keyCode === ENTER) {
                    this.busEmit('optionSelected', this.filteredOptions[this.pointerIndex])
                }

                return this
            },

            onUpAndDown(keyCode) {
                if (keyCode === ARROW_DOWN) {
                    this.pointerIndex = this.nextAvailableOptionIndex(this.filteredOptions, this.pointerIndex)
                }

                if (keyCode === ARROW_UP) {
                    let reverse = true
                    this.pointerIndex = this.nextAvailableOptionIndex(this.filteredOptions, this.pointerIndex, reverse)
                }

                this.busEmit('pointerIndexChange', this.pointerIndex)

                return this
            }
        }
    }
</script>

<style>
    .ss-rotate-180 {
        transform: rotate(180deg);
    }
</style>