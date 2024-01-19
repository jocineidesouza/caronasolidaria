<template >
    <q-page :class="isMobile ? 'full-width' :'flex flex-center'" >
        <div class="col" style="max-width:600px">
            <div :class="isMobile ? 'row q-mt-lg': 'row'">
             <span class="text-h4 q-ml-lg">{{domainName}}</span>
            </div>
           <q-list flat separator>

            <q-item v-for="item in data"
                :key="'caronas_' + item.id" >
          <div class="q-pa-sm row items-start">

            <q-card flat bordered :style="isMobile ? 'width:calc(100vw - 40px)' : 'min-width:550px'">
                <q-card-section horizontal>
                    <q-card-section >
                    <div  class="text-caption text-grey">Nome e Whatsapp</div>
                    <div class="text-h5">{{item.nome}}</div>
                    <div class="text q-mt-sm q-mb-xs">{{item.whatsapp}}</div>
                    <br/>
                    <div  class="text-caption text-grey">Local de Partida</div>
                    <div>{{item.localPartida}}</div>
                    </q-card-section>
               </q-card-section>
                <q-card-section horizontal>
                    <q-card-section >
                    <div  class="text-caption text-grey">Ponto de Referência</div>
                    <div>{{item.observacao}}</div>
                    </q-card-section>

                </q-card-section>
                <q-card-section horizontal>
                    <q-card-section >
                    <span class="text-caption text-grey">Horário de Saída:</span>
                    <div>
                    {{item.horaPartida}}
                    </div>
                    </q-card-section>

                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-btn no-caps color="green" class="q-ml-sm"   @click="abrirWhatsapp(item)">
                    Abrir WhatsApp
                    </q-btn>
                </q-card-actions>

            </q-card>

          </div>
        </q-item>
    </q-list>
        </div>
    </q-page>

</template>

<script>
import { query, orderBy, collection, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore'
export default {
  name: 'Caronas',
  data () {
    return {
      data: null,
      domainName: ''
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
      const self = this
      const db = getFirestore()
      self.data = null

      const docRefEmp = doc(db, 'schools', self.$route.params.id)
      const docEmp = await getDoc(docRefEmp)
      if (docEmp.exists()) {
        const dadosEmp = docEmp.data()
        const filtro = query(collection(db, 'schools', self.$route.params.id, 'caronas'), orderBy('timestamp'))
        const querySnapshot = await getDocs(filtro)
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            console.log(doc.id, ' => ', data)
            if (!self.data) { self.data = [] }
            self.data.push(data)
          })
        } else {
          self.data = []
        }
        self.domainName = dadosEmp.nome
      } else {
        self.domainName = 'Local não encontrado'
      }
    },
    goToCaronas (id) {
      this.$router.push('/c/e/' + id)
    },
    abrirWhatsapp (item) {
      const phoneNumber = '55' + item.whatsapp
      const message = 'Olá, encontrei a sua oferta de carona no app de Carona Solidária.'
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`
      window.open(whatsappLink, '_whatsapp')
    }
  }
}
</script>
