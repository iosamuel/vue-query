<template>
  <QueryClientProvider :client="client">
    <HelloWorld />
  </QueryClientProvider>
</template>

<script lang="ts">
import { QueryCache, QueryClient } from '/@vue-query/index'
import { QueryClientProvider } from '/@vue-query/vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    QueryClientProvider,
    HelloWorld,
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
