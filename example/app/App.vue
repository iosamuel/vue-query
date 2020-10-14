<template>
  <div>
    <QueryClientProvider :client="client">
      <QueryErrorResetBoundary>
        <HelloWorld />
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  </div>
</template>

<script lang="ts">
import { QueryCache, QueryClient } from '/@vue-query/index'
import { QueryClientProvider, QueryErrorResetBoundary } from '/@vue-query/vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    QueryClientProvider,
    HelloWorld,
    QueryErrorResetBoundary
  },
  setup() {
    const cache = new QueryCache()
    const client = new QueryClient({ cache })

    return {
      client,
    }
  },
}
</script>
