import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Selecting', () => {
    it('can select options on click', () => {
        let parent = mountWithParent()
        let select = parent.vm.$children[0]

        expect(parent.vm.model).toBe(null)
        expect(select.selectedOption).toBe(null)

        parent.click('.option')

        expect(parent.vm.model.name).toBe(options[0].name)
        expect(select.selectedOption.name).toBe(options[0].name)
    })

    it('can select multiple options', () => {
        let parent = mountWithParent({ multiple: true })
        let select = parent.vm.$children[0]

        expect(select.selectedOption).toEqual([])

        parent.click('.option')

        expect(parent.vm.model.length).toBe(1)
        expect(select.selectedOption.length).toBe(1)
        expect(parent.vm.model[0]['name']).toBe(options[0].name)

        parent.findAll('.option').at(1).trigger('click')
        expect(parent.vm.model.length).toBe(2)
        expect(select.selectedOption.length).toBe(2)
    })

    it('can select options on enter key press', () => {
        let select = mountSelect()
        expect(select.vm.selectedOption).toBe(null)

        select.click('.toggle')
        select.keydown('enter')
        expect(select.vm.selectedOption.name).toBe(options[0].name)
    })

    it('emits change event on select', () => {
        let select = mountSelect()

        select.click('.option')

        expect(select.emitted().change).toBeTruthy()
        expect(select.emitted().change[0][0].name).toBe(options[0].name)
    })
})
