import { mountSelect, mountWithParent, options } from './helpers'

window.HTMLElement.prototype.scrollIntoView = function() {}

describe('Filtering', () => {
    it(':search-by defaults to null', () => {
        console.log('implement :search-by defaults to null')
    })

    it('can filter options', () => {
        let select = mountSelect()

        expect(select.vm.filteredOptions.length).toBe(options.length)

        select.type('.search-input', options[0].name)

        expect(select.vm.filteredOptions.length).toBe(1)
        expect(select.vm.filteredOptions[0].name).toBe(options[0].name)
    })

    it('doesnt filter options if search-by prop is not provided', () => {
        let select = mountSelect({ searchBy: null })

        expect(select.vm.filteredOptions.length).toBe(options.length)

        select.type('.search-input', options[0].name)
        expect(select.vm.filteredOptions.length).toBe(options.length)
    })

    it('search input gets focused when select opens', done => {
        let select = mountSelect()

        select.click('.toggle')

        select.vm.$nextTick(() => {
            expect(select.find('.search-input').element).toBe(document.activeElement)
            done()
        })
    })

    it('search input clears on close be default', () => {
        let select = mountSelect()

        select.click('.toggle')

        select.type('.search-input', options[0].name)

        select.click('.option') // this will close select
        expect(select.find('.search-input').element.value).toBe('')
    })

    it('preserves search query when :clear-on-close=false', () => {
        let parent = mountWithParent({ clearOnClose: false })

        parent.click('.toggle')
        parent.type('.search-input', options[0].name)

        parent.click('.option') // this will close select
        expect(parent.find('.search-input').element.value).toBe(options[0].name)
    })

    it('filteredOptions change when options prop is changed', () => {
        let select = mountSelect({ options })
        expect(select.vm.filteredOptions.length).toEqual(options.length)

        let newOptions = [
            { name: 'Young and Beautiful' },
            { name: 'Summertime Sadness' }
        ]

        select.setProps({ options: newOptions })
        expect(select.vm.filteredOptions.length).toEqual(newOptions.length)
        expect(select.vm.filteredOptions[0].name).toEqual(newOptions[0].name)
    })

    it('removes selected options from filtered options if :hide-selected=true', () => {
        let select = mountSelect({ hideSelected: true, multiple: true })

        expect(select.vm.filteredOptions.length).toEqual(options.length)
        select.click('.option')

        expect(select.vm.filteredOptions.find(option => {
            return option.name == select.vm.selectedOption[0].name
        })).toBeFalsy()
    })
})
