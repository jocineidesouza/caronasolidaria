<template>
    <q-page class="flex flex-center">
        <div class="row" style="width:100%">
            <div class="col"></div>
            <div class="col-10 col-sm-8 col-md-6" style="max-width:400px">
                <span class="row text-h4"><b>Criar sua conta</b></span>
                <div class="items-center" style="margin-top:30px">
                    <span class="row">Endereço de email</span>
                <q-field color="grey-3"  outlined label="" stack-label class="q-mb-md">
                        <template v-slot:append>
                           <q-btn flat outline no-caps label="Editar" @click="$router.replace({ path: '/auth/register', query: Object.assign({}, $route.query) })"/>
                        </template>
                        <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{email}}</div>
                        </template>
                    </q-field>
                </div>
                <div class="items-center" style="margin-top:20px">
                    <span class="row">Nome</span>
                    <q-input outlined v-model="nome" :dense="isMobile" :autofocus="!isMobile"
                    ref="nome"
                    :rules="[ val => val.trim().length > 0 || 'Mínimo de 3 caracteres']"
                     />
                </div>
                <div class="items-center" >
                    <span class="row">Senha</span>
                    <q-input type="password" outlined v-model="pass1" :dense="isMobile"
                    ref="pass1"
                    :rules="[ val => ($validarSenha(val) || 'Deve conter letra minúscula, maiúscula e número. Mínimo de 8 caracteres' )]"
                    />
                </div>
                <div class="items-center" style="margin-top:20px">
                    <span class="row">Confere Senha</span>
                    <q-input type="password" outlined v-model="pass2" :dense="isMobile"
                    ref="pass2"
                     :rules="[val => pass2 === pass1 || 'Senha não confere']"
                    />
                </div>
                <div class="row items-left text-left" style="margin-top:5px">
                    <div class="items-center"  style="min-width:200px">
                        <q-badge rounded color="grey-4 q-mr-xs"/>
                        <span class="text-grey-8">Um caracter minúsculo</span>
                    </div>
                    <div class="items-center"  style="min-width:200px">
                        <q-badge rounded color="grey-4 q-mr-xs" />
                        <span class="text-grey-8">Um número</span>
                    </div>
                    <div class="items-center" style="min-width:200px">
                        <q-badge rounded color="grey-4 q-mr-xs" />
                        <span class="text-grey-8">Um caracter maiúsculo</span>
                    </div>
                    <div class="items-center" style="min-width:200px">
                        <q-badge rounded color="grey-4 q-mr-xs" />
                        <span class="text-grey-8">Mínimo de oito caracteres</span>
                    </div>
                </div>
                  <q-btn color="primary"  class="full-width q-my-md"
                    @click="registrar"
                     unelevated
                     dark-percentage
                     :loading="logando"
                     label="Criar conta"
                     style="height:40px"
                     no-caps>
                </q-btn>
                 <div class="row flex flex-center items-center q-mt-sm">
                    <span class="text-grey-7">Já tem uma conta?</span>
                    <q-btn flat no-caps color="blue" @click="goToLogin"><u>Fazer Login</u></q-btn>
                </div>

                <br/><br/><br/>

            </div>
            <div class="col"></div>
        </div>
    </q-page>

</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      nome: '',
      pass1: '',
      pass2: '',
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
    goToLogin () {
      this.$router.replace({ path: '/auth/login', query: Object.assign({}, this.$route.query) })
    },
    registrar () {
      const self = this
      self.nome = self.nome.trim()
      self.pass1 = self.pass1.trim()
      self.$refs.nome.validate()
      if (self.$refs.nome.hasError) {
        return false
      }
      self.$refs.pass1.validate()
      if (self.$refs.pass1.hasError) {
        return false
      }
      self.$refs.pass2.validate()
      if (self.$refs.pass2.hasError) {
        return false
      }

      const auth = getAuth()
      self.logando = true
      createUserWithEmailAndPassword(auth, self.email, self.pass1)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user
          // ...
          updateProfile(auth.currentUser, {
            displayName: self.nome
          }).then(() => {
            self.logando = false
            self.$router.push(self.$route.query.redirect || '/')
          }).catch((error) => {
            self.logando = false
            console.log(error)
            self.$router.push(self.$route.query.redirect || '/')
          })
        })
        .catch((error) => {
          console.error(error)
          self.logando = false
          let msg = error.message
          if (error.code === 'auth/email-already-in-use') {
            msg = 'Email já está cadastrado. '
          }

          self.$q
            .dialog({
              title: 'Erro ao criar a conta',
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
