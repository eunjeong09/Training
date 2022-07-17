<template>
  <div @click="openPage">google 로그인</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  // components: {  },
  setup () {
    const openPage = () =>{
      window.open(GOOGLE_LOGIN_URL, '_blank');
      console.log('gg');
    }
    const GOOGLE_CLIENT_ID = '282966391986-gv1ijkncbo22dmstk7f60atbvbf4nr3d.apps.googleusercontent.com';
    const GOOGLE_REDIRECT_URI = 'https://localhost:9001/google'

    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=email`;
    return{
      openPage
    }
  }
});
</script>

<style scoped>
div{
  padding : 10px;
  border: 2px solid purple;
  text-align: center;
}

</style>