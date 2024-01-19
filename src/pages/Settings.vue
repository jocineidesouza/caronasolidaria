<template>
<div style="padding-bottom:200px" >
    <div class="row items-center q-pt-xl">
        <div class="col">

            <q-btn unelevated outline flat color="primary" label="Voltar para Home" no-caps icon="arrow_back_ios" @click="$router.replace('/home')"/>
        </div>
    </div>

    <div class="q-pa-sm">
        <div class="row">
            <span class="text-h5 q-mt-sm"><b>Configurações da conta</b></span><br/>
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
                        label="Nome da Conta *"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Não pode ser vazio']"
                    />
                </q-card-section>
                <q-card-section>
                   <q-separator/>
                </q-card-section>
                <q-card-section>
                    <b>Detalhes</b>
                </q-card-section>
                <q-card-section>
                    <div class="items-center" style="margin-top:15px;max-width:800px">
                        <span class="row">Plano atual</span>
                        <q-field color="grey-3" disabled outlined label="" stack-label class="q-mb-md">
                            <template v-slot:append>
                            <!-- <q-btn flat outline no-caps label="Editar" @click="$router.replace('/auth/login')"/> -->
                            </template>
                            <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{plano}}</div>
                            </template>
                        </q-field>
                    </div>
                               <div class="items-center" style="margin-top:15px;max-width:800px">
                        <span class="row">ID da Conta</span>
                        <q-field color="grey-3" disabled  outlined label="" stack-label class="q-mb-md">
                            <template v-slot:append>
                            <!-- <q-btn flat outline no-caps label="Editar" @click="$router.replace('/auth/login')"/> -->
                            </template>
                            <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{id}}</div>
                            </template>
                        </q-field>
                    </div>
                </q-card-section>
                <q-card-section>
                   <q-separator/>
                </q-card-section>

                <q-card-section v-if="isAdmin">
                    <q-btn color="primary"
                    :loading="salvando"
                     dark-percentage
                     unelevated
                    no-caps label="Salvar" @click="updateAccount" style="min-width:150px"/>
                </q-card-section>
            </q-card>
        </div>
        <div>
        </div>
    </div>

</div>
</template>

<script>

// import { getAuth, updateProfile } from 'firebase/auth'
// import { doc, getFirestore, writeBatch } from 'firebase/firestore'

export default {
  components: {
  },

  data () {
    return {
      filter: '',
      name: '',
      id: '',
      plano: '',
      salvo: false,
      erro: false,
      salvando: false
    }
  },
  watch: {
    isLoading: function (val, oldVal) {
      if (!val) {
        this.load()
      }
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    },
    isLoading () {
      return this.$store.getters['session/isLoading']()
    },
    conta () {
      return this.$store.getters['session/conta']()
    },
    isAdmin () {
      return this.$store.getters['session/isAdmin']()
    }
  },
  created () {
    if (!this.isLoading) {
      this.load()
    }
  },
  methods: {
    async load () {
      this.name = this.conta.title
      this.id = this.conta.id
      this.plano = this.conta.caption
    },
    async updateAccount () {
    }
  }
}
</script>
