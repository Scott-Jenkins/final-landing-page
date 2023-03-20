<template>
    <div id="news">
        <div class="settings">
            <select name="" id="">
                <option value="">Test</option>
            </select>
            <i class="fa fa-gear" @click="settingsOpen = !settingsOpen"></i>
            <div class="settingsMenu" v-if="settingsOpen">
                <label for="">Items to show</label>
                <input type="number" v-model="itemsToShow" @change="setNoToShow">
            </div>
        </div>
        <loader v-if="NewsFirst == null"/>
        <div class="listing">
            <item v-for="item in NewsFirst" v-bind:item="item"/>
        <item v-for="item in lastItems" v-bind:item="item" v-if="extend"/>
        </div>
        
        <a class="btn show-more" @click="showMore()">Show More</a>
    </div>
</template>

<script>
import $ from "jquery";
    import item from '/src/components/widgets/news/item.vue'
import loader from '/src/components/utilities/loading.vue'

export default {
  name: 'news',
  props:{
  },
  data: function () {
    return {
        NewsFirst: null,
        NewsLast : null,
        url: 'https://gnews.io/api/v4/top-headlines?token=c739938a812e83d058bf79d67283f77c&lang=en',
        extend: false,
        settingsOpen: false,
        itemsToShow: 4
    }
  },
  mounted() {
    if(localStorage.getItem("NewsToShow") != null)
        this.itemsToShow = localStorage.getItem("NewsToShow");

    this.getItems();
  },
  methods: {
    getItems: function(){
        var self = this;

        $.ajax(this.url).done(function (response) {

            var items = response.articles;

            var firstSet = [];
            var lastItems = [];

            $.each(items, function (indexInArray, valueOfElement) { 

                if (indexInArray >= self.itemsToShow){
                    lastItems.push(this);
                } else {
                    firstSet.push(this);
                }
            });

            self.NewsFirst = firstSet;
            self.lastItems = lastItems;
        });
    },
    setNoToShow: function(){
        localStorage.setItem("NewsToShow", this.itemsToShow);
    },
    showMore: function(){
        this.extend = !this.extend;
    },
  },
  components: {
    item,
    loader
  }
}
</script>

<style scoped>
#news{
    
    background: none;
    box-shadow:none;
    padding: 0;
}

#news .listing{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.settingsMenu{
    background: var(--background);
    box-shadow: var(--shadow);
    border-radius: var(--border-radius);
    position: absolute;
    right: 0;
    top: 22px;
    padding: 12px;
    display: flex;
    flex-direction: column;
}

.settingsMenu input{
    width: 100%;
}

.settings{
    position: relative;
    text-align: right;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
}

.settings select{
    width: 100%;
    padding: 4px;
    margin-right: 8px;
    border-radius: 8px;
    border: none;
    background: var(--background);
    color: var(--font);
    visibility: hidden;
}
</style>