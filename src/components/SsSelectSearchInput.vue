<template>
    <input type="text" v-model="query" @input="onInput($event)" autofocus autocomplete="off">
</template>

<script>
    import event from './event-mixin'

    export default {
        name: 'ss-select-search-input',

        mixins: [ event ],

        props: {
            value: {
                default: null
            },

            eager: {
                type: Boolean,
                default: false
            },

            clearOnClose: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                query: this.value || ''
            }
        },

        mounted() {
            this.busListen('selectMounted', () => {
                if (this.query.length) this.onInput()
            })

            this.busListen('open', () => {
                this.$nextTick(() => this.$el.focus())
            })

            this.busListen('close', () => {
                if (this.clearOnClose) {
                    this.query = ''
                    this.onInput()
                }
            })
        },

        methods: {
            onInput(e) {
                if (this.eager) {
                    this.query = e.target.value
                }

                this.$emit('input', this.query)
                this.busEmit('searchInput', this.query)
            }
        },

        inject: [ 'eventBusId' ]
    }
</script>
