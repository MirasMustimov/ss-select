import { mountSelect, mountWithParent, options } from './helpers'

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

    it('resets search query on select close', () => {
        let select = mountSelect()

        select.click('.toggle')

        select.type('.search-input', options[0].name)
        expect(select.find('input').element.value).toBe(options[0].name)

        select.click('.option')
        expect(select.find('input').element.value).toBe('')
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
