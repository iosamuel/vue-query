<template>
  <pre>{{ results }}</pre>
</template>

<script lang="ts">
import { QueryClientProvider } from '/@vue-query/vue'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery } from '/@vue-query/vue/useQuery'

export default {
  name: 'App',
  components: {
    QueryClientProvider,
    HelloWorld,
  },
  setup() {
    const page = ref(1)

    const { results } = useQuery(['issues', page], () => {
      return fetch(
        `https://api.github.com/search/issues?q=vue&page=${page.value}&per_page=1`
      ).then(res => res.json())
    })

    setTimeout(() => {
      page.value += 1
      setTimeout(() => {
        page.value -= 1
      }, 2000)
    }, 2000)

    return {
      results,
    }
  },
}
</script>
