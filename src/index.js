import Datepicker from './Datepicker'
import Boton from './botones/Boton'
import BotonGuardar from './botones/BotonGuardar'
import BotonEditar from './botones/BotonEditar'
import BotonEliminar from './botones/BotonEliminar'
import BotonBuscar from './botones/BotonBuscar'
import FormHelp from './FormHelp'

function plugin (Vue) {
  Vue.component('boton', Boton)
  Vue.component('boton-guardar', BotonGuardar)
  Vue.component('boton-buscar', BotonBuscar)
  Vue.component('boton-editar', BotonEditar)
  Vue.component('boton-eliminar', BotonEliminar)
  Vue.component('form-help', FormHelp)
  Vue.component('fecha', Datepicker)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Datepicker,
  Boton,
  BotonGuardar,
  BotonEditar,
  BotonEliminar,
  BotonBuscar,
  FormHelp,
  version
}
