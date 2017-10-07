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
    }
  }
}
</script>
