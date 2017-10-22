<template>
  <input type="text" maxlength="5" :value="value" @input="cambiaCodigo($event.target.value)" @keyup.enter="buscar">
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('ubicaciones')

export default {
  name: 'InputSitio',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'getRutas'
    ])
  },
  methods: {
    cambiaCodigo (codigo) {
      if (codigo) {
        this.$emit('input', codigo.toUpperCase())
      } else {
        this.$emit('input', '')
      }
    },
    buscar () {
      if (this.value && this.value != null && this.value.length > 0) {
        this.axios.get(this.getRutas.sitio + this.value).then(r => {
          this.$emit('sitio', r.data)
        })
      }
    }
  },
  created () {
    if (this.value && this.value != null) {
      this.$emit('input', this.value.toUpperCase())
    }
  }
}
</script>