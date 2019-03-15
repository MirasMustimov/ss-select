import SsSelect from './SsSelect'
import SsSelectOption from './SsSelectOption'
import SsSelectPlaceholder from './SsSelectPlaceholder'
import SsSelectSearchInput from './SsSelectSearchInput'

const SsSelectComponents = {
    SsSelect,
    SsSelectOption,
    SsSelectPlaceholder,
    SsSelectSearchInput,
}

const SsSelectPlugin = {
  install(Vue) {
    Object.keys(SsSelectComponents).forEach(name => {
        Vue.component(name, SsSelectComponents[name])
    })
  },
}

export default SsSelectPlugin

export { SsSelect }
export { SsSelectOption }
export { SsSelectPlaceholder }
export { SsSelectSearchInput }

export { SsSelectComponents }
