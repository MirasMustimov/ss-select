import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Pointer index', () => {
    let select

    beforeEach(() => select = mountSelect())

    it('defaults to 0', () => {
        expect(select.vm.pointerIndex).toBe(0)
    })

    it('is set to 1 if first option is disabled', () => {
        let selectWithDisabledOption = mountSelect({
            options: [
                { name: 'Death Note', disabled: true },
                { name: 'Black Clover', disabled: false },
            ]
        })

        expect(selectWithDisabledOption.vm.pointerIndex).toBe(1)
    })

    it('changes pointer index when option is being hovered', () => {
        expect(select.vm.pointerIndex).toBe(0)

        select.findAll('.option').at(1).trigger('mouseover')

        expect(select.vm.pointerIndex).toBe(1)
    })

    it('changes pointer index on navigating using arrow keys', () => {
        expect(select.vm.pointerIndex).toBe(0)

        select.keydown('down')
        expect(select.vm.pointerIndex).toBe(1)

        select.keydown('up')
        expect(select.vm.pointerIndex).toBe(0)
    })

    it('skips disabled options when navigating using arrow keys', () => {
        expect(select.vm.pointerIndex).toBe(0)

        select.keydown('down')
        expect(select.vm.pointerIndex).toBe(1)

        select.keydown('down')
        expect(select.vm.pointerIndex).toBe(3)
    })

    it('sets last option as active before first', () => {
        expect(select.vm.pointerIndex).toBe(0)

        select.keydown('up')

        expect(select.vm.pointerIndex).toBe(select.vm.filteredOptions.length - 1)
    })

    it('sets first option as active after last', () => {
        expect(select.vm.pointerIndex).toBe(0)
        select.keydown('down')
        select.keydown('down')
        select.keydown('down')
        expect(select.vm.pointerIndex).toBe(0)
    })

    it('resets pointer index when filtered options are updated', () => {
        select.keydown('down')
        expect(select.vm.pointerIndex).toBe(1)

        select.type('.search-input', options[0].name)
        expect(select.vm.pointerIndex).toBe(0)
    })

    it('pointer index uses options instead of filtered options when internal search is disabled', () => {
        //
    })
})
