<template>
    <div class="profile">
        <div class="pic" @click="openUpload()">
            <img :src="user.profile" />
            <input type="file" id="profileUpload" />
            <i class="fas fa-upload"></i>
        </div>
        <div class="options">
            <p class="info">Page will need to be refreshed to take effect <i class="fa fa-circle-info"></i></p>
            <div class="additional">
                <div class="type">
                    <label>Office 365</label>
                    <div :class="user.useOffice ? 'active on' : 'active'"
                        @click="user.useOffice = !user.useOffice; setUser();"></div>
                </div>
                <div class="type">
                    <label>Media</label>
                    <div :class="user.useMedia ? 'active on' : 'active'"
                        @click="user.useMedia = !user.useMedia; setUser();"></div>
                </div>
                <div class="type">
                    <label>Google</label>
                    <div :class="user.useGoogle ? 'active on' : 'active'"
                        @click="user.useGoogle = !user.useGoogle; setUser();"></div>
                </div>
                <div class="type">
                    <label>Use Background Image</label>
                    <div :class="user.useBackgroundImage ? 'active on' : 'active'"
                        @click="user.useBackgroundImage = !user.useBackgroundImage; setUser()"></div>
                </div>
            </div>
            <div class="name">
                <label>Name</label>
                <input type="text" v-model="user.name" @change="setUser();" />
            </div>
        </div>

    </div>
    <hr />

    <label>Background</label>
    <div :class="user.useBackgroundImage ? 'background-pic' : 'background-pic disabled'" @click="uploadBackground()">
        <img :src="user.backgroundImage" />
        <input type="file" id="backgroundUpload" />
        <i class="fas fa-upload"></i>
    </div>
</template>

<script>

export default {
    name: 'general',
    data: function () {
        return {
            user: getUser(),
        }
    },
    methods: {
        setUser: function () {
            setUser(this.user);
        },
        openUpload: function () {
            $("#profileUpload").click();
        },
        uploadBackground: function () {
            $("#backgroundUpload").click();
        },
        getBase64Image: function (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        setProfilePic: function (img) {
            this.user.profile = img;
            setUser(this.user);
        },
        setBackgroundPic: function (img) {
            this.user.backgroundImage = img;
            setUser(this.user);
        }
    },
    mounted() {
        var self = this;

        $("#profileUpload").change(function (evt) {
            self.getBase64Image(this.files[0]).then(
                data => self.setProfilePic(data)
            );
        });

        $("#backgroundUpload").change(function (evt) {
            self.getBase64Image(this.files[0]).then(
                data => self.setBackgroundPic(data)
            );
        });
    },
}
</script>

<style scoped>
.profile {
    display: flex;
    align-items: flex-end;
}

.info {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 4px 0;
    user-select: none;
}

.info i {
    color: var(--primary);
    font-size: 22px;
    padding-left: 10px;
}

.pic,
.background-pic {
    width: 20%;
    display: flex;
    flex-direction: column;
    margin-right: 24px;
    position: relative;
    outline: 2px dashed #ffffff3b;
    outline-offset: 4px;
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
}

.disabled {
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
}

.disabled img {
    opacity: 0.3;
}

.disabled:after {
    content: "'Use Background Image' needs to be enabled";
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 80%;
    text-align: center;
    z-index: 70;
    color: var(--brand-red);
    font-weight: calc(var(--font-weight) + 200);
    opacity: 2;
    font-size: 20px;
}

.pic img {
    max-width: 100%;
}

.background-pic {
    width: 100%;
    max-height: 240px;
    margin-top: 6px;
}

.background-pic img {
    height: 230px;
    width: 100%;
    margin: auto;
    -o-object-fit: contain;
    object-fit: contain;
}

.options {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 12px;
}

label {
    padding-bottom: 6px;
}

input[type="text"] {
    border: none;
    background: #ffffff3b;
    color: var(--font);
    width: calc(100% - 24px);
    height: 40px;
    padding: 0 12px;
}

input[type="file"] {
    display: none;
}

.pic img {
    border-radius: 100%;
}

.fa-upload {
    position: absolute;
    bottom: 4px;
}

.active {
    background: grey;
    width: 48px;
    height: 24px;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    transition: 0.4s;
}

.active:before {
    content: " ";
    background: white;
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(100% - 4px);
    aspect-ratio: 1 / 1;
    border-radius: 100px;
}

.active.on {
    background: #48cfad;
}

.active.on:before {
    right: 2px;
    left: auto;
}

.additional {
    display: grid;
    gap: 8px;
    justify-content: flex-start;
    grid-template-columns: repeat(4, 1fr);
}

.additional label {
    font-size: 12px;
}

.type {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
