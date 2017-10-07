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
    newLabel: {
      default: 'Buscando',
      type: String
    },
    type: {
      default: 'primary',
      type: String
    }
  }
}
</script>
