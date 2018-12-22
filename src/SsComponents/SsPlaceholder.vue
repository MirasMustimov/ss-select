<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import event from './event-mixin'

    export default {
        name: 'ss-placeholder',

        mixins: [ event ],

        mounted() {
            this.$el.addEventListener('click', () => this.busEmit('toggleOpen'))
        },

        inject: [ 'eventBusId' ]
    }
</script>
