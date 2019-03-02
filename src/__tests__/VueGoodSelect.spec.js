import { mount} from '@vue/test-utils'
import DisplayOptions from './stubs/DisplayOptions'

describe('can display options', () => {
    let songs = [
        { name: 'Californication' },
        { name: 'By the Way' },
    ]

    let wrap = mount(DisplayOptions, {
        propsData: {
            options: songs
        }
    })

    it('can render options', () => {
        songs.forEach(song => expect(wrap.html()).toContain(song.name))
    })
})
