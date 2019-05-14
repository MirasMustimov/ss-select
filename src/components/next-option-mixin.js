const nextOptionMixin = {
    methods: {
        nextAvailableOptionIndex(options, currentIndex, reverse = false) {
            if (options.every(option => this.disabled(option))) {
                return null
            }

            let nextIndex = this.nextIndex(options, currentIndex, reverse)

            if (! this.disabled(options[nextIndex])) {
                return nextIndex
            }

            return this.nextAvailableOptionIndex(options, nextIndex, reverse)
        },

        nextIndex(options, current, reverse = false)
        {
            if (reverse && current == 0) {
                return this.lastIndex(options)
            }

            if (reverse) {
                return --current
            }

            if (current == this.lastIndex(options)) {
                return 0
            }

            return current + 1
        },

        lastIndex(options)
        {
            return options.length - 1
        }
    }
}

export default nextOptionMixin
