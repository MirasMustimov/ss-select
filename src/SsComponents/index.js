import SsSelect from './SsSelect'
import SsOption from './SsOption'
import SsPlaceholder from './SsPlaceholder'
import SsSearchInput from './SsSearchInput'

const SsComponents = {
    SsSelect,
    SsOption,
    SsPlaceholder,
    SsSearchInput,
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
export { SsOption }
export { SsPlaceholder }
export { SsSearchInput }

export { SsComponents }
