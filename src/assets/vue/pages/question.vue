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
                info: JSON.parse(local.get('info'))
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$
            // f7.views.main.router.back('/categories/', {force: true, ignoreCache: true});


            let category = f7route.category

            if (category !== undefined && category !== '') self.category = category;

            self.getNewQuestion()

        },
        methods: {
            answer: function (answer, event) {
                const self = this;
                const f7 = self.$f7;
                const f7route = self.$f7route.params
                const $ = f7.$;
                const clicked = event.target

                $('.answer').addClass('clicked')

                if (!answer) {
                    $(clicked).addClass('false')
                    self.info.falseQuestions.push({
                        questionId: self.questionId,
                        question: self.question,
                        answers: self.answers,
                        category: self.category
                    })
                    self.info.falseQuestionsCount++

                } else {
                    self.info.trueQuestionsCount++
                }

                self.info.questionsCount++

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
                // if (idList !== null && idList.some(e => e === id)) status = false
                if (idList.includes(id)) status = false
                return status

            },
            setId: function (id) {
                let idList = JSON.parse(window.localStorage.getItem('id-list'));

                if (idList === null || idList === undefined) idList = []

                // delete id if array over 50
                // if (idList.length > 50) idList.shift()


                idList.push(id)

                window.localStorage.setItem('id-list', JSON.stringify(idList));
            }
        }
    }
</script>

<style lang="scss">
    @import "../../sass/main";


</style>
