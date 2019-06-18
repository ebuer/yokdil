<template>
    <f7-page class="home">
        <div class="content">
            <h3 class="title">Yökdil Kelime</h3>
            <a class="link" href="/categories/">
                <f7-icon f7="play_round_fill"></f7-icon>
                <span class="subtitle">Başla</span>
            </a>
            <div class="info">
                <div class="item">
                    <p>Sorulan sorular:</p>
                    <span>{{info.questionsCount}}</span>
                </div>
                <div class="item">
                    <p>Doğru Cevap Sayısı:</p>
                    <span>{{info.trueQuestionsCount}}</span>
                </div>
                <div class="item">
                    <p>Yanlış Cevap Sayısı:</p>
                    <span>{{info.falseQuestionsCount}}</span>
                </div>
            </div>
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
        f7Icon
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
            f7Block
        },
        data(){
            return {
                info:JSON.parse(local.get('info'))
            }
        },
        created() {
            const self = this;
        }
    };
</script>

<style lang="scss">
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
                .title {
                    display: block;
                    text-align: center;
                    font-size: 30px;
                }
                .link {
                    /*height: 125px;*/
                    display: block;
                    text-align: center;
                    margin-top: 10vh;
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
            margin-top: 10vh;
            .item {
                width: 100%;
                p {
                    display: inline-block;
                    width: 70%;
                    font-weight: bold;
                    margin: 8px 0;
                }
                span {
                    display: inline-block;
                    width: 25%;
                    font-weight: bold;
                }
            }
        }
    }
</style>
