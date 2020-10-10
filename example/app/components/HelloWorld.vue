<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement
    done.
  </p>
  <hr />
  <pre>{{ client }}</pre>
</template>

<script>
import { useQueryClient } from '/@vue-query/vue/QueryClientProvider'
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
  setup() {
    const client = useQueryClient()

    return {
      client,
    }
  },
}
</script>
