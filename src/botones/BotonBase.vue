<template>
  <button :disabled="haciendo || disabled" @click.prevent="$emit('click')" :class="`btn btn-${type} ${(size && ' btn-'+size)} ${clase}`" type="button"><i :class="[haciendo ? 'fa-circle-o-notch fa fa-spin' : `fa fa-${icon}`]"></i> {{haciendo ? newLabel : label}}</button>
</template>
<script>
  export default {
    props: {
      clase: {
        default: '',
        type: String
      },
      type: {
        default: 'primary',
        type: String
      },
      size: {
        default: 'sm',
        type: String
      },
      icon: {
        default: 'plus',
        type: String
      },
      iconSize: {
        default: '',
        type: String
      },
      label: {
        default: '',
        type: String
      },
      newLabel: {
        default: '',
        type: String
      },
      disabled: {
        default: false,
        type: Boolean
      },
      haciendo: {
        default: false,
        type: Boolean
      }
    }
  }
</script>
