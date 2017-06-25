<template>
  <button :disabled="disabled" @click.prevent="$emit('click')" :class="`btn btn-${type} ${(size && ' btn-'+size)} ${clase}`"><i :class="`glyphicon glyphicon-${newIcon}`"></i> {{newLabel}}</button>
</template>

<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    icon: {
      default: 'edit',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    type: {
      default: 'primary',
      type: String
    },
    size: {
      default: 'xs',
      type: String
    }
  }
}
</script>
