<template>
  <div id="bookmarks">
        <div class="bookmarks">
            <div class="bookmark" v-for="items in bookmarks">
                <i @click="deleteBookmark(items.url)" class="far fa-trash-alt" data-toggle="tooltip" data-placement="right" title="Delete Bookmark"></i>
                <a :href="extendUrl(items.url)" target="_blank">
                    <img :src="fetchFavicon(items.url)">
                    {{shortenUrl(items.url) }}
                </a>
            </div>
            <div class="add-bookmark" @click="this.openPopup">
                <i class="fas fa-plus" aria-hidden="true"></i>
                Add Bookmark
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'bookmarks',
  data: function () {
    return {
        isplay: true,
        bookmarks: []
    }
  },
  mounted () {
    this.ArrayToJson();
  },
  methods:{
    openPopup: function(){
        Swal.fire({
            title: "Add a Bookmark",
            text: "Please enter the URL:",
            input: 'text',
            showCancelButton: true        
        }).then((result) => {
            if (result.value) {
                var olditems = JSON.parse(localStorage.getItem('bookmarks')) || []

                var newBm = 
                {
                'url': result.value
                };

                olditems.push(newBm)
                this.bookmarks = olditems
                this.ArrayToStorage()
            }
        });
    },
    ArrayToJson: function(){
        var bookmarks = localStorage.getItem('bookmarks');
        bookmarks = JSON.parse(bookmarks);

        this.bookmarks = bookmarks;
    },
    ArrayToStorage: function(){
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks) )
    },
    fetchFavicon: function(url){
        return 'http://icon.horse/icon/' +  url.replaceAll("https://", "");
    },
    shortenUrl: function(url){
        return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('.')[0]
    },
    extendUrl: function(url){
        if (url.includes("https://" || "http://") === false){
            url = "https://" + url
        }
        return url
    },
    deleteBookmark: function(BMurl){

        var self = this

        var olditems = JSON.parse(localStorage.getItem('bookmarks')) || []
        console.log(BMurl)
        $.each(olditems, function (indexInArray, valueOfElement) { 
            if (BMurl === valueOfElement.url){
                olditems.splice(indexInArray, 1)
                console.log('delete this ' + BMurl)
                self.bookmarks = olditems
                self.ArrayToStorage()
            }
        });
    }
    },
}
</script>

<style scoped>

#bookmarks{
    padding: 12px 20px;
}

.bookmarks{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 12px;
}

.bookmark{
    position:relative;
}

.bookmark a{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--font);
    text-transform: capitalize;
    gap: 6px;
    padding: 4px 12px;
    
}

.fa-trash-alt{
    opacity: 0;
    position: absolute;
    right: 0px;
    transition: 0.2s;
}
.bookmark:hover i{
    opacity: 1;
}

img{
    width: 36px;
    border-radius: 100%;
}

.add-bookmark{
    padding: 4px 16px;
    width: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.add-bookmark i{
    font-size: 38px;
    font-weight: 100;
}
</style>
