<template>
    <div class="grid-item extend">
        <a :href="item.url" target="_blank">
            <div class="card">
                <img :src="validateImg(item.image)" alt="">
                <div class="bottom">
                    <p class="title">
                        {{item.title}}
                    </p>
                    <div class="source">
                        {{item.source.name}}
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>


export default {
  name: 'item',
  props:{
    item: Object
  },
  methods:{
    validateImg: function(img){
        if (img == null || img == undefined || img == ""){
            return '/img/not-found.jpg';
        } else {
            return img;
        }
    }
  },
}
</script>

<style scoped>
.grid-item{
    background: var(--widget-background);
    box-shadow: var(--shadow);
    border-radius: var(--border-radius);
    color: var(--font);
}

img{
    width:100%;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    height: 130px;
    object-fit:cover;
}

.bottom{
    padding: 12px;
    font-size: 12px;
}

.title{
        display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

a, a:visited, a:focus, a:active{
    color: var(--font);
    text-decoration:none;
}
</style>