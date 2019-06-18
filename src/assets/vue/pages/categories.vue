<template>
    <f7-page class="page-category">
        <div class="navbar">
            <div class="navbar-inner sliding">
                <div class="left"><a href="/" class="link icon-only icon-only"><i class="icon icon-back"></i></a>
                </div>
                <div class="title">Kategori Seç</div>
            </div>
        </div>
        <f7-block>
            <f7-link class="btn-cat" href="/levels/fen/">Fen</f7-link>
            <f7-link class="btn-cat" href="/levels/sosyal/">Sosyal</f7-link>
            <f7-link class="btn-cat" href="/levels/saglik/">Saglik</f7-link>
        </f7-block>
<!--        <f7-block>-->
<!--            <f7-link class="btn-cat" href="/question/fen/">Fen</f7-link>-->
<!--            <f7-link class="btn-cat" href="/question/sosyal/">Sosyal</f7-link>-->
<!--            <f7-link class="btn-cat" href="/question/saglik/">Saglik</f7-link>-->
<!--        </f7-block>-->
        <f7-block>
            <f7-link class="btn-cat" href="/false-questions/">Yanlış Soruları tekrar cevapla</f7-link>
        </f7-block>
    </f7-page>
</template>
<script>
    import {f7Page, f7Navbar, f7BlockTitle, f7Block, f7Button, f7Row, f7Col, f7Link} from 'framework7-vue';

    export default {
        components: {
            f7Page,
            f7Navbar,
            f7BlockTitle,
            f7Block,
            f7Button,
            f7Row,
            f7Col,
            f7Link
        },
        data(){
            return {
                app:JSON.parse(local.get('app'))
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$
            // f7.views.main.router.refreshPage()
            // f7.views.main.router.back('categories', {force: true, ignoreCache: true});

        }
    };
</script>

<style lang="scss">
    @import "../../sass/main";
</style>
