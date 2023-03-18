<template>
 <div id="theme">
     <div class="categories">
         <div @click="openTab = 1">General</div>
         <div class="active" @click="openTab = 2">Theme</div>
         <div @click="openTab = 3">Layout</div>
         <div @click="openTab = 4">CSS</div>
         <div @click="openTab = 5">Storage</div>

         <!-- <div>Accessibility</div> -->
     </div>
    <div class="options"> 
        <div class="close">
            <i class="fas fa-times" v-on:click="$emit('close')"></i>
        </div>
        <div class="menu">
            <general v-if="openTab == 1" />
            <color-scheme v-if="openTab == 2" />
            <componentLayout v-if="openTab == 3" v-bind:components-original="components" />
            <codemirror v-if="openTab == 4"/>
            <storage v-if="openTab == 5"/>
        </div>
        
    </div>
 </div>
</template>

<script>
    import general from './general.vue'
    import colorScheme from './color-scheme.vue'
    import componentLayout from './componentsLayout.vue'
    import codemirror from '../codemirror/codemirror.vue'
    import storage from './storage.vue'

    export default {
        name: 'theme',
        props: {
            components: Array
        },
        data: function () {
            return {
                openTab: 2,
            }
        },
        mounted() {

            $("#theme .categories > div").click(function (e) {
                $("#theme .categories > div").removeClass("active")
                $(this).addClass("active");
            });
        },
        components: {
            colorScheme,
            componentLayout,
            general,
            codemirror,
            storage
        }
    }
</script>

<style scoped>
    #theme{
        background: var(--background);
        box-shadow: var(--shadow);
        border-radius: var(--border-radius);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
        max-width: 1200px;
        z-index: 100;
        display: flex;
    }

    .categories{
        display: flex;
        flex-direction: column;
        font-size: 18px;
        box-shadow: var(--shadow);
        border-bottom-left-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
        min-width: 175px;
    }

    .categories > div{
        padding:12px 20px;
        cursor: pointer;
    }

    .categories > div:first-child{
        border-top-left-radius: var(--border-radius);
    }

    /* .categories > div:last-child{
        border-bottom-left-radius: var(--border-radius);
    } */

    .categories > div:hover, .categories > .active{
        background: var(--darken-background);
    }

    .options{
        padding:34px 20px;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .close{
        position: absolute;
        top: 0;
        width: 100%;
        background: #00000017;
        height: 24px;
        left: 0;
        border-top-right-radius: var(--border-radius);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .close .fa-times{
        padding-right:16px;
        color: var(--brand-red);
    }

    .options .menu{
        position: relative;
        height: 500px;
        overflow-x: hidden;
        padding: 6px 14px;
    }
</style>