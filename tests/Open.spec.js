import { mountSelect } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Open', () => {
    it('opens when toggle component is clicked', () => {
        let select = mountSelect()

        expect(select.vm.isOpen).toBe(false)
        select.click('.toggle')
        expect(select.vm.isOpen).toBe(true)
    })
})
