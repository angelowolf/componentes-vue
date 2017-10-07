<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    icon: {
      default: 'plus',
      type: String
    },
    label: {
      default: 'Nuevo',
      type: String
    },
    type: {
      default: 'success',
      type: String
    }
  }
}
</script>
