<script>
    import 'outclick'
    import event from './event-mixin'
    import utils from './utils-mixin'

    export default {
        name: 'ss-select',

        mixins: [ event, utils ],

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
                default: ''
            },

            multiple: {
                default: false
            }
        },

        data() {
            return {
                isOpen: false,
                selectedOption: this.multiple ? [] : null,
                displayedOptions: this.options,
                eventBusId: Math.random().toString(36).substring(7),
                activeOptionIndex: -1
            }
        },

        created() {
            if (this.value) {
                this.selectedOption = this.value
            }

            this.$watch('options', () => this.displayedOptions = this.options)

            this.$watch('isOpen', () => this.$emit(this.isOpen ? 'open' : 'close'))
        },

        mounted() {
            this.$el.classList.add('outline-none')

            this.applyListeners()

            this.busEmit('selectMounted')
        },

        provide () {
            return {
                selectedOption: this.selectedOption,
                selectedOptions: this.selectedOption, // multiple mode api improvement
                eventBusId: this.eventBusId,
                multiple: this.multiple,
                selected: this.selected
            }
        },

        render() {
            return this.$scopedSlots.default({
                options: this.options,
                displayedOptions: this.displayedOptions,
                isOpen: this.isOpen,
                selectedOption: this.selectedOption,
                activeOptionIndex: this.activeOptionIndex,
                $access: this.access,
                $selected: this.selected,
                $unselect: this.unselect,
                $reset: this.reset,
            })
        },

        methods: {
            selected(option) {
                if (this.multiple) {
                    return this.contains(this.selectedOption, option, this.trackBy)
                } else {
                    return this.access(this.selectedOption, this.trackBy) == this.access(option, this.trackBy)
                }
            },

            unselect(option) {
                let index = this.selectedOption.findIndex(selectedOption => {
                    return this.access(selectedOption, this.trackBy) == this.access(option, this.trackBy)
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
                    let esc = 27
                    let enter = 13
                    let up = 38
                    let down = 40
                    let keys = [ esc, enter, up, down ]
                    if (! keys.includes(event.keyCode)) return

                    event.preventDefault()
                    this.onEscape(event.keyCode)
                        .onEnter(event.keyCode)
                        .onUpAndDown(event.keyCode)
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
                this.busListen('optionHover', index => this.activeOptionIndex = index)

                return this
            },

            filterOptions() {
                this.busListen('searchInput', query => {
                    this.displayedOptions = this.options.filter(option => {
                        return (this.searchBy ? this.access(option, this.searchBy) : option)
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    })

                    if (this.displayedOptions.length === 0) {
                        this.$emit('noSearchResults')
                    }
                })

                return this
            },

            onEscape(keyCode) {
                let esc = 27

                if (keyCode === esc) this.isOpen = false

                return this
            },

            onEnter(keyCode) {
                let enter = 13

                if (keyCode === enter) {
                    this.busEmit('optionSelected', this.displayedOptions[this.activeOptionIndex])
                }

                return this
            },

            onUpAndDown(keyCode) {
                let up = 38
                let down = 40

                if (keyCode === up) {
                    if (this.activeOptionIndex - 1 < 0) {
                        this.activeOptionIndex = this.displayedOptions.length - 1
                    } else {
                        this.activeOptionIndex--
                    }

                    this.busEmit('activeOptionIndexChange', this.activeOptionIndex)
                }

                if (keyCode === down) {
                    if (this.activeOptionIndex + 1 > this.displayedOptions.length - 1) {
                        this.activeOptionIndex = 0
                    } else {
                        this.activeOptionIndex++
                    }

                    this.busEmit('activeOptionIndexChange', this.activeOptionIndex)
                }

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
