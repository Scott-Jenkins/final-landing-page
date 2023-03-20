<template>
    <div id="football-scores">
        <div v-if="games != null" class="games">
            <div v-for="(game, index) in games" class="game" :class="game.pinned ? 'pinned game' : 'game'">
                <div class="live" :time-elapsed="game.fixture.status.elapsed">Live</div>
                <i class="fa-solid fa-thumbtack" @click="pinGame(index, game.pinned)"></i>
                <div class="home">

                    <div class="team">
                        <img :src="game.teams.home.logo" :alt="game.teams.home.name" loading="lazy">
                        <p class="name">{{game.teams.home.name}}</p>
                    </div>
                    
                    
                </div>

                <div class="scores">
                    <p class="score">{{game.goals.home}}</p>
                    <i class="fa fa-minus"></i>
                    <p class="score">{{game.goals.away}}</p>
                </div>

                

                <div class="away">

                    

                    <div class="team">
                        <img :src="game.teams.away.logo" :alt="game.teams.away.name" loading="lazy">
                        <p class="name">{{game.teams.away.name}}</p>
                    </div>

                </div>

            </div>
        </div>
        <loader v-else></loader>
        <div v-if="games != null && games.length == 0" class="no-results">No Games Currently Playing</div>
    </div>
</template>

<script>
import $ from "jquery";
import loader from '/src/components/utilities/loading.vue'

export default {
    name: 'football',
    props: {
    },
    data: function () {
        return {
            games: null
        }
    },
    mounted() {

        this.getItems();

        // setInterval(() => {
        //     this.getItems();
        // }, 60000);
    },
    methods: {
        getItems: function () {

            var self = this;

            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all",
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": "b11910c071msh3ea041eaa90af26p14f827jsn36ddcc0c9d92",
                    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
                }
            };

            $.ajax(settings).done(function (response) {
                self.games = response.response;
            });
        },
        pinGame: function(index, value){
            var games = this.games;
            games.forEach(game => {
                game.pinned = false;
            });

            games[index].pinned = !value;

            this.games = games;
        }
    },
    components: {
        loader
    }
}
</script>

<style scoped>

#football-scores{
    position: relative;
    max-height: calc(90px * 5);
}

i.fa-thumbtack{
    font-size: 12px;
    position: absolute;
    right: 8px;
    top: 12px;
    color: var(--font);
    opacity: 0;
    transition: 0.2s;
    width: 22px !important;
}

.game:hover i.fa-thumbtack{
    opacity: 1;
}

#football-scores:before{
    background-image: url("/src/assets/footballBg.jpg");
    background-position: center;
    opacity: 0.4;
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: 100%;
    border-radius: var(--border-radius);
}

.no-results{
    text-align: center;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
}

.games{
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 450px;
    overflow: auto;
}
    .game{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 12px;
        background: var(--widget-background);
        border-radius: 12px;
        box-shadow: var(--shadow);
        position: relative;
        user-select: none;
        height: 80px;
    }

    .game.pinned{
        position: fixed;
        bottom: 32px;
        left: 32px;
        width: 375px;
        z-index: 1;
    }

    .game.pinned i.fa-thumbtack{
        opacity: 1;
        z-index: 2;
    }

    .game.pinned > *{
        z-index: 1;
    }

    .game.pinned::before{
        background-image: url("/src/assets/footballBg.jpg");
        background-position: center;
        opacity: 0.4;
        content: " ";
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
        height: 100%;
        border-radius: 12px;
    }

    .live{
        position: absolute;
        top: 6px;
        left: 6px;
        background: var(--brand-red);
        border-radius: 12px;
        padding: 0px 4px;
        font-size: 12px;
        color: white;
        width: 40px !important;
        justify-content: center !important;
    }

    .live:before{
        content: attr(time-elapsed);
        position: absolute;
        right: -20px;
        color: var(--font);
        font-weight: calc(var(--font-weight) + 200);
    }

    img{
        width: 42px;
    }

    .game > *{
        display: flex;
        align-items: center;
        justify-content: space-between;
            width: 100%;
    }

    .game > i{
        text-align: center;
        width: 100px;
        justify-content: center;
    }
    .team{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }

    .home .team{
        padding-right: 36px;
        align-items: flex-end;
    }

    .away .team{
        padding-left: 36px;
        align-items: flex-start;
    }
    .name{
        font-size: 12px;
    }

    p{
        margin: 4px 0;
    }

    .score{
        font-size: 24px;
    }

    .home .score{
        text-align: right;
    }

    .scores{
        width: 175px;
    }
</style>