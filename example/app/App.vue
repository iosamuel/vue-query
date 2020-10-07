<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      count: 0
    }
  },
  setup(_props, _ctx) {
    const showAlert = ref(true);

    const log = (event: boolean) => showAlert.value = event;
    const handleAlertVisibility = (_event: any) => {
      showAlert.value = !showAlert.value;
    }

    return {
      log,
      showAlert,
      handleAlertVisibility
    }
  }
}
</script>
