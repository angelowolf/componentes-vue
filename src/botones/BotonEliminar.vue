<script>
import BotonBase from './BotonBase'

export default {
  mixins: [BotonBase],
  props: {
    icon: {
      default: 'trash',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    type: {
      default: 'danger',
      type: String
    }
  }
}
</script>
