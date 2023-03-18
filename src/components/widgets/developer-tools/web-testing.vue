<template>
    <div id="web-testing">
        <h2>SSL Check</h2>
        <div class="row">
            <input type="text" name="" placeholder="google.com" id="" v-model="query" class="text-input" @keyup.enter="getData"> 
            <loading v-if="loading == null"></loading>
            <div v-if="results != null" class="results">
                
                <h4 v-if="results.certDetails.subject != null">Results for: <span>{{results.certDetails.subject.CN}}</span></h4>
                <p>Message: <span>{{results.message}}</span></p>
                <p>Days Left: <span>{{results.daysLeft}}</span></p>
                <p>Expires: <span>{{results.expiry}}</span></p>
                <p>Issuer: <span>{{results.issuer}}</span></p>
            </div>
        </div>
    </div>
</template>
   
<script>

import loading from '/src/components/utilities/loading.vue'

export default {
    name: 'web-testing',
    data: function () {
        return {
            results: JSON.parse(localStorage.getItem("webTestResults")) || null,
            loading: false,
            query: ''
        }
    },
    mounted() {

    },
    methods: {
        getData: function () {
            this.loading = true;
            this.results = null;

            var self = this;

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://check-ssl.p.rapidapi.com/sslcheck?domain=" + this.query,
                "headers": {
                    "X-RapidAPI-Key": "b11910c071msh3ea041eaa90af26p14f827jsn36ddcc0c9d92",
                    "X-RapidAPI-Host": "check-ssl.p.rapidapi.com"
                }
            };

            $.ajax(settings).done(function (response) {
                self.loading = false;
                self.results = response;

                localStorage.setItem("webTestResults", JSON.stringify(response));
            });
        }
    },
    components: {
        loading
    }
}
</script>
   
<style scoped>
h2 {
    margin-top: 0;
}

span{
    color: var(--primary);
    padding-left: 12px;
    font-weight: 600;
}

p{
    margin: 4px 0;
}
</style>