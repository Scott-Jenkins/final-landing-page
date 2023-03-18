<template>
    <div v-if="items != null" class="section">
        <div class="recently-played">
            <div class="recent" v-for="item in items" >
                    <img :src="item.track.album.images[2].url" :alt="item.track.album.name">
                    <p @click="openAlbum(item.track.album.id)" class="name">{{ item.track.album.name }}</p>
            </div>
        </div>
    </div>
    
</template>

<script>

    import loader from '@/components/utilities/loading.vue'
    import artistCard from './artistCard.vue';

    export default {
        name: 'spotify',
        data: function () {
            return {
                items: null
            }
        },
        props: {
        },
        mounted () {
            this.getRecent();
        },
        methods: {
            getRecent: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getRecentlyPlayed",
                    success: function (response) {
                        response = JSON.parse(response);

                        var items = response.items//.filter((x) => x.con !== 2);

                        var itemsToReturn = [];
                        var knownContexts = [];
                        items.forEach(item => {
                            if(knownContexts.includes(item.context.uri) == false && item.context.type == 'album')
                                itemsToReturn.push(item);

                            knownContexts.push(item.context.uri);
                        });

                        self.items = itemsToReturn;
                    }
                });
                
            },
            openAlbum: function(id){
                
                this.$emit("open-album", id);
            },
        },
        components: {
            loader,
        },
    }
</script>

<style scoped>

.recently-played{
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(3, 1fr);
}

.recent{
    font-size: 12px;
    background: #272727;
    border-radius: 6px;
    padding: 10px;
    transition: 0.2s;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.664);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
}

.recent:hover{
    transform: translateY(-6px);
}

.name:hover{
    text-decoration: underline;
    cursor: pointer;
}
</style>