import {
  provide,
  inject,
  onMounted,
  onUnmounted,
  toRefs,
  readonly,
  defineComponent,
  h,
  Fragment,
} from 'vue'

import { QueryClient } from '../core'

const QueryClientSymbol = Symbol('Query provider identifier')

/* Vue Composable - Inject */
export const useQueryClient = (): QueryClient | undefined =>
  inject(QueryClientSymbol)

/* Vue Composable - Provide */
export const useQueryClientProvider = (client: QueryClient): void => {
  provide(QueryClientSymbol, toRefs(readonly(client)))

  onMounted(() => {
    client.mount()
  })

  onUnmounted(() => {
    client.unmount()
  })
}

/* Vue Component */
export const QueryClientProvider = defineComponent(
  (props: { client: QueryClient }, { slots }) => {
    useQueryClientProvider(props.client)

    return () => h(Fragment, slots.default)
  }
)
