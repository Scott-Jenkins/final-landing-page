<template>

    <img :src="user.profile" id="profile">

    <div v-if="user.useOffice" id="office">
        <!-- <i class="fa fa-grip"></i> -->
        <div v-for="item in office" class="item" :title="item.title">
            <a :href="item.url" target="_blank">
                <img :src="item.img" alt="">
            </a>
        </div>
    </div>

    <div v-if="user.useMedia" id="media">
        <!-- <i class="fa fa-grip"></i> -->
        <div v-for="item in media" class="item" :title="item.title">
            <a :href="item.url" target="_blank">
                <img :src="item.img" alt="">
            </a>
        </div>
    </div>
    <div v-if="user.useGoogle" id="google">
        <!-- <i class="fa fa-grip"></i> -->
        <div v-for="item in google" class="item" :title="item.title">
            <a :href="item.url" target="_blank">
                <img :src="item.img" alt="">
            </a>
        </div>
    </div>
    
</template>

<script>


export default {
  name: 'additionalMedia',
  data: function () {
    return {
        user: getUser(),
        office: [
            {
                title: 'Office',
                url: 'https://www.office.com/?auth=1',
                img: '/src/assets/office.svg'
            },
            {
                title: 'Word',
                url: 'https://www.office.com/launch/word?auth=1',
                img: '/src/assets/word.svg'
            },
            {
                title: 'Excel',
                url: 'https://www.office.com/launch/excel?auth=1',
                img: '/src/assets/excel.svg'
            },
            {
                title: 'PowerPoint',
                url: 'https://www.office.com/launch/powerpoint?auth=1',
                img: '/src/assets/powerpoint.svg'
            },
            {
                title: 'Outlook',
                url: 'https://outlook.com',
                img: '/src/assets/outlook.svg'
            },
            {
                title: 'OneDrive',
                url: 'https://onedrive.live.com/',
                img: '/src/assets/onedrive.svg'
            },
            {
                title: 'OneNote',
                url: 'https://www.onenote.com/',
                img: '/src/assets/onenote.svg'
            },
            {
                title: 'To Do',
                url: 'https://to-do.microsoft.com/tasks/',
                img: '/src/assets/todo.svg'
            },
            {
                title: 'Calendar',
                url: 'https://onedrive.live.com/calendar',
                img: '/src/assets/calendar.svg'
            },
        ],
        media: [
            // {
            //     title: 'Spotify',
            //     url: 'https://open.spotify.com/',
            //     img: '/src/assets/Spotify.png'
            // },
            {
                title: 'Netflix',
                url: 'https://www.netflix.com/gb/',
                img: '/src/assets/Netflix.png'
            },
            {
                title: 'Disney Plus',
                url: 'https://www.disneyplus.com/',
                img: '/src/assets/DisneyPlus.png'
            },
        ],
        google: [
            {
                title: 'YouTube',
                url: 'https://www.youtube.com/',
                img: '/src/assets/YouTube.png'
            },
            {
                title: 'Gmail',
                url: 'https://mail.google.com/mail/',
                img: '/src/assets/gmail.png'
            },
            {
                title: 'Google Drive',
                url: 'https://drive.google.com/',
                img: '/src/assets/google-drive.png'
            },
            {
                title: 'Google Maps',
                url: 'https://maps.google.co.uk/maps',
                img: '/src/assets/google-maps.png'
            },
        ]
    }
  },  
  mounted (){
  }, 
  methods:{

  },
}
</script>

<style scoped>
    #office {
        display: flex;
        position: fixed;
        top: 112px;
        height: auto;
        left: 0;
        width: 42px;
        flex-direction: column;
        padding: 4px;
        gap: 4px;
        background: var(--widget-background);
        border-radius: 0 8px 8px 0;
        box-shadow: var(--shadow);
    }

    #media {
        display: flex;
        position: fixed;
        top: 58px;
        height: auto;
        right: 0;
        width: 42px;
        flex-direction: column;
        padding: 4px;
        gap: 4px;
        background: var(--widget-background);
        border-radius: 8px 0 0 8px;
        z-index: 10;
        box-shadow: var(--shadow);
    }

    #google {
        display: flex;
        position: fixed;
        top: 236px;
        height: auto;
        right: 0;
        width: 42px;
        flex-direction: column;
        padding: 4px;
        gap: 4px;
        background: var(--widget-background);
        border-radius: 8px 0 0 8px;
        z-index: 10;
        box-shadow: var(--shadow);
    }

.item{
    padding: 6px;
    transition: 0.2s;
}

#profile{
    position: fixed;
    top: 5px;
    right: 8px;
    width: 36px;
    box-shadow: var(--shadow);
    border-radius: 100px;
}

.item:hover{
    transform: scale(1.2);
}

img{
    width: 100%;
}
</style>