<template>
    <div class="animated fadeIn">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <btn-cp block v-b-toggle.accordion1 label="Geoposición"/>
          </b-card-header>
          <b-collapse id="accordion1" visible>
            <b-card-body>
             <div class="row no-gutters">
                 <div class="col-8">
                    <gmap-map :center="center" :zoom="5" map-type-id="roadmap" style="width: 100%; height: 100%"
                    @click="clickMapa">
                      <gmap-marker v-if="marcador" :position="marcador"></gmap-marker>
                    </gmap-map>
                 </div>
                 <div class="col-4 p-2">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                          <label style="margin-bottom: 0px;">Localización</label>
                          <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                            <select
                            class="form-control form-control-sm"
                            name="localizacion"
                            v-model="localizacion"
                            @change="cambiaLocalizacion">
                              <option value="-1" disabled="true">Seleccione...</option>
                              <option value="sitio">Sitio...</option>
                              <option value="coordenadas">Coordenadas...</option>
                            </select>
                          </p>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <label style="margin-bottom: 0px;">Sitio</label>
                          <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                            <input-sitio name="sitio" class="form-control" placeholder="Sitio..." :disabled="disabledSitio" maxlength="5" v-model="codSitio" @sitio="buscoSitio"/>
                          </p>
                          <span class="text-danger" v-show="sitioNoEncontrado">
                            <i class="fa fa-exclamation-triangle"></i> El Sitio no existe
                          </span>
                        </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-sm-12">
                        <label style="margin-bottom: 0px;">Latitud</label>
                        <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                          <input type="text" name="latitud" class="form-control" placeholder="Latitud..." maxlength="5" disabled="true" :value="ubicacionLatitud">
                        </p>
                      </div>
                      <div class="col-md-6 col-sm-12">
                        <label style="margin-bottom: 0px;">Longitud</label>
                        <p class="input-group input-group-sm m-b-none" style="width: 100%;">
                          <input type="text" name="longitud" class="form-control" placeholder="Longitud..." maxlength="5" disabled="true" :value="ubicacionLongitud">
                        </p>
                      </div>
                    </div>
                    <select-ubicacion-mapa :esFiltro="false" classSelect="col-md-6 col-sm-12"
                    @localidadSeleccionada="localidadSeleccionada"
                    ref="selectUbicacion"></select-ubicacion-mapa>
                    <div class="col-12" style="margin-top: 10px;" v-if="idLocalidad == null && localizacion == 'coordenadas' && busquedaRealizada">
                      <div class="alert alert-warning">
                        <span class="text-danger">
                            <i class="fa fa-exclamation-triangle"></i> Por favor seleccione todas las opciones...
                        </span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <btn :haciendo="buscandoGeopo" :disabled="bloquearBusqueda" icon="crosshairs" label="Buscar Geoposición" style="width:100%; color:white;" newLabel="Buscando" @click="buscarGeoposicion"/>
                      </div>
                    </div>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ubicaciones')

export default {
  props: {
    idLoc: {
      type: Number,
      required: false
    },
    latitud: {
      type: Number,
      required: false
    },
    longitud: {
      type: Number,
      required: false
    },
    codigoSitio: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters([
      'getRutas'
    ])
  },
  data () {
    return {
      localizacion: -1,
      ubicacionLatitud: null,
      ubicacionLongitud: null,
      center: { lat: -31.420083299999995, lng: -64.1887761 },
      marcador: null,
      habilitarPais: false,
      validando: false,
      validacion: { paiId: null },
      disabledPais: true,
      disabledProvincia: true,
      disabledDepartamento: true,
      disabledLocalidad: true,
      disabledSitio: true,
      codSitio: null,
      sitioNoEncontrado: false,
      idLocalidad: null,
      idDepartamento: null,
      idProvincia: null,
      idPais: null,
      buscandoGeopo: false,
      bloquearBusqueda: true,
      busquedaRealizada: false
    }
  },
  methods: {
    clickMapa (ubicacion) {
      if (this.localizacion === 'coordenadas') {
        this.marcador = null
        this.limpiarCombos()
        this.cargarLatitudes(ubicacion.latLng.lat(), ubicacion.latLng.lng())
        this.bloquearBusqueda = false
        this.limpiarErrores()
      }
    },
    cambiaLocalizacion () {
      this.bloquearBusqueda = true
      if (this.localizacion === 'sitio') {
        this.disabledSitio = false
      } else {
        this.disabledSitio = true
      }
      this.limpiarErrores()
      this.limpiarSeleccion()
      this.limpiarCombos()
    },
    localidadSeleccionada (idLocalidad) {
      this.limpiarErrores()
      this.$emit('idLocalidad', idLocalidad)
    },
    buscarGeoposicion () {
      this.buscandoGeopo = true
      this.axios.get(this.getRutas.geocode + 'direccion/', { params: this.marcador }).then(r => {
        this.idLocalidad = r.data.localidad == null ? null : r.data.localidad.locCodigo
        this.idDepartamento = r.data.departamento == null ? null : r.data.departamento.depCodigo
        this.idProvincia = r.data.provincia == null ? null : r.data.provincia.prvCodigo
        this.idPais = r.data.pais == null ? null : r.data.pais.paiCodigo
        this.$refs.selectUbicacion.cargarCombos(this.idLocalidad, this.idDepartamento, this.idProvincia, this.idPais)
        this.buscandoGeopo = false
        this.busquedaRealizada = true
      })
    },
    buscoSitio (sitio) {
      this.sitioNoEncontrado = false
      if (!sitio) {
        this.sitioNoEncontrado = true
        this.limpiarSeleccion()
        this.limpiarCombos()
      } else {
        this.cargarLatitudes(sitio.sitLatitud, sitio.sitLongitud)
        if (sitio.loclCodigo) {
          this.idLocalidad = sitio.loclCodigo
          this.localidadSeleccionada(this.idLocalidad)
          this.$refs.selectUbicacion.cargarCombos(this.idLocalidad)
        }
      }
    },
    limpiarErrores () {
      this.sitioNoEncontrado = false
      this.busquedaRealizada = false
    },
    limpiarCombos () {
      this.idLocalidad = null
      this.idDepartamento = null
      this.idProvincia = null
      this.pais = null
      this.$refs.selectUbicacion.limpiarCombos()
    },
    limpiarSeleccion () {
      this.codSitio = null
      this.marcador = null
      this.ubicacionLatitud = null
      this.ubicacionLongitud = null
    },
    cargarLatitudes (lat, lng) {
      this.marcador = { lat: lat, lng: lng }
      this.center = { lat: lat, lng: lng }
      this.ubicacionLatitud = lat
      this.ubicacionLongitud = lng
    }
  },
  mounted () {
    if (this.idLoc && this.idLoc != null) {
      this.idLocalidad = this.idLoc
      this.$refs.selectUbicacion.cargarCombos(this.idLocalidad)
    }
    if (this.latitud && this.latitud != null && this.longitud && this.longitud != null) {
      this.cargarLatitudes(this.latitud, this.longitud)
    }
    if (this.codigoSitio && this.codigoSitio != null) {
      this.codSitio = this.codigoSitio
      this.localizacion = 'sitio'
    } else if (this.idLoc && this.idLoc != null) {
      this.localizacion = 'coordenadas'
    }
  }
}
</script>
<style scoped>
  .card-header > button:focus, button:active {
      outline: none;
      box-shadow: none;
  }
  header.p-1 {
      padding: 0 !important;
  }
  .card-header .btn {
      margin-top: 0;
  }
  label {
    font-weight: bold;
    font-size: .8em;
  }
</style>
