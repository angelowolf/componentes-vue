import Datepicker from './Datepicker'
import Boton from './botones/Boton'
import BotonGuardar from './botones/BotonGuardar'
import BotonEditar from './botones/BotonEditar'
import BotonEliminar from './botones/BotonEliminar'
import BotonBuscar from './botones/BotonBuscar'
import BotonNuevo from './botones/BotonNuevo'
import BotonColapsable from './botones/BotonColapsable'
import SelectUbicacion from './select/SelectUbicacion'
import SelectUbicacionMapa from './select/SelectUbicacionMapa'
import InputSitio from './input/InputSitio'
import MapaUbicacion from './mapa/MapaUbicacion'
import Tabla from './tablas/Tabla'
import FormHelp from './FormHelp'

function plugin (Vue, rutas, store) {
  if (!rutas) {
    throw new Error('Ingrese el objeto con las rutas necesarias...')
  } else {
    if (!rutas.geocode) {
      throw new Error('Ingrese la Ruta geocode...')
    }
    if (!rutas.sitio) {
      throw new Error('Ingrese la Ruta sitio...')
    }
    if (!rutas.pais) {
      throw new Error('Ingrese la Ruta pais...')
    }
    if (!rutas.provincia) {
      throw new Error('Ingrese la Ruta provincia...')
    }
    if (!rutas.departamento) {
      throw new Error('Ingrese la Ruta departamento...')
    }
    if (!rutas.localidad) {
      throw new Error('Ingrese la Ruta localidad...')
    }
  }
  if (!store) {
    throw new Error('Ingrese el store...')
  }

  const moduleUbicaciones = {
    namespaced: true,
    state: { paises: [], rutas: {}},
    mutations: {
      SET_PAISES (state, paises) {
        state.paises = paises
      },
      SET_RUTAS (state, rutas) {
        state.rutas = rutas
      }
    },
    actions: {
      cargarPaises: ({ commit }) => {
        Vue.axios.get(rutas.pais).then(response => {
          commit('SET_PAISES', response.data)
        })
      },
      cargarRutas: ({ commit }, rutas) => {
        commit('SET_RUTAS', rutas)
      }
    },
    getters: {
      getPaisesTodos (state) {
        return state.paises
      },
      getRutas (state) {
        return state.rutas
      }
    }
  }
  store.registerModule('ubicaciones', moduleUbicaciones)
  store.dispatch('ubicaciones/cargarRutas', rutas)
  store.dispatch('ubicaciones/cargarPaises')

  Vue.component('btn', Boton)
  Vue.component('btn-buscar', BotonBuscar)
  Vue.component('btn-gr', BotonGuardar)
  Vue.component('btn-ed', BotonEditar)
  Vue.component('btn-el', BotonEliminar)
  Vue.component('btn-nv', BotonNuevo)
  Vue.component('btn-cp', BotonColapsable)

  Vue.component('selectUbicacion', SelectUbicacion)
  Vue.component('select-ubicacion-mapa', SelectUbicacionMapa)
  Vue.component('tabla', Tabla)
  Vue.component('fecha', Datepicker)
  Vue.component('form-help', FormHelp)

  Vue.component('input-sitio', InputSitio)
  Vue.component('mapa-ubicacion', MapaUbicacion)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Boton,
  BotonBuscar,
  BotonGuardar,
  BotonEditar,
  BotonEliminar,
  BotonNuevo,
  BotonColapsable,
  SelectUbicacion,
  SelectUbicacionMapa,
  Tabla,
  Datepicker,
  InputSitio,
  MapaUbicacion,
  FormHelp,
  version
}
