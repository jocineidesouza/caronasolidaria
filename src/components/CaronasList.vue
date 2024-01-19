<template>
<div>
   <EntidadeList
     title="Minhas Caronas"
     caption="Registre aqui as caronas que você pode compartilhar."
     buttomText="Compartilhar Carona"
     noItemTitle="Você não tem caronas compartilhadas registradas"
     noItemCaption=""
    :data="data"
    :loadingButton="loadingButton"
    @buttonclick="novaCarona"
    />
    <div class="q-pt-sm" v-if="data && data.length > 0">
       <q-table
        flat
        class="q-mt-lg "
        :data="data"
        :columns="columns"
        row-key="id"
       >

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props" @click="abrirCarona(props.row)">
            <!-- <div class="text-blue-9 q-my-sm"><a :href="'/c/' + props.row.id" target="new">{{props.row.id}}</a><span class="material-icons q-ml-xs text-grey-9">launch</span></div> -->
            <div class="cursor-pointer text-blue-9 q-my-sm"><u>{{props.row.escola.label}}</u></div>

          </q-td>
          <q-td key="localPartida" :props="props" @click="abrirCarona(props.row)">
              {{ props.row.localPartida}}
          </q-td>
          <q-td key="horaPartida" :props="props" @click="abrirCarona(props.row)">
              {{ props.row.horaPartida }}
          </q-td>
          <q-td key="active" :props="props" @click="abrirCarona(props.row)">
            <q-badge :color="props.row.enable ? 'green' : 'red'">
              {{ (props.row.enable ? 'ativo' : 'pausado') }}
            </q-badge>
          </q-td>
          <q-td key="manager" :props="props">
            <q-btn-dropdown
                  split
                  unelevated
                  color="grey-4"
                  text-color="text-grey-9"
                  label="Abrir"
                  no-caps
                  @click="abrirCarona(props.row)"
                >
                  <q-list>

                    <q-item clickable v-close-popup >
                      <q-item-section>
                        <q-item-label @click="deletarCarona(props.row)" class="text-red">Remover Carona</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

    <q-dialog v-model="onNovaCaronaOpen" full-height>
       <q-card :style="isMobile ? 'width: 100%' : 'width: 550px; max-width: 550px;'" class="text-grey-9">
        <q-card-section class="row items-center q-pb-none" >
          <div class="text-h6">Cadastrar Corona</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-gutter-md">
            <q-select dense outlined v-model="carona.escola" :options="escolas" label="Selecione o Destino" />
            <q-input dense outlined v-model="carona.nome" label="Seu Nome" />
            <q-input dense outlined v-model="carona.whatsapp" label="Número do seu Whatsapp" />
            <q-input dense outlined v-model="carona.localPartida" label="Local da Partida" />
            <q-input dense outlined v-model="carona.horaPartida" mask="time" label="Horário de Partida" :rules="['time']">
               <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="carona.horaPartida">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="fECHAR" color="primary" flat />
                      </div>
                    </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
            </q-input>
            <q-input dense outlined v-model="carona.observacao" label="Ponto de referência" />
        </q-card-section>

        <q-card-actions align="right" class="q-mx-sm">
          <q-btn unelevated color="grey-4" class="text-grey-10" style="width:130px" no-caps label="Cancelar" v-close-popup/>
          <q-btn unelevated color="primary" no-caps style="width:130px" label="CADASTRAR" :loading="loading" dark-percentage  @click="criarCarona"  />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="onEditCaronaOpen" full-height>
       <q-card :style="isMobile ? 'width: 100%' : 'width: 550px; max-width: 550px;'" class="text-grey-9">
        <q-card-section class="row items-center q-pb-none" >
          <div class="text-h6">Cadastrar Corona</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="q-gutter-md">
            <q-select dense outlined v-model="carona.escola" :options="escolas" label="Selecione o Destino" />
            <q-input dense outlined v-model="carona.nome" label="Seu Nome" />
            <q-input dense outlined v-model="carona.whatsapp" label="Número do seu Whatsapp" />
            <q-input dense outlined v-model="carona.localPartida" label="Local da Partida" />
            <q-input dense outlined v-model="carona.horaPartida" mask="time" label="Horário de Partida" :rules="['time']">
               <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="carona.horaPartida">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="fECHAR" color="primary" flat />
                      </div>
                    </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
            </q-input>
            <q-input dense outlined v-model="carona.observacao" label="Ponto de referência" />
        </q-card-section>

        <q-card-actions align="right" class="q-mx-sm">
          <q-btn unelevated color="grey-4" class="text-grey-10" style="width:130px" no-caps label="Cancelar" v-close-popup/>
          <q-btn unelevated color="primary" no-caps style="width:130px" label="ALTERAR" :loading="loading" dark-percentage  @click="salvarCarona"  />
        </q-card-actions>
      </q-card>
    </q-dialog>

</div>
</template>

