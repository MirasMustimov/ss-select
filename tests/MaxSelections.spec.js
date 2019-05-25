import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Max selections', () => {
    it(':max defaults to null', () => {
        expect(mountSelect().vm.max).toEqual(null)
    })

    it('cannot select more than max', () => {
        let select = mountSelect({
            multiple: true,
            max: 2,
            options: [
                { name: 'Californication' },
                { name: 'By the Way' },
                { name: 'Fortune Faded' },
                { name: 'Make You Feel Better' },
            ]
        })

        select.click('.option')
        expect(select.vm.selectedOption.length).toBe(1)

        select.findAll('.option').at(1).trigger('click')
        expect(select.vm.selectedOption.length).toBe(2)

        select.findAll('.option').at(2).trigger('click')
        expect(select.vm.selectedOption.length).toBe(2)
    })
})
