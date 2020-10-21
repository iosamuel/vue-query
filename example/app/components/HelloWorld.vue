<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement
    done.
  </p>
  <hr />
  <pre>{{ client }}</pre>
  <hr>
  <button @click="reset">Reset</button>
  <button @click="clearReset">Clear Reset</button>
  <pre>{{isReseted}}</pre>
</template>

<script>
import { computed } from 'vue'
import { useQueryClient, useQueryErrorResetBoundary } from '/@vue-query/vue'
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
    const { isReseted, reset, clearReset } = useQueryErrorResetBoundary()

    return {
      client,
      isReseted,
      reset,
      clearReset
    }
  },
}
</script>
