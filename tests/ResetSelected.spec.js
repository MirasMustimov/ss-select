import { mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Reset selected option', () => {
    it('can reset selected option in single select', () => {
        let parent = mountWithParent()

        expect(parent.vm.model).toEqual(null)
        parent.click('.option')
        expect(parent.vm.model.name).toBe(options[0].name)
        parent.click('.reset-button')
        expect(parent.vm.model).toEqual(null)
    })

    it('can reset selected option in multiple select', () => {
        let parent = mountWithParent({ multiple: true })
        let select = parent.vm.$children[0]

        expect(select.selectedOption).toEqual([])

        parent.click('.option')
        expect(parent.vm.model.length).toBe(1)
        expect(select.selectedOption.length).toBe(1)

        parent.click('.reset-button')
        expect(parent.vm.model).toEqual([])
        expect(select.selectedOption).toEqual([])
    })
})
