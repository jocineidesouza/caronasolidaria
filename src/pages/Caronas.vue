<template >
    <q-page :class="isMobile ? 'full-width' :'flex flex-center'">

      <q-list flat separator  class="q-pa-md row items-start q-gutter-md">
        <q-item  v-if="$auth.currentUser">
          <CaronasList />
        </q-item>

        <q-item clickable
        @click="goToCaronas(item.id)"
                v-for="item in data"
                :key="item.id" >
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card  flat bordered class="full-width">
              <q-img
              :style="isMobile ? 'width:calc(100vw - 40px)' : 'min-width:570px'"
                :src="item.imagem"
              />

              <q-card-section>
                <div class="text-overline text-orange-9">{{item.bairro}}-{{item.municipio}}/{{item.estado}}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{item.nome}}</div>
                <div class="text-caption text-grey">
                  {{item.endereco}}
                </div>
              </q-card-section>

              <q-card-actions>
                <q-btn flat  color="primary" >Ver Caronas</q-btn>
                <q-space />

              </q-card-actions>

            </q-card>

          </div>
        </q-item>
    </q-list>

    </q-page>

</template>

<script>
import CaronasList from 'components/CaronasList.vue'
import { query, orderBy, collection, getDocs, getFirestore } from 'firebase/firestore'
export default {
  name: 'Caronas',
  data () {
    return {
      data: null
    }
  },
  components: {
    CaronasList
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    }
  },
  created () {
    this.$store.dispatch('session/login', { self })
    this.load()
  },
  methods: {
    async load () {
      const self = this
      const db = getFirestore()
      self.data = null
      const filtro = query(collection(db, 'schools'), orderBy('nome'))
      const querySnapshot = await getDocs(filtro)
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          data.id = doc.id
          console.log(doc.id, ' =>.. ', data)
          if (!self.data) { self.data = [] }
          self.data.push(data)
        })
      } else {
        self.data = []
      }
    },
    goToCaronas (id) {
      this.$router.push('/c/e/' + id)
    }
  }
}
</script>
