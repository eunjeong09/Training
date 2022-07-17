<template>
  <h1>google</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'GooglePage',

  setup() {
    onMounted(() => {
      // console.log('fdfdfdf');
      alert('gg');
    });
    return {};
  },
});
</script>
