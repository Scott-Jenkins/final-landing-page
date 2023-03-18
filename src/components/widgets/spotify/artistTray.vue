<template>
    <div class="tray">
        <div v-if="artist != null" class="header">
            <i @click="closePlaylist" class="fa-solid fa-xmark"></i>
            <img :src="artist.images[0].url" alt="">
            <div class="info">
                <p class="artist-name">{{ artist.name }}</p>
                <!-- <p class="artist-details">Monthly Listeners</p> -->
            </div>
        </div>

        <h3>Popular Songs</h3>

        <div v-if="artistTracks != null" :class="expanded ? 'list expanded' : 'list'">
            
            <song v-for="(song, index) in artistTracks.tracks" 
            :track="song" 
            :parent-uri="song.album.uri" 
            :index="index"
            :cover="song.album.images[2].url"
            :track-name="song.name"
            :id="song.id"
            @open-album="openAlbum"
            ></song>
        </div>

        <a class="expand" @click="expanded = !expanded" >{{ expanded ? 'Show Less' : 'Show More' }}</a>


        <h3>Discography</h3>

        <div v-if="albums != null" class="media">
            <div class="pills">
                <div v-if="albums.length > 0" @click="albumType = 'album'" :class="albumType == 'album' ? 'pill active' : 'pill'">Albums</div>
                <div v-if="singles.length > 0" @click="albumType = 'single'" :class="albumType == 'single' ? 'pill active' : 'pill'">Singles & EPs</div>
                <div v-if="compilations.length > 0" @click="albumType = 'compilations'" :class="albumType == 'compilations' ? 'pill active' : 'pill'">Compilations</div>
                <div v-if="appears_on.length > 0" @click="albumType = 'appears_on'" :class="albumType == 'appears_on' ? 'pill active' : 'pill'">Appears On</div>
            </div>
            <div class="albums">
                <albumCard 
                    v-if="albumType == 'album'"
                    v-for="album in albums" 
                    :album="album"
                    @open-album="openAlbum">
                </albumCard>

                <albumCard 
                    v-if="albumType == 'single'"
                    v-for="single in singles" 
                    :album="single"
                    @open-album="openAlbum">
                </albumCard>

                <albumCard 
                    v-if="albumType == 'compilations'"
                    v-for="album in compilations" 
                    :album="album"
                    @open-album="openAlbum">
                </albumCard>

                <albumCard 
                    v-if="albumType == 'appears_on'"
                    v-for="album in appears_on" 
                    :album="album"
                    @open-album="openAlbum">
                </albumCard>
            </div>
        </div>

    </div>
   
</template>

<script>

    import loader from '@/components/utilities/loading.vue';
    import song from './track.vue';
    import albumCard from './albumCard.vue';

    export default {
        name: 'spotify',
        data: function () {
            return {
                artist: null,
                artistTracks: null,
                expanded: false,
                albums: null,
                singles: null,
                compilations: null,
                appears_on: null,
                albumType: 'album'
            }
        },
        props: {
            artistId: String
        },
        mounted () {
            this.getArtist();

            
        },
        methods: {
            getArtist: function(){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getArtist?id=" + self.artistId,
                    success: function (response) {
                        self.artist = JSON.parse(response);
                    }
                });

                $.ajax({
                    url: "/api/spotify/getArtistSongs?id=" + self.artistId,
                    success: function (response) {
                        self.artistTracks = JSON.parse(response);
                    }
                });

                $.ajax({
                    url: "/api/spotify/getArtistAlbums?id=" + self.artistId,
                    success: function (response) {
                        response = JSON.parse(response);

                        self.albums = response.items.filter(a => a.album_type == 'album');

                        self.singles = response.items.filter(a => a.album_type == 'single');

                        self.compilations = response.items.filter(a => a.album_type == 'compilation');

                        self.appears_on = response.items.filter(a => a.album_type == 'appears_on');
                    }
                });
            },
            closePlaylist: function(){
                this.$emit("close-artist");
            },
            openAlbum: function(id){
                this.$emit("open-album", id);
            }
            
        },
        watch: {
            artistId: function (value, oldValue) { 
                this.artist = null;
                this.artistTracks = null;
                this.getArtist();
            }
        },
        components: {
            loader,
            song,
            albumCard
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
    z-index: 4;
}

.tray{
    overflow-y: auto;
}
.header{
    padding-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    height: 130px;;
}

.header:after{
    content: "";
    background: rgb(25,20,20);
    background: linear-gradient(0deg, rgba(25,20,20,1) 10%, rgba(25,20,20,0) 100%);
    z-index: 2;
    position: absolute;
    bottom: -12px;
    left: -12px;
    width: calc(100% + 24px);
    height: 100%;
}

.header img{
    height: 150px;
    object-fit: cover;
    margin: -12px;
    width: calc(100% + 24px);
}

.info{
    text-align: left;
    position: absolute;
    bottom: -10px;
    left: 0;
    z-index: 3;
}
.artist-name{
    font-size: 22px;
    font-weight: bold;
}

.artist-details{
    font-size: 10px;
}
.info p{
    margin: 0;
}

.list{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: calc(48px * 5 + 2px);
    transition: 0.2s;
    padding-bottom: 8px;
}

.list.expanded{
    height: 100%;
}

.expand{
    cursor: pointer;
    font-size: 12px;
    padding: 14px 0;
    opacity: 0.6;
}

.expand:hover{
    opacity: 1;
}

.albums{
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
    gap: 8px;
    padding: 4px 2px;
}

.media{
    display: flex;
    flex-direction: column;
}

.pills{
    display: flex;
    gap: 8px;
    padding: 2px;
}

.pill{
    background: white;
    padding: 2px 8px;
    font-size: 12px;
    color: var(--spotify-black);
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
}

.pill.active, .pill:hover{
    color: white;
    background: var(--spotify-green);
}
</style>