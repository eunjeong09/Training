<template lang="pug">
div(v-if='signed == true')
  p 이름 : {{ user.name }}
  p 이메일 : {{ user.email }}
div(v-else)
  #buttonDiv
button(@click='$router.push("/gmail")') Gmail 조회
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useUserStore } from '../stores/user'
declare var google: any
export default defineComponent({
  setup() {
    const user = useUserStore()
    let signed = ref(false)

    // sign in jwt
    const handleCredentialResponse = (response: any) => {
      const responsePayload = decodeJwt(response.credential)

      if (responsePayload.name !== user.name) {
        user.setName(responsePayload.name)
      }
      if (responsePayload.email !== user.email) {
        user.setEmail(responsePayload.email)
      }
      signinCheck()
    }

    // jwt decode
    const decodeJwt = (credential: string) => {
      var base64Url = credential.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
      return JSON.parse(jsonPayload)
    }

    // google script
    async function getGoogleScript() {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = () => {
          resolve()
        }
        script.onerror = () => {
          console.error('google login library load failed')
          reject()
        }
        script.async = true
        script.defer = true
        document.body.append(script)
      })
    }

    const signinCheck = () => {
      if (user.name.length === 0) {
        signed.value = false
        createButton()
      } else {
        signed.value = true
      }
      console.log('signinCheck의 signed : ' + signed.value)
    }

    const createButton = () => {
      google.accounts.id.initialize({
        client_id:
          '282966391986-gv1ijkncbo22dmstk7f60atbvbf4nr3d.apps.googleusercontent.com',
        callback: handleCredentialResponse
      })

      // Display the Sign In With Google Button
      google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
        theme: 'outline',
        size: 'large',
        auto_select: false
      })
    }

    onMounted(async () => {
      await getGoogleScript()
      signinCheck()
    })

    return { user, signed }
  }
})
</script>

<style lang="sass" scoped>
.padding
  padding: 20px
#buttonDiv
  width: 200px
  margin: 0 auto
  margin-bottom: 20px
p
  text-align: center
</style>
