<script>
  export default {
    props: {
      'form': {
        required: true
      },
      'nombre': {
        required: true
      }
    }
  }
</script>
<template>
  <span class="text-danger" v-if="form.errors.has(nombre)">{{form.errors.get(nombre)}}</span>
</template>
