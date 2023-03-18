<template>
    
    <div v-if="artists != null" class="section">

        <h3>Your Top Artists</h3>

        <div class="artists spotify-rotator">
            <artistCard v-for="artist in artists.items" :artist="artist" @artist-open="openArtist"></artistCard>
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
                artists: null,
            }
        },
        props: {
        },
        mounted () {
            this.getArtists();

            var self = this;

            $( window ).resize(function() {
                $('.rotator').slick('unslick');
                self.reformatRotator();
            });

            $( self.$el ).resize(function() {
                $('.rotator').slick('unslick');
                self.reformatRotator();
            });

            this.$nextTick(function () {
                this.reformatRotator();
            });
        },
        methods: {
            getArtists: function (){
                var self = this;

                $.ajax({
                    url: "/api/spotify/getArtists",
                    success: function (response) {
                        self.artists = JSON.parse(response);

                        self.$nextTick(function () {
                            self.reformatRotator();
                        });
                    }
                });
                
            },
            openArtist: function(id){
                
                this.$emit("artist-open", id);
            },
            reformatRotator: function(){
                return
                var width = $(this.$el.parentElement).width();
                var toShow = 2;

                if (width > 1920){
                    toShow = 14
                } else if (width > 1600){
                    toShow = 12
                } else if (width > 1200){
                    toShow = 10
                } else if (width > 900){
                    toShow = 6
                } else if (width > 600){
                    toShow = 4
                } else {
                    toShow = 2;
                }

                $('.spotify-rotator').slick({
                    slidesToShow: toShow,
                    slidesToScroll: toShow,
                });
            }
        },
        components: {
            loader,
            artistCard
        },
    }
</script>

<style scoped>
.artists{
    display: flex;
    gap: 8px;
    overflow: auto;
    padding: 12px 0;
}

h3{
    margin: 0;
}

/* the slides */
.slick-slide {
      margin: 0 8px;
  }

  /* the parent */
  .slick-list {
      margin: 0 -8px;
  }

  .slick-track{
    padding: 8px 0px;
  }
</style>