<script>
import { date } from 'quasar'
import EntidadeList from 'components/EntityList.vue'
import { getAuth } from 'firebase/auth'
import { query, orderBy, serverTimestamp, collection, getDocs, getFirestore, doc, writeBatch } from 'firebase/firestore'
export default {
  components: {
    EntidadeList
  },
  props: {
    nao_usado: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      escolas: [],
      carona: {
        id: null,
        escola: null,
        nome: null,
        whatsapp: null,
        localPartida: null,
        horaPartida: '',
        observacao: null
      },

      data: null,
      loading: false,
      loadingButton: false,
      onNovaCaronaOpen: false,
      onEditCaronaOpen: false
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
    columns () {
      const columns = [
        {
          name: 'id',
          required: true,
          label: 'Escola',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        }
      ]
      if (!this.isMobile) {
        columns.push({ name: 'localPartida', align: 'left', label: 'Local Partida', field: 'localPartida', sortable: true })
        columns.push({ name: 'horaPartida', align: 'left', label: 'Hora', field: 'horaPartida', sortable: true })
        columns.push({ name: 'active', align: 'center', label: 'Status', field: 'active', sortable: true })
      }
      columns.push({ name: 'manager', label: '', field: 'manager' })

      return columns
    }
  },
  created () {
    if (!this.isLoading) {
      this.load()
    }
  },
  methods: {
    async load () {
      const self = this
      const db = getFirestore()
      const auth = getAuth()
      self.data = null
      self.escolas = []

      const refSchools = query(collection(db, 'schools'), orderBy('nome'))
      const querySchools = await getDocs(refSchools)
      if (querySchools.docs.length > 0) {
        querySchools.forEach((doc) => {
          const data = doc.data()
          self.escolas.push({
            id: doc.id,
            label: `${data.nome}, ${data.municipio}/${data.estado}`,
            value: doc.id
          })
        })
        self.carona.escola = self.escolas[0]
      }

      const refCaronas = query(collection(db, 'USERS', auth.currentUser.uid, 'caronas'), orderBy('timestamp', 'desc'))
      const queryCaronas = await getDocs(refCaronas)
      if (queryCaronas.docs.length > 0) {
        queryCaronas.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          console.log(doc.id, ' => ', data)
          if (!self.data) { self.data = [] }
          self.data.push(data)
        })
      } else {
        self.data = []
      }
    },
    getDate (timestamp) {
      const s = date.formatDate(new Date(timestamp.seconds * 1000), 'DD/MM/YYYY') // HH:mm:ss')
      if (s === undefined) {
        return 'Agora mesmo'
      }
      console.log(s)
      return s
    },
    novaCarona () {
      this.carona.id = null
      this.carona.nome = null
      this.carona.whatsapp = null
      this.carona.localPartida = null
      this.carona.horaPartida = ''
      this.carona.observacao = null
      this.onNovaCaronaOpen = true
    },
    abrirCarona (link) {
      this.carona = link
      this.onEditCaronaOpen = true
    },
    async criarCarona () {
      const self = this
      const db = getFirestore()
      const auth = getAuth()
      const batch = writeBatch(db)
      self.loading = true

      const refCaronas = collection(db, 'USERS', auth.currentUser.uid, 'caronas')
      const refCarona = doc(refCaronas)
      const refCaronaPublicar = doc(db, 'schools', self.carona.escola.id, 'caronas', refCarona.id)
      const link = {
        id: refCarona.id,
        escola: self.carona.escola,
        nome: self.carona.nome,
        whatsapp: self.carona.whatsapp,
        localPartida: self.carona.localPartida,
        horaPartida: self.carona.horaPartida,
        observacao: self.carona.observacao,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        createAt: serverTimestamp(),
        timestamp: serverTimestamp(),
        enable: true
      }

      batch.set(refCarona, link, { merge: true })
      batch.set(refCaronaPublicar, link, { merge: true })

      await batch.commit()

      self.loading = false
      self.onNovaCaronaOpen = false
      self.loadingButton = false
    },
    async salvarCarona () {
      const self = this
      const db = getFirestore()
      const auth = getAuth()
      const batch = writeBatch(db)
      self.loading = true

      const refCarona = doc(db, 'USERS', auth.currentUser.uid, 'caronas', self.carona.id)
      const refCaronaPublicar = doc(db, 'schools', self.carona.escola.id, 'caronas', self.carona.id)
      const link = {
        id: refCarona.id,
        escola: self.carona.escola,
        nome: self.carona.nome,
        whatsapp: self.carona.whatsapp,
        localPartida: self.carona.localPartida,
        horaPartida: self.carona.horaPartida,
        observacao: self.carona.observacao,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        timestamp: serverTimestamp(),
        enable: true
      }

      batch.set(refCarona, link, { merge: true })
      batch.set(refCaronaPublicar, link, { merge: true })

      await batch.commit()

      self.loading = false
      self.onEditCaronaOpen = false
      self.loadingButton = false
    },
    deletarCarona (link) {
      const self = this
      const auth = getAuth()
      this.$q.dialog({
        title: 'Você tem certeza?',
        message: 'Deseja excluir esta Carona <b>' + link.escola.label + '</b>? Esta ação não pode ser revertida.',
        html: true,
        ok: {
          label: 'Cancelar',
          color: 'grey-6',
          push: false
        },
        cancel: {
          push: false,
          color: 'red-5',
          label: 'Sim, deletar',
          loading: self.loading
        },
        persistent: false
      }).onOk(() => {

      }).onCancel(async () => {
        const db = getFirestore()
        const batch = writeBatch(db)
        self.loading = true

        const refCarona = doc(db, 'USERS', auth.currentUser.uid, 'caronas', link.id)
        const refCaronaPublicar = doc(db, 'schools', self.carona.escola.id, 'caronas', link.id)

        batch.delete(refCarona)
        batch.delete(refCaronaPublicar)

        await batch.commit()

        self.data = self.data.filter((d) => {
          return d.id !== link.id
        })
        self.loading = false
      }).onDismiss(() => {
      })
    }
  }
}
</script>
