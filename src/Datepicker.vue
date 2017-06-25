<template>
  <span class="datepicker">
    <span class="control has-addons flatpickr" ref="pickrInput" v-if="isWrap">
      <input class="input"
      :name="name"
      :placeholder="placeholder"
      type="text"
      v-model="interVal" data-input>
      <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
      <a class="button" data-clear><i class="fa fa-close"></i></a>
    </span>
    <p class="control has-icon has-icon-right" v-else>
      <input class="input" :name="name" :value="interVal" :placeholder="placeholder" type="text" v-model="interVal" ref="pickrInput">
      <i class="fa fa-calendar"></i>
      <i class="fa fa-times" @click.prevent="handleClear"></i>
    </p>
  </span>
</template>
<script scoped>
  import Flatpickr from 'flatpickr'
  import {es} from 'flatpickr/dist/l10n/es.js'// eslint-disable-line
  export default {
    props: {
      options: {
        type: Object,
        default () { return {} }
      },
      name: String,
      placeholder: String,
      val: String,
      value: {}
    },
    data () {
      return {
        interVal: this.value,
        flatPickr: null
      }
    },
    computed: {
      isWrap () {
        if (this.options) {
          return !!this.options.wrap
        }
        return false
      }
    },
    methods: {
      changeVal () {
        this.$emit('input', this.interVal)
      },
      handleClear () {
        this.flatPickr && this.flatPickr.clear()
      }
    },
    watch: {
      interVal (val) {
        this.interVal = val
        this.$emit('input', this.interVal)
      }
    },
    mounted () {
      const pickrEl = this.$refs.pickrInput
      this.options.locale = es
      this.flatPickr = new Flatpickr(pickrEl, this.options)
    },
    beforeDestroy () {
      if (this.flatPickr) {
        this.flatPickr = null
      }
    }
  }
</script>
<style scoped>
  .datepicker .has-icon i {
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .datepicker .has-icon .fa-times {
    display: none !important;
    cursor: pointer;
    pointer-events: all !important;
  }

  .datepicker .has-icon:hover .fa-times {
    display: inline-block !important;
  }

  .datepicker .has-icon:hover .fa-calendar {
    display: none;
  }

  .flatpickr-input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  span {
    font-style: inherit;
    font-weight: inherit;
  }

  .control {
    position: relative;
    text-align: left;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .control.has-icon.has-icon-right .input {
    padding-right: 32px;
  }

  .input {
    -webkit-appearance: none;
    align-items: center;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    color: #363636;
    display: inline-flex;
    font-size: 14px;
    height: 32px;
    justify-content: flex-start;
    line-height: 24px;
    padding-left: 8px;
    padding-right: 8px;
    position: relative;
    vertical-align: top;
    box-shadow: inset 0 1px 2px hsla(0, 0%, 4%, 0.1);
    max-width: 100%;
    width: 100%;
    margin: 0;
  }

  .control.has-icon.has-icon-right > .fa {
    right: 4px;
  }

  .control.has-icon > .fa {
    display: inline-block;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    vertical-align: top;
    width: 24px;
    color: #dbdbdb;
    pointer-events: none;
    position: absolute;
    top: 4px;
    z-index: 4;
  }

</style>
