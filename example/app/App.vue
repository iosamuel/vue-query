<template>
  <pre>{{ results }}</pre>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from '/@vue-query/vue/useQuery'

export default {
  name: 'App',
  setup() {
    const page = ref(1)

    const { results } = useQuery(['issues', page], () =>
      fetch(
        `https://api.github.com/search/issues?q=vue&page=${page.value}&per_page=1`
      ).then(res => res.json())
    )

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
