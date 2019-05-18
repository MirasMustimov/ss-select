import { mountSelect, mountWithParent, options } from './helpers'

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
})
