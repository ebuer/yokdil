<template>
    <f7-page class="home">
        <div class="content">
            <div class="toggle-area">
                <span v-if="app.darkmode" class="toogle-title"><f7-icon f7="eye_fill"></f7-icon></span>
                <span v-else class="toogle-title"><f7-icon f7="eye_off"></f7-icon></span>
                <label class="toggle toggle-init color-green">
                    <input type="checkbox" :checked="app.darkmode ? true : false">
                    <span class="toggle-icon"></span>
                </label>
            </div>
            <h3 class="title">Yökdil Kelime</h3>
            <div class="info">
                <div class="item">
                    <p>Sorular</p>
                    <span>{{app.info.questionsCount}}</span>
                </div>
                <div class="item">
                    <p>Doğru</p>
                    <span>{{app.info.trueQuestionsCount}}</span>
                </div>
                <div class="item">
                    <p>Yanlış</p>
                    <span>{{app.info.falseQuestionsCount}}</span>
                </div>
            </div>
            <a class="link" href="/categories/">
                <f7-icon f7="play_round_fill"></f7-icon>
                <span class="subtitle">Başla</span>
            </a>
            <f7-button class="open-alert" v-on:click="openAlert()" outline color="black">
                <f7-icon f7="info_round"></f7-icon> Internet Bağlantısı neden olmalı?
            </f7-button>
            <!--            <button v-on:click="darkmode()">dark mode</button>-->
        </div>
    </f7-page>
</template>
<script>
    import {
        f7Page,
        f7Block,
        f7Navbar,
        f7NavLeft,
        f7NavTitle,
        f7NavTitleLarge,
        f7NavRight,
        f7BlockTitle,
        f7List,
        f7ListItem,
        f7Link,
        f7Searchbar,
        f7Icon,
        f7Button,
        f7Toggle
    } from 'framework7-vue';

    export default {
        components: {
            f7Page,
            f7Navbar,
            f7NavLeft,
            f7NavTitle,
            f7NavTitleLarge,
            f7NavRight,
            f7BlockTitle,
            f7List,
            f7ListItem,
            f7Link,
            f7Searchbar,
            f7Icon,
            f7Block,
            f7Button,
            f7Toggle
        },
        data() {
            return {
                app: JSON.parse(local.get('app'))
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$

            setTimeout(function () {
                $('.toggle').on('change', function () {
                    self.darkmode()
                })
            })


        },
        methods: {
            openAlert: function () {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$
                f7.dialog.alert('lorem ipsum dolor sit amet', 'Internet Bağlantısın Önemi');
            },
            darkmode: function () {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$
                let dark = self.app.darkmode
                if (dark) {
                    dark = false
                    $('body').removeClass('dark');
                } else {
                    dark = true
                    $('body').addClass('dark');
                }
                self.app.darkmode = dark;
                local.set('app', JSON.stringify(self.app))
            }
        }
    };
</script>

<style lang="scss">
    @import "../../sass/darkmode";

    .home {
        background-color: #eff2fb;

        .page-content {
            display: flex;
            justify-content: center;
            align-content: center;
            padding: 15px;

            .content {
                /*border: 1px solid #222222;*/
                width: 100%;
                height: 100%;
                position: relative;

                .toggle-area {
                    position: relative;
                    padding-top: 10px;

                    .toogle-title {
                        /*position: absolute;*/
                        /*top: 100%;*/
                        /*left: 0;*/
                        /*padding-top: 10px;*/
                        font-size: 9px;

                        .icon {
                            font-size: 20px;
                        }
                    }
                }

                .title {
                    display: block;
                    text-align: center;
                    font-size: 30px;
                }

                .link {
                    /*height: 125px;*/
                    display: block;
                    text-align: center;
                    margin-top: 5vh;
                    margin-bottom: 5vh;

                    .icon {
                        font-size: 80px;
                        display: block;
                        color: #49c0dc;
                    }

                    .subtitle {
                        font-size: 50px;
                        display: block;
                        color: #222222;
                    }
                }

            }
        }

        .info {
            /*margin-top: 10vh;*/
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .item {
                text-align: center;
                /*width: 100%;*/

                p {
                    display: inline-block;
                    /*width: 70%;*/
                    width: 100%;
                    font-weight: bold;
                    margin: 8px 0;
                }

                span {
                    display: inline-block;
                    /*width: 25%;*/
                    font-weight: bold;
                }
            }
        }

        .open-alert {
            font-size: 10px;
            border-color: #5e5f62eb;
            color: #5e5f62eb;
            .icon {
                font-size: 20px;
            }
        }


        .toggle input[type=checkbox]:checked + .toggle-icon, .toggle input[type=checkbox]:checked + .toggle-icon:after {
            background: #49c0dc !important;
        }
    }
</style>
