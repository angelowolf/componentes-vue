<script>
import SelectUbicacion from './SelectUbicacion'
export default {
  name: 'SelectUbicacionMapa',
  mixins: [SelectUbicacion],
  methods: {
    limpiarCombos () {
      this.provincias = []
      this.departamentos = []
      this.localidades = []
      this.paisSelect = this.esFiltro ? -1 : null
      this.provinciaSelect = this.esFiltro ? -1 : null
      this.departamentoSelect = this.esFiltro ? -1 : null
      this.localidadSelect = this.esFiltro ? -1 : null
      this.disabledPais = true
      this.disabledProvincia = true
      this.disabledDepartamento = true
      this.disabledLocalidad = true
    },
    cargarCombos (idLocalidad, idDepartamento, idProvincia, idPais) {
      if (idLocalidad && idLocalidad !== null) {
        this.$http.get(`${this.getRutas.localidad}getCompleto?id=${idLocalidad}`).then(response => {
          this.provincias = response.data.provincias
          this.departamentos = response.data.departamentos
          this.localidades = response.data.localidades
          this.paisSelect = response.data.idPais
          this.provinciaSelect = response.data.idProvincia
          this.departamentoSelect = response.data.idDepartamento
          this.localidadSelect = response.data.idLocalidad
        })
      } else if (idDepartamento && idDepartamento !== null) {
        this.$http.get(`${this.getRutas.departamento}getCompleto?id=${idDepartamento}`).then(response => {
          this.provincias = response.data.provincias
          this.departamentos = response.data.departamentos
          this.localidades = response.data.localidades
          this.paisSelect = response.data.idPais
          this.provinciaSelect = response.data.idProvincia
          this.departamentoSelect = response.data.idDepartamento
          this.localidadSelect = this.esFiltro ? -1 : null
          this.disabledLocalidad = false
        })
      } else if (idProvincia && idProvincia !== null) {
        this.$http.get(`${this.getRutas.provincia}getCompleto?id=${idProvincia}`).then(response => {
          this.provincias = response.data.provincias
          this.departamentos = response.data.departamentos
          this.localidades = []
          this.paisSelect = response.data.idPais
          this.provinciaSelect = response.data.idProvincia
          this.departamentoSelect = this.esFiltro ? -1 : null
          this.localidadSelect = this.esFiltro ? -1 : null
          this.disabledLocalidad = false
          this.disabledDepartamento = false
        })
      } else if (idPais && idPais !== null) {
        console.log(1)
        this.cambiaPais()
      } else {
        console.log(0)
        this.limpiarCombos()
      }
    }
  },
  created () {
    this.disabledPais = true
    this.disabledProvincia = true
    this.disabledDepartamento = true
    this.disabledLocalidad = true
  }
}
</script>