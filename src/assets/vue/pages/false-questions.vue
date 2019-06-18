<template>
    <f7-page class="page-question">
        <f7-navbar title="Soru" back-link="back" sliding></f7-navbar>

        <f7-block v-if="info.falseQuestions.length > 0">
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
        <f7-block v-else>
            <p class="info">Hatalı soru kalmamıştır.</p>
<!--            <f7-link class="btn-cat" href="/categories/">Ana menü</f7-link>-->
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
                questionId: '',
                question: '',
                answers: '',
                continueGameBtn: false,
                info: JSON.parse(local.get('info'))
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$
            // f7.views.main.router.back('/categories/', {'force' : true});

            if (self.info.falseQuestions.length > 0) {
                self.getNewQuestion()
            } else {
                setTimeout(function () {
                    $('.page-question').removeClass('hide')
                })
            }

        },
        methods: {
            goBack: function(){
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$;
            },
            answer: function (answer, event) {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$;
                const clicked = event.target

                $('.answer').addClass('clicked')


                if (!answer) {
                    $(clicked).addClass('false')
                } else {
                    let item = self.info.falseQuestions.find(x => x.questionId === self.questionId)

                    self.info.falseQuestionsCount--
                    self.info.trueQuestionsCount++

                    self.info.falseQuestions.splice(self.info.falseQuestions.indexOf(item), 1);
                }

                local.set('info', JSON.stringify(self.info))

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

                let items = self.info.falseQuestions

                let item = items[Math.floor(Math.random() * items.length)];

                setTimeout(function () {
                    self.question = item['question']
                    self.answers = item.answers
                    self.questionId = item.questionId
                    $('.answer').removeClass('clicked true false')

                    self.loader('hide')
                }, 300)
            }
        }
    }
</script>

<style lang="scss">
    @import "../../sass/main";


</style>
