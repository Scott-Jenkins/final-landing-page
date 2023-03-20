<template>
    <div class="editorContainer">

    </div>
    <a class="btn" @click="saveCss">Save</a>

</template>

<script>

import {getCSS, setCSS} from "/src/helper.js";
import CodeMirror from 'codemirror'
export default {
    name: 'theme',
    data: function () {
        return {
            code: getCSS,
            cssModal: null,
        }
    },
    mounted() {
        var editorContainer = document.querySelector('.editorContainer');

        this.cssModal = CodeMirror(editorContainer, {
            lineNumbers: true,
            mode: 'CSS',
            value: this.code
        })
    },
    methods: {
        saveCss: function () {
            var code = this.cssModal.getValue();
            setCSS(code);
        },
    },
}
</script>

<style scoped>

.editorContainer{
    margin-bottom: 12px;
}
    .btn{
        color: white;
        background: var(--brand-green);
        padding: 4px 16px;
        border-radius: 8px;
        float: right;
        cursor: pointer;
    }
</style>