<template>
  <div>
    <div v-for="row in rows" class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props:{
    rows: {
        type: Number,
        default: 4
    }
  }
}
</script>

<style scoped>
.loader {
    height: 16px;
    width: 100%;
    margin: 12px 0;
    animation-duration: 1.25s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #F6F6F6;
    background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
    background-size: 800px 104px;
    position: relative;
    border-radius: 4px;
    opacity: 0.4;
}

@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}
</style>
