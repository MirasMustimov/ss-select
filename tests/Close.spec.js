import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Close', () => {
    let select

    beforeEach(() => select = mountSelect())

    it('closes when option is selected', () => {
        expect(select.vm.isOpen).toBe(false)
        select.vm.open()
        expect(select.vm.isOpen).toBe(true)

        select.click('.option')
        expect(select.vm.isOpen).toBe(false)
    })

    it('doesnt close on select if :close-on-select=false', () => {
        select.setProps({ closeOnSelect: false })

        select.vm.open()
        expect(select.vm.isOpen).toBe(true)

        select.click('.option')
        expect(select.vm.isOpen).toBe(true)
    })

    it('closes on escape key press', () => {
        expect(select.vm.isOpen).toBe(false)
        select.vm.open()
        expect(select.vm.isOpen).toBe(true)

        select.keydown('esc')
        expect(select.vm.isOpen).toBe(false)
    })

    it('emits close event', () => {
        select.vm.open()

        select.keydown('esc')
        expect(select.emitted().close).toBeTruthy()
    })

    it('closes on click outside', () => {
        let parent = mountWithParent()

        parent.vm.$children[0].open()
        expect(parent.vm.$children[0].isOpen).toBe(true)

        parent.click('.element-outside')
        setTimeout(() => {
            expect(parent.vm.$children[0].isOpen).toBe(false)
        }, 100)
    })
})
