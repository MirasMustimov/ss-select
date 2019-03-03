<template>
    <input type="search" v-model="query" @input="onInput" @click.stop autofocus autocomplete="off">
</template>

<script>
    import event from './event-mixin'

    export default {
        name: 'ss-select-search-input',

        mixins: [ event ],

        props: [ 'value' ],

        data() {
            return {
                query: this.value || ''
            }
        },

        mounted() {
            this.$el.focus()

            this.busListen('selectMounted', () => {
                if (this.query.length) this.onInput()
            })
        },

        methods: {
            onInput() {
                this.$emit('input', this.query)
                this.busEmit('searchInput', this.query)
            }
        },

        inject: [ 'eventBusId' ]
    }
</script>
