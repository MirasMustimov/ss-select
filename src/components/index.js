import SsSelect from './SsSelect'
import SsSelectOption from './SsSelectOption'
import SsSelectToggle from './SsSelectToggle'
import SsSelectSearchInput from './SsSelectSearchInput'

const SsSelectComponents = {
    SsSelect,
    SsSelectOption,
    SsSelectToggle,
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
export { SsSelectToggle }
export { SsSelectSearchInput }

export { SsSelectComponents }
