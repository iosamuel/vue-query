import { provide, inject, onMounted, onUnmounted, toRefs, readonly } from 'vue';

import { QueryClient } from '../core'

const QueryClientSymbol = Symbol('Query provider identifier');

export const useQueryClient = (): QueryClient | undefined => inject(QueryClientSymbol);

export const useQueryClientProvider = (client: QueryClient): void => {
  provide(QueryClientSymbol, toRefs(readonly(client)));

  onMounted(() => {
    client.mount();
  });

  onUnmounted(() => {
    client.unmount();
  });
}
