<template>
    <q-layout view="lHr LpR fFf" class="bg-grey-2"  >

    <q-header  :class="isMobile ? 'bg-white text-grey-8' : 'bg-grey-2 text-grey-8 ' " :style="isMobile ? 'padding:0px' : 'padding-right:calc(10vw);padding-left:calc(10vw)'"

      :bordered="isMobile"
      class1="bg-grey-2 text-grey-8">
      <q-toolbar class1="bg-grey-2">
        <div v-if="!leftDrawerOpen ">
          <q-avatar>
            <img src="/icons/logo_48x48.png">
          </q-avatar>
          Carona <b>Solidária</b>
        </div>
             <q-btn unelevated :dense="isMobile" color="grey-4" text-color="grey-8" label="Upgrade" no-caps class="q-ml-lg" @click="$router.push('/billing/choose')"  v-if="$auth.currentUser && isAdmin && !isMobile"/>
        <q-toolbar-title>
        </q-toolbar-title>

        <q-btn v-if="!$auth.currentUser" unelevated color="primary"  style="width1:120px" label="Oferecer Carona"  class="q-ml-lg q-mx-sm" @click="$router.push('/auth/login')" />

        <q-btn-dropdown
          v-if="$auth.currentUser"
          no-caps
          flat
          unelevated
          :icon="isMobile ? 'fa-regular fa-user' : ''"
          :dense="isMobile"
        >
          <template v-slot:label>
            <div class="row items-center no-wrap ellipsis" style="font-size:0.9em;max-width:150px">
              <div class="col text-right " v-if="!isMobile">
                <div>{{$auth.currentUser.displayName}}</div>
                <div class="text-caption text-grey" style="font-size:0.8em;">{{$auth.currentUser.email}}</div>
              </div>
              <div class="items-right" v-if="false">
              <q-icon left name="person" />
              </div>

            </div>
          </template>

              <q-item clickable v-ripple @click="signOut">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>

                <q-item-section>Desconectar</q-item-section>
              </q-item>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$auth.currentUser"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          <div>
          <q-avatar>
            <img src="/icons/logo_48x48.png">
          </q-avatar>
          Carona <b>Solidária</b>
        </div>

        </q-item-label>
        <q-tabs
          animated
          swipeable
          v-if="!isLoading"
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="text-grey-9"
        >
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        </q-tabs>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="text-grey-9 q-pt-md" :style="isMobile ? 'padding-right:5px;padding-left:5px' : 'padding-right:calc(10vw);padding-left:calc(10vw)'"/>
    </q-page-container>

    <q-footer v-if="!leftDrawerOpen && $auth.currentUser && !isLoading" class="bg-white text-grey-9">
       <q-tabs
        align="justify"
        dense
         indicator-color="primary"
         active-class="text-primary"
        class="shadow-9"
        >
        <q-route-tab
          v-for="link in essentialLinks.filter((it)=> {return !isAdmin || it.main })"
          :key="'footer' + link.label"
          exact
          replace
          no-caps
          inline-label
          content-class="text-white1"
          v-bind="link"></q-route-tab>
        <q-btn-dropdown auto-close stretch flat label=""
        v-if="essentialLinks.filter((it)=> {return isAdmin && !it.main}).length > 0"
        >
          <q-list class="q-pb-lg">
            <EssentialLink
              class="text-grey-9"
              v-for="link in essentialLinks.filter((it)=> {return !it.main})"
              :key="link.caption"
              v-bind="link"
            />
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { getAuth, signOut } from 'firebase/auth'
const linksData = [
  {
    label: 'Home',
    caption: 'Página inicial',
    icon: 'home',
    to: '/home',
    main: true
  }
]

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false

    }
  },
  components: {
    EssentialLink
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
    },
    essentialLinks () {
      const self = this
      return linksData.filter((m) => {
        if (self.isAdmin) {
          return true
        } else {
          return !m.admin
        }
      })
    }
  },
  created () {
    this.load()
  },
  methods: {
    async load () {
    },
    signOut () {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          // O logoff foi bem-sucedido
          this.$router.replace('/')
        })
        .catch((error) => {
          // Ocorreu um erro durante o logoff
          console.error('Erro ao desconectar o usuário:', error)
        })
    }
  }
}
</script>
