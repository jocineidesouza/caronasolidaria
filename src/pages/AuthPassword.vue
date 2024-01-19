<template>
    <q-page class="flex flex-center">
        <div class="row" style="width:100%">
            <div class="col"></div>
            <div class="col-10 col-sm-8 col-md-6" style="max-width:400px">
                <span class="row text-h4"><b>Entre com a sua senha</b></span>
                <div class="items-center" style="margin-top:30px">
                    <span class="row">Endereço de email</span>
                <q-field color="grey-3"  outlined label="" stack-label class="q-mb-md">
                        <template v-slot:append>
                           <q-btn flat outline no-caps label="Editar" @click="$router.replace({ path: '/auth/login', query: Object.assign({}, $route.query) })"/>
                        </template>
                        <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{email}}</div>
                        </template>
                    </q-field>
                </div>
                <div class="items-center" >
                    <span class="row">Senha</span>
                    <q-input type="password" outlined v-model="pass" :dense="isMobile" :autofocus="!isMobile"
                    ref="pass"
                    @keyup.enter="logar"
                    :rules="[ val => ($validarSenha(val) || 'Deve conter letra minúscula, maiúscula e número. Mínimo de 8 caracteres' )]"
                    />
                </div>

                  <q-btn color="primary"  class="full-width q-my-md"
                    @click="logar"
                     dark-percentage
                     :loading="logando"
                     unelevated
                     label="Continuar"
                     style="height:40px"
                     no-caps>
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      pass: '',
      logando: false
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    }
  },
  created () {
    const self = this
    self.email = self.$q.localStorage.getItem('email')
  },
  methods: {
    goToRegister () {
      this.$router.push({ path: '/auth/register', query: Object.assign({}, this.$route.query) })
    },
    logar () {
      const self = this
      //   self.$refs.email.validate()
      //   if (self.$refs.email.hasError) {
      //     return false
      //   }
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
          let msg = error.message
          if (error.code === 'auth/invalid-login-credentials') {
            msg = 'Credencias inválidas.'
          }

          self.$q
            .dialog({
              title: 'Erro ao entrar na conta',
              message: msg,
              persistent: false,
              ok: 'Fechar'
            })
            .onOk(() => {
              self.isReady = true
            })
        })
    }

  }
}
</script>
