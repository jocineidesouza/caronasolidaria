<template>
    <q-page class="flex flex-center">
        <div class="row" style="width:100%">
            <div class="col"></div>
            <div class="col-10 col-sm-8 col-md-6" style="max-width:400px">
                <span class="row text-h4"><b>Entrar</b></span>
                <div class="row items-center  q-mt-sm">
                    <span class="text-grey-7 text-body1 q-mr-md">Escolha a forma para entrar</span>
                </div>
                                <q-btn color="primary" outline  class="full-width q-mt-lg"
                    @click="logarGoogle2"
                    :loading="logandoG"
                    dark-percentage
                    unelevated
                    no-caps
                    :disable="logandoM">
                  <div class="cols">
                    <!-- <q-icon  size="3em" name="fa-brands fa-google" /> -->
                    <img style="width:30px;margin-top:5px" :src="gmail"/>
                  </div>
                    <div class="col text-left q-ml-md">Continuar com Google</div>
                </q-btn>
                  <div class="items-center text-center q-my-md">
                    <span>ou</span>
                </div>

                <div class="items-center" style="margin-top:30px">
                    <span class="row">Entrar com endereço de email</span>
                    <q-input type="email" outlined v-model="email" :dense="isMobile"
                    ref="email"
                    @keyup.enter="irParaSenha"
                    :rules="[ val => ($validarEmail(val) || 'Email inválido' )]"  />
                </div>
                  <q-btn color="primary"  class="full-width q-my-sm"
                    @click="irParaSenha"
                     unelevated
                     outline
                     label="Entrar com Email"
                     style="height:40px"
                     no-caps
                     :disable="logandoM || logandoG">
                </q-btn>
                <div class="row flex flex-center items-center q-mt-sm">
                    <span class="text-grey-7">Não tem uma conta?</span>
                    <q-btn flat no-caps color="blue" @click="goToRegister"><u>Registar-se</u></q-btn>
                </div>

                <br/><br/><br/>

            </div>
            <div class="col"></div>
        </div>
    </q-page>

</template>

<script>
import { getAuth, signInWithEmailAndPassword, sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider, signInWithRedirect, OAuthProvider } from 'firebase/auth'
import gmail from '../assets/gmail.svg'
import ms from '../assets/ms.svg'

export default {
  name: 'Login',
  data () {
    return {
      gmail,
      ms,
      email: '',
      pass: '',
      logandoM: false,
      logandoG: false
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    }
  },
  created () {
    const self = this
    console.log('authlogin created')
    self.email = self.$q.localStorage.getItem('email')
    self.$store.dispatch('chamada/sair', { self })
  },
  methods: {
    goToRegister () {
      this.$router.push({ path: '/auth/register', query: Object.assign({}, this.$route.query) })
    },
    irParaSenha () {
      const self = this
      self.$refs.email.validate()
      if (self.$refs.email.hasError) {
        return false
      }
      self.$q.localStorage.set('email', self.email)
      self.$router.push({ path: '/auth/password', query: Object.assign({}, this.$route.query) })
    },
    logar () {
      const self = this
      self.$refs.email.validate()
      if (self.$refs.email.hasError) {
        return false
      }
      self.$refs.pass.validate()
      if (self.$refs.pass.hasError) {
        return false
      }
      const auth = getAuth()
      self.logando = true
      signInWithEmailAndPassword(auth, self.email, self.pass)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user
          // ...
          self.logando = false
          self.$router.push(self.$route.query.redirect || '/')
        })
        .catch((error) => {
          self.logando = false
          console.error(error)
          // const errorCode = error.code
          // const errorMessage = error.message
          self.$q
            .dialog({
              title: 'Aviso',
              message: error.message,
              persistent: false,
              ok: 'Fechar'
            })
            .onOk(() => {
              self.isReady = true
              self.encerrarError()
            })
        })
    },
    logarGoogle () {
      const self = this
      self.logandoG = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          console.log(token)
          const user = result.user
          console.log(user)
          // IdP data available using getAdditionalUserInfo(result)
          self.logandoG = false
          self.$router.push(self.$route.query.redirect || '/')
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.customData.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)

          console.log(errorCode)
          console.log(errorMessage)
          console.log(email)
          console.log(credential)
          self.logandoG = false
          // ...
        })
    },
    logarGoogle2 () {
      const self = this
      self.logandoG = true
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider)
      self.$nextTick(() => {
        self.logandoG = false
      })
    },
    logarMS () {
      const self = this
      self.logandoM = true
      const auth = getAuth()
      const provider = new OAuthProvider('microsoft.com')
      signInWithRedirect(auth, provider)
      self.$nextTick(() => {
        self.logandoM = false
      })
    },
    logarLink () {
      // isto é só um teste, criamdp e, 01/10/2023 para testar o envio de link de email
      const self = this
      self.$refs.email.validate()
      if (self.$refs.email.hasError) {
        return false
      }
      const auth = getAuth()
      self.logando = true
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:8080/auth/finishSignUp',
        // This must be true.
        handleCodeInApp: true

      }
      sendSignInLinkToEmail(auth, self.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem('emailForSignIn', self.email)
          // ...
        })
        .catch((error) => {
          // const errorCode = error.code
          // const errorMessage = error.message
          console.error(error)
          // ...
        })
    }
  }
}
</script>
