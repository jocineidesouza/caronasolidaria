<template>

      <q-page full-height1 class="row ite1ms-center" v-if="!isMobile">
        <div class="col-md-1 col-xs-12 self-center q-pl-lg"/>
         <div class="col-md-6 col-xs-12 self-center q-pl-lg">
          <div class="q-pa-lg q-gutter-lg" >

            <div class="row text-h3 q-ma-lg" style="max-width:200px;">Carona Solidária</div>

            <div class="row text-body1 q-ma-lg" style="max-width:600px">Este projeto visa não apenas criar uma solução tecnológica inovadora, mas também fomentar uma mudança de paradigma em relação à mobilidade urbana, incentivando práticas mais sustentáveis e solidárias. Através da combinação de tecnologias modernas e estratégias de engajamento comunitário, buscamos impactar positivamente a sociedade, promovendo uma mobilidade mais inteligente e ecologicamente responsável.</div>

            <q-btn color="primary" icon="search" label="Buscar Carona" class="q-mb-lg" @click="buscarCarona"/>

          </div>
         </div>
         <div class="col-md-5 col-xs-12 self-center">
          <div class="q-pa-md">
<!--
  https://www.flaticon.com/br/icones-gratis/videoconferencia
  -->
             <q-carousel
      v-model="slide"
      swipeable
      animated
      navigation
       infinite
      :autoplay="10000"
      padding
      height1="00px"
      arrows
      control-color="grey-8"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      class="bg-white text-grey-9 rounded-borders"
    >
      <q-carousel-slide name="1" class="column no-wrap flex-center">
        <img src="/icons/user_typing.png" width="200" height="200"/>
        <div class="q-mt-md text-center">
         Nosso propósito é criar uma plataforma inovadora que incentive a carona como meio de transporte compartilhado
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <img src="/icons/colaboracao.png" width="200" height="200"/>
        <div class="q-mt-md text-center">
          Aprimorar a experiência do usuário, proporcionando funcionalidades intuitivas que facilitem a criação, busca e aceitação de caronas, promovendo a eficiência do sistema.
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column no-wrap flex-center">
        <img src="/icons/videoconferencia.png" width="200" height="200"/>
        <div class="q-mt-md text-center">
          Buscamos parcerias com organizações locais, instituições de ensino e empresas para promover a adesão à carona solidária, fortalecendo o sentido de comunidade e sustentabilidade.
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="4" class="column no-wrap flex-center">
        <img src="/icons/camera_user_front.png" width="200" height="200"/>
        <div class="q-mt-md text-center">
          A implementação de um sistema de caronas solidárias não é apenas uma conquista técnica, mas também uma afirmação do poder da colaboração na busca por soluções para desafios complexos, como a mobilidade urbana sustentável.
        </div>
      </q-carousel-slide>
    </q-carousel>

          </div>
         </div>
      </q-page>

      <q-page full-height class="row ite1ms-center" v-else>
         <div class="self-center">
          <div class="q-pa-md q-gutter-lg" >

            <div class="row text-h4" style="max-width:200px">Carona Solidária</div>

            <div class="row text-body1 q-ma-lg" style="max-width:600px">Este projeto visa não apenas criar uma solução tecnológica inovadora, mas também fomentar uma mudança de paradigma em relação à mobilidade urbana, incentivando práticas mais sustentáveis e solidárias. Através da combinação de tecnologias modernas e estratégias de engajamento comunitário, buscamos impactar positivamente a sociedade, promovendo uma mobilidade mais inteligente e ecologicamente responsável.</div>

            <q-btn color="primary" icon="search" label="Buscar Carona" class="q-mb-lg" @click="buscarCarona"/>

          </div>
         </div>
      </q-page>

</template>

<script>
export default {
  data () {
    return {
      slide: '1'
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    }
  },
  created () {
    const self = this
    self.$store.dispatch('chamada/sair', { self })
  },
  methods: {
    buscarCarona () {
      const self = this
      self.$router.push('/c/search')
    }
  }
}
</script>
