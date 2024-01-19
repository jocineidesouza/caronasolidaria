<template>
    <div>
        <div class="row items-center q-pt-xl q-ma-xs">
            <div class="col" v-if="!isMobile">
                <span class="text-h5 q-mt-sm"><b>{{title}}</b></span><br/>
                <span class="text-body2 text-weight-thin">{{caption}}</span>
            </div>
            <div class="col" v-else>
                <span class="text-h6 q-mt-sm"><b>{{title}}</b></span><br/>
            </div>
            <div>
                <q-btn unelevated color="primary" v-if="!hideButton" :loading="loadingButton" :label="buttomText" no-caps @click="$emit('buttonclick')"/>
            </div>
        </div>

        <div class="q-ma-xs q-pt-sm" v-if="data && data.length === 0" >
            <q-card class="q-py-xl q-pa-md" flat style="min-height:250px" >
                <q-card-section class="flex flex-center no-padding">
                    <span v-if="!isMobile" class="text-h5 text-primary q-pt-lg text-center">{{noItemTitle}}</span>
                    <span v-else class="text-grey-9 q-py-lg text-center">{{noItemTitle}}</span>
                </q-card-section>
                <q-card-section class="flex flex-center no-padding q-mt-sm">
                    <span class="text-grey-8 text-center" style="max-width:800px">{{noItemCaption}}</span>
                </q-card-section>
                <q-card-actions class="row q-my-lg flex-center" v-if="!isMobile">
                    <q-btn unelevated color="primary" v-if="!hideButton" outline :loading="loadingButton" :dense="isMobile" :label="buttomText" no-caps @click="$emit('buttonclick')"/>
                </q-card-actions>
            </q-card>

        </div>
        <div class="q-pt-sm" v-if="!data">
            <div class="q-mt-lg ">
                <q-markup-table flat>
                <thead>
                    <tr>
                    <th class="text-left" style="width: 150px">
                        <q-skeleton animation="blink" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="blink" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="blink" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="blink" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="blink" type="text" />
                    </th>
                    <th class="text-right">
                        <q-skeleton animation="blink" type="text" />
                    </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="n in 4" :key="n">
                    <td class="text-left">
                        <q-skeleton animation="blink" type="text" width="85px" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="blink" type="text" width="50px" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="blink" type="text" width="35px" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="blink" type="text" width="65px" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="blink" type="text" width="25px" />
                    </td>
                    <td class="text-right">
                        <q-skeleton animation="blink" type="text" width="85px" />
                    </td>
                    </tr>
                </tbody>
                </q-markup-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'EntityList',
  props: {
    title: {
      type: String,
      default: 'Title',
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    buttomText: {
      type: String,
      default: 'Add'
    },

    icon: {
      type: String,
      default: ''
    },
    noItemTitle: {
      type: String,
      default: 'Title'
    },
    noItemCaption: {
      type: String,
      default: 'caption'
    },
    data: {
      default: null
    },
    loadingButton: {
      type: Boolean,
      default: false
    },
    hideButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMobile () {
      return this.$q.screen.width < 767
    }
  }
}
</script>
