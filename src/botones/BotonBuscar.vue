<template>
  <button :disabled="disabled" @click.prevent="$emit('click')" :class="`btn btn-${type} ${(size && ' btn-'+size)} ${clase}`"><i :class="`fa fa-${newIcon}`"></i> {{newLabel}}</button>
</template>

<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    icon: {
      default: 'search',
      type: String
    },
    label: {
      default: 'Buscar',
      type: String
    },
    type: {
      default: 'primary',
      type: String
    }
  }
}
</script>
