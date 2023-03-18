<template>

    <div :class="isPlaying ? 'track playing' : 'track'">
        <div class="number">
            {{ index + 1 }}
             <div v-if="isPlaying" class="soundIcon">
                <div class="box box1"></div>
                <div class="box box2"></div>
                <div class="box box3"></div>
                <div class="box box4"></div>
                <div class="box box5"></div>
            </div>
            <i v-if="isPlaying && currentlyPlaying" @click="pauseSong" class="fa-solid fa-circle-pause"></i>
            <i v-else @click="playSong" class="fa-solid fa-circle-play"></i>
        </div>
        <div class="thumb">
            
            <img v-if="hideCover == false" :src="cover" loading="lazy"> 
        </div>

        <div class="info">
            <p @click="openAlbum" class="name" :title="trackName">{{ trackName }}</p>
            <p class="artist"> 
                <span v-if="track.artists != null" v-for="(artist, index) in track.artists">
                    {{ artist.name }}
                    <span v-if="track.artists.length > 1 && index != track.artists.length -1" class="comma">, </span>
                 </span>
                 <span v-else>
                    {{ artistName }}
                 </span>
            </p>
        </div>

        <p class="length">{{ Duration }}</p>

        <div v-if="popupVisible" class="popup">No active device found</div>

    </div>
   
</template>

<script>

    import loader from '@/components/utilities/loading.vue'

    export default {
        name: 'track',
        data: function () {
            return {
                Duration: null,
                isPlaying: window.currentlyPlayingSong == this.id,
                popupVisible: false,
                currentlyPlaying: window.isCurrentlyPlaying
            }
        },
        props: {
            track: Object,
            parentUri: String,
            index: Number,
            cover: String,
            artistName: String,
            trackName: String,
            id: String,
            hideCover: {
                type: Boolean,
                default: false
            }
        },
        mounted () {
            setInterval(() => {
                this.isPlaying = window.currentlyPlayingSong == this.id;
                this.currentlyPlaying = window.isCurrentlyPlaying;
            }, 500);
        },
        methods: {
            playSong: function (){
                var self = this;
                
                $.ajax({
                    url: "/api/spotify/play",
                    data: {
                        "context_uri": self.parentUri,
                        "position": self.index
                    },
                    success: function (response) {

                        response = JSON.parse(response);

                        if(response.error){
                            self.popupVisible = true;
                            setTimeout(() => {
                                self.popupVisible = false;
                            }, 5000);
                        }
                    }
                });
            },
            openAlbum: function(){
                this.$emit("open-album", this.track.album.id);
            },
            pauseSong: function(){
                $.ajax({
                    url: "/api/spotify/togglePlayback?play=" + false,
                });
            }
        },
        computed: {
            Duration: function (){
                if(this.track == null)
                    return null;

                var tempTime = moment.duration(this.track.duration_ms);
                
                var seconds = tempTime.seconds();

                if(seconds < 10)
                    seconds = "0" + seconds;
                
                return tempTime.minutes() + ":" + seconds;
            },
        },
        components: {
            loader,
        },
    }
</script>

<style scoped>
.track{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    position: relative;
    animation-delay: 0.2s;
    animation: fadein 0.2s;
    padding: 4px 8px;
    border-radius: 6px;
}

.track:hover{
    background: #272727;
}
@keyframes fadein {
    from { 
        opacity: 0; 
    }
    to   { 
        opacity: 1; 
    }
}

.popup{
    background: var(--spotify-green);
    color: white;
    font-size: 12px;
    font-weight: 400;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 2px 16px;
    border-radius: 14px;
    animation: error 3s;
    opacity: 0;
}

@keyframes error {

    0% {
        opacity: 0;
    }
    8% {
        opacity: 1;
    } 
    85% {
        opacity: 1;
    } 
    100% {
        opacity: 0;
        display: none;
    }
}

.number{
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    position: relative;
}

img{
    width: 42px;
}

.thumb{
    position: relative;
    display: flex;
    width: 42px;
}
.number i{
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.number:hover i{
    opacity: 1;
    z-index: 6;
    font-size: 20px;
}

.number:hover {
    font-size: 0;
}

.number:hover .soundIcon{
    display: none;
}
.info {
    width: 100%;
    cursor: pointer;
}
.info p{
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.artist{
    opacity: 0.6;
}

.playing .name{
    color: var(--spotify-green);
    font-weight: 500;
}

.playing .number{
    font-size: 0;
}

.comma{
    position: relative;
    right: 3px;
}

.soundIcon{
    display: flex;
    justify-content: space-between;
    height: 28px;
    --boxSize: 2px;
    --gutter: 4px;
    width: calc((var(--boxSize) + var(--gutter)) * 5);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
}

.soundIcon .box{
  transform: scaleY(.4);
  transform-origin: bottom;
  height: 100%;
  width: var(--boxSize);
  background: var(--spotify-green);
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 8px;
}

.soundIcon .box1{
  animation-name: quiet;
}

.soundIcon .box2{
  animation-name: normal;
}

.soundIcon .box3{
  animation-name: quiet;
}

.soundIcon .box4{
  animation-name: loud;
}

.soundIcon .box5{
  animation-name: quiet;
}


@keyframes quiet {
  25%{
    transform: scaleY(.6);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.6);
  }
}
@keyframes loud {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(1.2);
  }
}


</style>