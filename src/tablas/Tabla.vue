<template>
  <div class="row m-t-15">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header"><h5>{{titulo}}</h5></div>
        <div class="card-block p-none">
          <!--  <b-pagination align="end" size="md" :total-rows="100" v-model="currentPage" :per-page="10"></b-pagination> -->
          <table class="table table-slim table-hover table-striped m-b-none m-t">
            <thead>
              <tr class="text-uppercase">
                <th class="text-center" v-for="titulo in titulos">{{titulo}}</th>
                <th v-if="acciones.length > 0"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-show="!buscando && (data && data.length > 0)" v-for="dato in data" class="animated fadeIn">
                <td class="text-center" v-for="columna in columnas">{{getValue(dato, columna, '-')}}</td>
                <td class="text-center" v-if="acciones.length > 0">
                  <div class="">
                    <button v-for="accion in acciones" :class="accion.class" :name="accion.name" @click="clickBoton(accion, dato)"><i :class="accion.icon"></i>{{accion.label}}</button>
                  </div>
                </td>
              </tr>
              <tr v-show="!buscando && (!data || data.length < 1)" class="animated fadeIn"><td :colspan="columnas.length + (acciones.length != 0 ? 1 : 0)" class="text-center alert-td" style="vertical-align: middle;"><b-alert show>No se encontraton datos</b-alert></td></tr>
              <tr v-show="buscando" class="animated fadeIn"><td :colspan="columnas.length + (acciones.length != 0 ? 1 : 0)" class="text-center alert-td" style="vertical-align: middle;"><b-alert show><i class="fa-circle-o-notch fa fa-spin"></i></b-alert></td></tr>
            </tbody>
          </table>
          <!--  <b-pagination align="end" size="md" :total-rows="100" v-model="currentPage" :per-page="10"></b-pagination> -->

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Tabla-Vue',
    props: {
      columnas: {
        type: Array,
        required: true
      },
      titulos: {
        type: Array,
        required: true
      },
      data: {
        type: Array,
        required: true
      },
      acciones: {
        type: Array,
        required: false,
        default: []
      },
      buscando: {
        type: Boolean,
        required: true
      },
      titulo: {
        type: String,
        required: true
      }
    },
    methods: {
      getValue (dato, columna, defaultValue) {
        defaultValue = (typeof defaultValue === 'undefined') ? null : defaultValue
        var obj = dato
        if (columna.trim() !== '') {
          var keys = columna.split('.')
          keys.forEach(function (key) {
            if (obj !== null && typeof obj[key] !== 'undefined' && obj[key] !== null) {
              obj = obj[key]
            } else {
              obj = defaultValue
            }
          })
        }
        return obj
      },
      clickBoton (accion, dato) {
        this.$emit(accion.name, this.getValue(dato, accion.idData))
      }
    }
  }
</script>
<style scoped>
  button > i {
    color: white;
  }
 .alert-td > div{
   margin-bottom: 0px;
  }
</style>