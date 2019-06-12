import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Disabling', () => {
    it(':disable-selected defaults to false', () => {
        expect(mountSelect().vm.disableSelected).toBe(false)
    })

    it('disabled() method returns true on selected options when :disable-selected=true', () => {
        let select = mountSelect({ disableSelected: true })

        expect(select.vm.disabled(options[0])).toBe(false)

        select.click('.option')

        expect(select.vm.disabled(options[0])).toBe(true)
    })

    it('disabled option cannot be selected', () => {
        let select = mountSelect({
            options: [ { name: 'Californicattion', disabled: true } ],
            disableBy: 'disabled'
        })

        select.click('.option')
        expect(select.vm.selectedOption).toBe(null)

        select.keydown('enter')
        expect(select.vm.selectedOption).toBe(null)
    })
})
