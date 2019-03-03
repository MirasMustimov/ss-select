import Vue from 'vue'
let EventBus = new Vue()

const eventMixin = {
    methods: {
        busEmit(event, data) {
            return EventBus.$emit(`${event}-${this.eventBusId}`, data)
        },

        busListen(event, callback) {
            return EventBus.$on(`${event}-${this.eventBusId}`, callback)
        }
    }
}

export default eventMixin
