import {
  provide,
  inject,
  onMounted,
  onUnmounted,
  defineComponent,
  h,
  Fragment,
} from 'vue'

import { QueryClient, Query } from '../core'

const QueryClientSymbol = Symbol('Query provider identifier')

/* Vue Composable - Inject */
export const useQueryClient = (): QueryClient | undefined =>
  inject(QueryClientSymbol)

/* Vue Composable - Provide */
export const useQueryClientProvider = (client: QueryClient): void => {
  provide(QueryClientSymbol, client)

  onMounted(() => {
    client.mount()
  })

  onUnmounted(() => {
    client.unmount()
  })
}

/* Vue Component */
export const QueryClientProvider = defineComponent({
  props: {
    client: {
      type: QueryClient,
      required: true,
    },
  },
  setup(props, { slots }) {
    useQueryClientProvider(props.client)

    return () => h(Fragment, slots.default?.())
  },
})
