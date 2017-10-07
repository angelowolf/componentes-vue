<template>
  <button :disabled="disabled" @click.prevent="click" :class="`btn btn-block btn-${type} ${(size && ' btn-'+size)} ${clase}`" type="button">{{label}} <i :class="flecha"></i></button>
</template>
<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    label: {
      required: true,
      type: String
    },
    type: {
      default: 'primary',
      type: String
    }
  },
  data () {
    return {
      colapsado: false,
      flecha: 'fa fa-angle-up pull-right'
    }
  },
  methods: {
    click () {
      if (this.colapsado) {
        this.flecha = 'fa fa-angle-down pull-right'
      } else {
        this.flecha = 'fa fa-angle-up pull-right'
      }
      this.colapsado = !this.colapsado
      this.$emit('click')
    }
  }
}
</script>
