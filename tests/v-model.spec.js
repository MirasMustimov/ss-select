import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('v-model', () => {
    it('selectedOption can be initialized from v-model', () => {
        let parent = mountWithParent({ model: options[0] })

        expect(parent.vm.$children[0].selectedOption.name).toBe(options[0].name)
    })

    it('selectedOption can be changed via v-model', () => {
        let parent = mountWithParent()

        parent.vm.model = options[2]

        expect(parent.vm.$children[0].selectedOption.name).toBe(options[2].name)
    })

    it('can change v-model on select', () => {
        let parent = mountWithParent()

        expect(parent.vm.model).toBe(null)

        parent.click('.option')
        expect(parent.vm.model.name).toBe(options[0].name)
    })
})
