<template>
    <div class="tray">
        <div v-if="album != null" class="header">
            <i @click="closeAlbum" class="fa-solid fa-xmark"></i>
            <img :src="album.images[0].url" alt="">
            <div class="info">
                <p class="album-name">{{ album.name }}</p>
                <p class="album-details">{{ album.tracks.total}} songs</p>
            </div>
        </div>
        <div v-if="album != null" class="list">
            <song v-for="(song, index) in album.tracks.items" 
            :track="song" 
            :parent-uri="album.uri" 
            :index="index"
            :cover="album.images[2].url"
            :artist-name="album.artists[0].name"
            :track-name="song.name"
            :id="song.id"
            @open-album="openAlbum"></song>
        </div>
    </div>
   
</template>

<script>

    import loader from '@/components/utilities/loading.vue';
    import song from './track.vue';

    export default {
        name: 'spotify',
        data: function () {
            return {
                album: null
            }
        },
        props: {
            albumId: Number
        },
        mounted () {
            this.getAlbum();
        },
        methods: {
            getAlbum: function(){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getAlbum?id=" + self.albumId,
                    success: function (response) {
                        self.album = JSON.parse(response);
                        self.scrollPlayingSongIntoView();
                    }
                });
            },
            closeAlbum: function(){
                this.$emit("close-album");
            },
            openAlbum: function(id){
                this.$emit("open-album", id);
            },
            scrollPlayingSongIntoView: function (){
                

                setTimeout(() => {
                    var elem = this.$el.querySelector('.track.playing');

                    if(elem == null)
                        return;

                    var topPos = elem.offsetTop
                    scrollTo(this.$el, topPos - 100); 
                }, 100);
                  
                function scrollTo(element, to) {
                    element.scrollTop = to;
                }
            }
        },
        watch: {
            albumId: function (value, oldValue) { 
                this.album = null;
                this.getalbum();
            }
        },
        components: {
            loader,
            song
        },
    }
</script>

<style scoped>
.fa-xmark{
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 22px;
    color: var(--brand-red);
}

.header{
    padding-top:12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.header img{
    height: 180px;
}

.info{
    text-align: center;
}
.album-name{
    font-size: 22px;
}
.info p{
    margin: 8px 0;
}

.list{
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: revert;
    padding-bottom: 8px;
}
</style>