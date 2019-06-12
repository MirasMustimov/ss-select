<script>
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
                required: true
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
            },

            hideSelected: {
                type: Boolean,
                default: false
            },

            disableSelected: {
                type: Boolean,
                default: false
            },

            closeOnSelect: {
                type: Boolean,
                default: true
            },

            max: {
                type: Number,
                default: null
            }
        },

        data() {
            return {
                isOpen: false,
                selectedOption: this.multiple ? [] : null,
                optionsMatchingSearch: this.options,
                eventBusId: Math.random().toString(36).substring(7),
                pointerIndex: null
            }
        },

        created() {
            if (this.value) this.selectedOption = this.value
            this.$watch('value', () => this.selectedOption = this.value)

            this.setPointerIndexToOrNextEnabled(0)

            this.$watch('options', () => this.optionsMatchingSearch = this.options)
            this.$watch('filteredOptions', () => this.setPointerIndexToOrNextEnabled(0))

            this.$watch('isOpen', () => {
                this.$emit(this.isOpen ? 'open' : 'close')
                this.busEmit(this.isOpen ? 'open' : 'close')
            })
        },

        mounted() {
            // TODO: fix this
            this.$el.style.outline = 'none'

            this.applyListeners()

            this.busEmit('selectMounted')
        },

        provide () {
            return {
                selectedOption: this.selectedOption,
                eventBusId: this.eventBusId,
                multiple: this.multiple,
                selected: this.selected,
                disabled: this.disabled,
            }
        },

        render() {
            return this.$scopedSlots.default({
                options: this.options,
                filteredOptions: this.filteredOptions,
                isOpen: this.isOpen,
                selectedOption: this.selectedOption,
                selectedOptions: this.selectedOption,
                pointerIndex: this.pointerIndex,
                $get: this.get,
                $selected: this.selected,
                $disabled: this.disabled,
                $unselect: this.deselect,
                $deselect: this.deselect,
                $reset: this.reset,
                $open: this.open,
            })
        },

        computed: {
            filteredOptions() {
                if (this.hideSelected && this.multiple) {
                    let selectedOptionKeys = this.selectedOption.map(option => option[this.trackBy])

                    return this.optionsMatchingSearch.filter(option => !selectedOptionKeys.includes(option[this.trackBy]))
                }

                return this.optionsMatchingSearch
            }
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
                return !! this.get(option, this.disableBy) || (this.disableSelected && this.selected(option))
            },

            deselect(option) {
                if (this.multiple == false) return

                let index = this.selectedOption.findIndex(selectedOption => {
                    return this.get(selectedOption, this.trackBy) == this.get(option, this.trackBy)
                })

                this.selectedOption.splice(index, 1)
                this.$emit('input', this.selectedOption)
                this.$emit('change', this.selectedOption)
            },

            reset() {
                this.selectedOption = this.multiple ? [] : null
                this.$emit('input', this.selectedOption)
                this.$emit('change', this.selectedOption)
            },

            applyListeners() {
                this.keyControl()
                    .clickOutside()
                    .toggleOpen()
                    .selectOptions()
                    .deselectOptions()
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
                document.addEventListener('click', this.closeOnClickOutside)

                return this
            },

            closeOnClickOutside(event) {
                if (!this.$el.contains(event.target) && this.$el !== event.target) {
                    this.isOpen = false
                }
            },

            toggleOpen() {
                this.busListen('toggleOpen', () => this.isOpen = !this.isOpen)

                return this
            },

            selectOptions() {
                this.busListen('optionSelected', option => {
                    if (this.multiple) {
                        if (this.max !== null && this.selectedOption.length >= this.max) {
                            return
                        }

                        this.selectedOption.push(option)

                    } else {
                        this.selectedOption = option
                    }

                    this.$emit('input', this.selectedOption)
                    this.$emit('change', this.selectedOption)
                    this.isOpen = !this.closeOnSelect
                })

                return this
            },

            deselectOptions() {
                this.busListen('optionDeselected', option => this.deselect(option))

                return this
            },

            hoverOverOptions() {
                this.busListen('optionHover', index => {
                    if (! this.disabled(this.filteredOptions[index])) {
                        this.pointerIndex = index
                        this.busEmit('pointerIndexChange', this.pointerIndex)
                    }
                })

                return this
            },

            filterOptions() {
                this.busListen('searchInput', query => {
                    if (this.searchBy == null) return this

                    this.optionsMatchingSearch = this.options.filter(option => {
                        return this.get(option, this.searchBy)
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    })
                })

                return this
            },

            onEscape(keyCode) {
                if (keyCode === ESC) this.isOpen = false

                return this
            },

            onEnter(keyCode) {
                if (keyCode === ENTER) {
                    if (! this.disabled(this.filteredOptions[this.pointerIndex])) {
                        this.busEmit('optionSelected', this.filteredOptions[this.pointerIndex])
                    }
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
            },

            setPointerIndexToOrNextEnabled(index) {
                if (this.disabled(this.filteredOptions[index])) {
                    this.pointerIndex = this.nextAvailableOptionIndex(this.filteredOptions, index)
                } else {
                    this.pointerIndex = index
                }

                this.busEmit('pointerIndexChange', this.pointerIndex)
            }
        },

        destroyed() {
            document.removeEventListener('click', this.closeOnClickOutside)
        }
    }
</script>
