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

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SsSelectPlugin)
}

export default SsSelectPlugin

export { SsSelect }
export { SsSelectOption }
export { SsSelectPlaceholder }
export { SsSelectSearchInput }

export { SsComponents }
