<template>
  <button :disabled="disabled" @click.prevent="$emit('click')" :class="`btn btn-${type} ${(size && ' btn-'+size)} ${clase}`"><i :class="`fa fa-${newIcon}`"></i> {{newLabel}}</button>
</template>

<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    icon: {
      default: 'save',
      type: String
    },
    label: {
      default: 'Guardar',
      type: String
    },
    size: {
      default: 'xs',
      type: String
    }
  }
}
</script>
