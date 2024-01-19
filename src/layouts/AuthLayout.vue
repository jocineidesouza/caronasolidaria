<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-2">
    <q-header>
      <q-toolbar class="bg-grey-2 text-grey-9">
        <q-btn
          flat

          icon="arrow_back_ios"
          aria-label="Voltar"
          label="voltar"
          @click="voltar"
        />
          <!-- <q-toolbar-title>
          <q-avatar>
            <img src="/icons/logo_48x48.png">
          </q-avatar>
          Carona <b>Solidária</b>
        </q-toolbar-title> -->
      </q-toolbar>
    </q-header>
    <q-page-container class="text-grey-9">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    voltar () {
      if ((window.history && window.history.state) && !window.history.length === 0) {
        this.$router.replace('/')
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
