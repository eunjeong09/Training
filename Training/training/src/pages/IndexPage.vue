<template lang="pug">
h4 IndexPage
.leftArea
  //- button(@click='showUserInfo = !showUserInfo') 사용자 정보 보기
  button(@click='$router.push("/user")') 사용자 정보 보기
.rightArea
  //- user-info(v-if='showUserInfo')
</template>

<script lang="ts">
import userInfo from './userInfo.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { userInfo },
  setup() {
    const showUserInfo = ref(false)
    return { showUserInfo }
  }
})
</script>
