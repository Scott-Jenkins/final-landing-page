<template>
    
    <div v-if="playlists != null" class="section">

        <h3>Your Playlists</h3>

        <div class="playlists">
            <playlistCard v-for="playlist in playlists.items" :playlist="playlist" @playlist-open="openPlaylist"></playlistCard>
        </div>
    </div>
    
</template>

<script>

    import loader from '@/components/utilities/loading.vue'
    import playlistCard from './playlistCard.vue';

    export default {
        name: 'spotify',
        data: function () {
            return {
                playlists: null,
            }
        },
        props: {
        },
        mounted () {
            this.getPlaylists();
        },
        methods: {
            getPlaylists: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getPlaylists",
                    success: function (response) {
                        self.playlists = JSON.parse(response);
                    }
                });
                
            },
            openPlaylist: function(id){
                
                this.$emit("playlist-open", id);
            }
        },
        components: {
            loader,
            playlistCard
        },
    }
</script>

<style scoped>
.playlists{
    display: flex;
    gap: 8px;
    overflow: auto;
    padding: 12px 0;
}

h3{
    margin: 0;
}
</style>