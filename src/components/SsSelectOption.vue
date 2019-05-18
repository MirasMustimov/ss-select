<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import event from './event-mixin'
    import utils from './utils-mixin'

    export default {
        name: 'ss-select-option',

        mixins: [ event, utils ],

        inject: [ 'eventBusId', 'selectedOption', 'multiple', 'selected', 'disabled' ],

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
                    if (this.disabled(this.value)) return

                    if (this.multiple && this.selected(this.value)) {
                        return this.busEmit('optionDeselected', this.value)
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
                this.busListen('pointerIndexChange', pointerIndex => {
                    if (this.index === pointerIndex) {
                        this.$el.scrollIntoView({ block: 'nearest' })
                    }
                })

                return this
            }
        }
    }
</script>
