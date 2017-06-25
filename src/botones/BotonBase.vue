<script>
  export default {
    props: {
      clase: {
        default: '',
        type: String
      },
      type: {
        default: 'success',
        type: String
      },
      icon: {
        default: 'plus',
        type: String
      },
      size: {
        default: 'sm',
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
      labelCarga: {
        default: '',
        type: String
      }
    },
    data () {
      return {
        disabled: false,
        newIcon: this.icon,
        newLabel: this.label
      }
    },
    methods: {
      toggleState () {
        this.disabled = !this.disabled
        this.newIcon = this.disabled ? 'circle-o-notch fa-spin' : this.icon
        this.newLabel = this.disabled && this.labelCarga !== '' ? this.labelCarga : this.label
      }
    }
  }
</script>
