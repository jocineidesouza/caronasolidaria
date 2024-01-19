<template>
  <div id="q-app">
    <q-linear-progress indeterminate v-if="$navegando"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
