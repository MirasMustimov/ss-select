const utilsMixin = {
    methods: {
        get(object, keys) {
            if (! (object instanceof Object)) return null

            return keys.split('.').reduce((result, key) => {
                if (result === undefined) return null
                return result[key]
            }, object)
        },

        contains(haystack, needle, key) {
            return haystack.findIndex(item => this.get(item, key) == this.get(needle, key)) > -1
        },
    }
}

export default utilsMixin
