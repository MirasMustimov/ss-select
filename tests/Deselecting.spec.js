import { mountSelect, mountWithParent, options } from './helpers'

describe('Deselecting', () => {
    it('can deselect options by clicking on them in multiple mode', () => {
        let parent = mountWithParent({ multiple: true })
        let select = parent.vm.$children[0]

        expect(select.selectedOption).toEqual([])

        parent.click('.option')
        expect(parent.vm.model.length).toBe(1)
        expect(select.selectedOption.length).toBe(1)

        parent.click('.option')
        expect(parent.vm.model).toEqual([])
        expect(select.selectedOption).toEqual([])
    })
})
