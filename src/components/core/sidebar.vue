<template>
  <div id="sidebar" @click="themeOpen = !themeOpen">
    <!-- <i class="fas fa-cog"></i> -->
    <i class="fa-solid fa-pen"></i>
  </div>

  <theme v-if="themeOpen" v-bind:components="components" v-on:close="themeOpen = false"/>
</template>

<script>
import theme from './theme/theme.vue'

export default {
  name: 'sidebar',
  props:{
    components: Array
  },
  data: function () {
    return {
      themeOpen: false
    }
  },
  components:{
    theme
  },
  methods:{
    },
}
</script>

<style scoped>
    #sidebar {
        width: 50px;
        position: fixed;
        top: -20px;
        left: -20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 20px;
        background: var(--primary);
        border-radius: 0 0 100% 0;
        z-index: 1000;
        transition: 0.1s;
        cursor: pointer;
    }

        #sidebar:hover {
            padding: 40px;
        }

        i {
            padding: 8px;
            border-radius: 100px;
            font-size: 22px;
            margin: 4px 0;
        }



.fa-pen{
    color:var(--background);
    background-color: var(--primary);
    transition: 0.2s;
}


</style>
