<template>
<div style="padding-bottom:200px" >
    <div class="row items-center q-pt-xl">
        <div class="col">

            <q-btn unelevated outline flat color="primary" label="Voltar para Home" no-caps icon="arrow_back_ios" @click="$router.replace('/home')"/>
        </div>
    </div>

    <div class="q-pa-md">
        <div class="row">
            <span class="text-h5 q-mt-sm"><b>Meu Perfil</b></span><br/>
        </div>
        <div class="q-py-md" style1="max-width: 400px">
            <q-card flat>
                <q-card-section v-if="salvo">
                    <q-banner class="bg-green-5 text-white q-mt-sm">As informações foram atualizadas com sucesso</q-banner>
                </q-card-section>
                <q-card-section v-if="erro">
                    <q-banner class="bg-red-5 text-white q-mt-sm">Erro ao tentar salvar as informações.</q-banner>
                </q-card-section>

                <q-card-section>
                    <b>Informações básicas</b>
                </q-card-section>
                <q-card-section>
                    <q-input
                        style="max-width:800px"
                        outlined
                        v-model="name"
                        label="Seu nome *"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Não pode ser vazio']"
                    />
                </q-card-section>
                <q-card-section>
                   <q-separator/>
                </q-card-section>
                <q-card-section>
                    <b>Detalhes de Login</b>
                </q-card-section>
                <q-card-section>
                    <div class="items-center" style="margin-top:15px;max-width:800px">
                        <span class="row">Endereço de email</span>
                        <q-field color="grey-3"  outlined label="" stack-label class="q-mb-md">
                            <template v-slot:append>
                            <!-- <q-btn flat outline no-caps label="Editar" @click="$router.replace('/auth/login')"/> -->
                            </template>
                            <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{$auth.currentUser.email}}</div>
                            </template>
                        </q-field>
                    </div>
                </q-card-section>
                <q-card-section>
                   <q-separator/>
                </q-card-section>
                <q-card-section>
                    Provedor de acesso:
                   <span
                    v-for="provider in $auth.currentUser.providerData"
                    :key="'pvd_' + provider.providerId">
                     <img v-if="provider.providerId === 'google.com'" class="q-ml-sm" style="width:30px;margin-top:5px" :src="gmail"/>
                     <img v-if="provider.providerId === 'microsoft.com'" class="q-ml-sm" style="width:30px;margin-top:5px" :src="ms"/>
                     <q-icon  v-if="provider.providerId === 'password'" class="q-ml-sm" size="35px" style="margin-top:-20px" name="fa-regular fa-envelope"/>
                   </span>
                </q-card-section>
                <q-card-section>
                    <q-btn color="primary"
                    :loading="salvando"
                     dark-percentage
                     unelevated
                    no-caps label="Salvar" @click="updateProfile" style="min-width:150px"/>
                </q-card-section>
            </q-card>
        </div>
        <div>
        </div>
    </div>

</div>
</template>

<script>

import { getAuth, updateProfile } from 'firebase/auth'
import { doc, getFirestore, writeBatch } from 'firebase/firestore'
import gmail from '../assets/gmail.svg'
import ms from '../assets/ms.svg'

export default {
  components: {
  },

  data () {
    return {
      gmail,
      ms,
      filter: '',
      name: this.$auth.currentUser.displayName,
      salvo: false,
      erro: false,
      salvando: false
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    }
  },
  created () {
    this.load()
  },
  methods: {
    async load () {
    },
    async updateProfile () {
      const self = this
      const db = getFirestore()
      const auth = getAuth()
      self.salvo = false
      self.erro = false
      self.salvando = true
      updateProfile(auth.currentUser, {
        displayName: self.name
      }).then(async () => {
        self.salvo = true

        const batch = writeBatch(db)

        const docRefEmp = doc(db, 'USERS', auth.currentUser.uid)
        batch.set(docRefEmp, { displayName: self.name }, { merge: true })

        // Commit the batch
        await batch.commit()
        self.salvando = false
      }).catch((error) => {
        self.erro = true
        console.log(error)
        self.salvando = false
      })
    }
  }
}
</script>
