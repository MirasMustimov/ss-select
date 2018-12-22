const utilsMixin = {
    methods: {
        access(object, keys) {
            if (! (object instanceof Object)) return null

            return keys.split('.').reduce((result, key) => {
                if (result === undefined) return null
                return result[key]
            }, object)
        },
        
        contains(haystack, needle, key) {
            return haystack.findIndex(item => this.access(item, key) == this.access(needle, key)) > -1
        },
    }
}

export default utilsMixin
