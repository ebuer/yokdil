<template>
    <f7-page class="page-question hide">
        <f7-navbar title="Soru" back-link="Back" sliding></f7-navbar>
        <f7-block>

            <f7-card class="question-card">
                <f7-card-content>
                    <p>Aşağıdakilerden hangisi <b>{{question}}</b> ifadesinin Türkçe
                        karşılığıdır ?</p>
                </f7-card-content>
            </f7-card>
            <f7-card class="answer-card">
                <f7-button class="answer" :data-answer=item.isTrue v-for="item in answers"
                           v-on:click="answer(item.isTrue, $event)" fill>
                    {{item.word}}
                </f7-button>

            </f7-card>
            <f7-button class="answer continue" v-if="continueGameBtn" v-on:click="continueGame()">
                <f7-icon f7="arrow_right_round_fill"></f7-icon>
                Devam Et
            </f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
    import {
        f7Page,
        f7Navbar,
        f7Block,
        f7Link,
        f7Card,
        f7CardContent,
        f7Button,
        f7Preloader,
        f7Icon
    } from "framework7-vue";

    export default {
        components: {
            f7Page,
            f7Navbar,
            f7Block,
            f7Link,
            f7Card,
            f7CardContent,
            f7Button,
            f7Preloader,
            f7Icon
        },
        data() {
            return {
                category: 'fen',
                questionId: '',
                question: '',
                answers: '',
                continueGameBtn: false,
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$

            // self.loader('show')

            let category = f7route.category

            if (category !== undefined && category !== '') self.category = category;

            self.getNewQuestion()

            // setTimeout(function () {
            //     self.loader('hide')
            // }, 1000)

        },
        methods: {
            answer: function (answer, event) {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$;
                const clicked = event.target

                $('.answer').addClass('clicked')

                if (!answer) $(clicked).addClass('false')

                $('.answer[data-answer="true"]').addClass('true')

                self.continueGameBtn = true;


            },
            continueGame() {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$;

                self.continueGameBtn = false;


                self.getNewQuestion()


            },
            loader: function (method) {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$;


                let selector = $('.page-question')

                if (method === 'show') {
                    f7.preloader.show('blue')
                    selector.addClass('hide')
                } else {
                    f7.preloader.hide()
                    selector.removeClass('hide')
                }

            },
            randomList: function (array) {

                let currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;

            },

            getNewQuestion: function () {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params;
                const $ = f7.$;
                self.loader('show')

                setTimeout(function () {
                    f7.request.get('http://yakakartim.net/api/OyunYokdil/index.php?questionCategory=' + self.category, function (data) {
                        data = JSON.parse(data)
                        if (!self.checkId(data.result.id)) self.getNewQuestion()
                        self.question = data.result.word + "(" + data.result.type + ")";
                        self.answers = self.randomList(data.result.means);
                        self.questionId = data.result.id
                        $('.answer').removeClass('clicked true false')
                        self.setId(self.questionId)
                        self.loader('hide')
                    });
                }, 300)
            },
            checkId: function (id) {
                let status = true
                let idList = JSON.parse(window.localStorage.getItem('id-list'));
                if (idList !== null && idList.some(e => e === id)) status = false
                return status

            },
            setId: function (id) {
                let idList = JSON.parse(window.localStorage.getItem('id-list'));

                if (idList === null || idList === undefined) idList = []

                if (idList.length > 50) idList.shift()


                idList.push(id)

                window.localStorage.setItem('id-list', JSON.stringify(idList));
            }
        }
    }
</script>

<style lang="scss">
    .page-question {
        position: relative;
        background-color: #eff2fb;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: transparent;
            z-index: -9999;
            transition: 300ms;
            opacity: 0;
        }

        &.hide {
            &:after {
                background-color: #fff;
                z-index: 9999;
                opacity: 1;
            }
        }

        .navbar {
            background: #fff;
            &:before {
                background: transparent;
            }
            .navbar-inner {
                .left {
                    position: absolute;
                    z-index: 9999;
                    .icon {
                        &:after {
                            font-weight: bold;
                            color: #49c0dc;
                        }
                    }
                }
                .title {
                    width: 100%;
                    text-align: center;
                    font-weight: bold;
                    font-size: 23px;
                }
            }
        }
    }

    .question-card {
        padding: 5px;
    }

    .answer-card {
        margin-top: 30px;
        background: transparent;
        box-shadow: none;
    }

    .answer {
        margin: 10px 0;
        text-transform: lowercase !important;
        height: auto;
        min-height: 55px;
        /*background-color: #444444;*/
        background-color: #49c0dc;
        border: 1px solid #EEEEEE;
        color: #EEEEEE;
        display: flex;
        align-content: center;
        justify-content: center;

        &.clicked {
            pointer-events: none;
        }

        &.true {
            background-color: #99d815;
        }

        &.false {
            background-color: #F44336;
        }

        &.continue {
            height: 40px;
            color: #444444;
            text-transform: capitalize !important;
            background-color: transparent;
            border: 0;
            box-shadow: none;
            margin-top: 15px;

            .icon {
                margin-right: 10px;
            }
        }
    }
</style>
