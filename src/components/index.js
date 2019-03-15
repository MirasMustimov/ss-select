import SsSelect from './SsSelect'
import SsSelectOption from './SsSelectOption'
import SsSelectPlaceholder from './SsSelectPlaceholder'
import SsSelectSearchInput from './SsSelectSearchInput'

const SsComponents = {
    SsSelect,
    SsSelectOption,
    SsSelectPlaceholder,
    SsSelectSearchInput,
}

const SsSelectPlugin = {
  install(Vue) {
    Object.keys(SsComponents).forEach(name => {
        Vue.component(name, SsComponents[name])
    })
  },
}

export default SsSelectPlugin

export { SsSelect }
export { SsSelectOption }
export { SsSelectPlaceholder }
export { SsSelectSearchInput }

export { SsComponents }
