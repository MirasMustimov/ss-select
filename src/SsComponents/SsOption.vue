<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import event from './event-mixin'
    import utils from './utils-mixin'

    export default {
        name: 'ss-option',

        mixins: [ event, utils ],

        props: {
            value: {
                required: true
            },

            index: {
                type: Number,
                required: true
            }
        },

        mounted() {
            this.selectable()
                .mouseOver()
                .scrollIntoView()
        },

        methods: {
            selectable() {
                this.$el.addEventListener('click', () => {
                    if (this.multiple && this.selected(this.value)) {
                        return this.busEmit('optionUnselected', this.value)
                    }

                    this.busEmit('optionSelected', this.value)
                })

                return this
            },

            mouseOver() {
                this.$el.addEventListener('mouseover', () => this.busEmit('optionHover', this.index))

                return this
            },

            scrollIntoView() {
                this.busListen('activeOptionIndexChange', activeOptionIndex => {
                    if (this.index === activeOptionIndex) {
                        this.$el.scrollIntoView({ block: 'nearest' })
                    }
                })

                return this
            }
        },

        inject: [ 'eventBusId', 'selectedOption', 'multiple', 'selected' ]
    }
</script>
