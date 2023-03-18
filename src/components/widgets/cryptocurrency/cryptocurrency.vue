<template>
    <div id="crypto-currency" v-if="results != null">

        <div class="rotator">
            <div v-for="crypto in results">

                <div class="crypto">
                    <img :src="crypto.iconUrl" alt="">

                    <div class="info">
                        <p>{{ crypto.name }}</p>

                        <div class="change">
                        <i
                            :class="crypto.change >= 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'"></i>
                        <p :class="crypto.change >= 0 ? 'green' : ''">{{ crypto.change }}%</p>
                    </div>
                    </div>
                    
                </div>

            </div>
        </div>

        <div class="rotator">
            <div v-for="crypto in results2">

                <div class="crypto">
                    <img :src="crypto.iconUrl" alt="">

                    <div class="info">
                        <p>{{ crypto.name }}</p>

                        <div class="change">
                        <i
                            :class="crypto.change >= 0 ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'"></i>
                        <p :class="crypto.change >= 0 ? 'green' : ''">{{ crypto.change }}%</p>
                    </div>
                    </div>
                    
                </div>

            </div>
        </div>

    </div>
</template>
   
<script>

import loading from '/src/components/utilities/loading.vue'

export default {
    name: 'crypto-currency',
    data: function () {
        return {
            results: null,
            results2: null
        }
    },
    mounted() {
        this.getData();

        var self = this;

        $( window ).resize(function() {
            $('.rotator').slick('unslick');
            self.reformatRotator();
        });

    },
    methods: {
        getData: function () {
            var self = this;

            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "b11910c071msh3ea041eaa90af26p14f827jsn36ddcc0c9d92",
                    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com"
                }
            };

            $.ajax(settings).done(function (response) {
                self.results = response.data.coins.splice(0, 10);
                self.results2 = response.data.coins.splice(11, 10);
            });
        },
        reformatRotator: function(){
            var width = $(this.$el).width();
            var toShow = 2;

            if (width > 1920){
                toShow = 10
            } else if (width > 1600){
                toShow = 8
            } else if (width > 1200){
                toShow = 6
            } else if (width > 900){
                toShow = 4
            } else if (width > 600){
                toShow = 3
            }
            console.log(toShow)
            $('.rotator').slick({
                slidesToShow: toShow,
                slidesToScroll: toShow,
                autoplay: true,
                autoplaySpeed: 10000,
            });
        }
    },
    updated: function () {
        this.$nextTick(function () {
            this.reformatRotator();

            
        })
    },
    components: {
        loading,
    }
}
</script>
   
<style scoped>
#crypto-currency {
    display: flex;
    flex-direction: column;
    gap: 12px;
} 

.crypto {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: flex-start;
    padding-left: 50px;
}

img {
    width: 32px;
    ;
}

p{
    margin: 0;
}

.fa-arrow-trend-down, .change p {
    color: var(--brand-red);
}

.fa-arrow-trend-up, .change p.green {
    color: var(--brand-green);
}

.change {
    cursor: default;
    font-size: 22px;
    display: flex;
    align-items: center;
    gap: 14px;
}
</style>