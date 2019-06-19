<template>
    <f7-page class="page-question hide">
        <div class="navbar">
            <div class="navbar-inner sliding">
                <div class="left"><a :href="'/levels/'+category+'/'" class="link icon-only icon-only"><i
                        class="icon icon-back"></i></a>
                </div>
                <div class="title">Soru</div>
            </div>
        </div>

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
            <div v-if="app.levelList[category].levels[levelIndex].isOpen">
                <f7-button class="answer continue" v-if="continueGameBtn" v-on:click="continueGame()">
                    <f7-icon f7="arrow_right_round_fill"></f7-icon>
                    Devam Et
                </f7-button>
            </div>
            <div v-else>
                <f7-card>
                    <f7-link class="answer completeLevel" :href="'/levels/'+category+'/'">Etap tamamlandı. Başka etap veya Kategori
                        seçiniz
                    </f7-link>
                </f7-card>
            </div>
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
                levelcomplete: false,
                category: 'fen',
                levelIndex: '0',
                questionId: '',
                question: '',
                answers: '',
                continueGameBtn: false,
                app: JSON.parse(local.get('app'))
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$
            // f7.views.main.router.back('/categories/', {force: true, ignoreCache: true});


            let category = f7route.category
            let index = f7route.levelIndex


            if (category !== undefined && category !== '') self.category = category;
            if (index !== undefined && index !== '') self.levelIndex = index;


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


                let info = self.app.info
                let levelInfo = self.app.levelList[self.category].levels[self.levelIndex]


                if (!answer) {
                    $(clicked).addClass('false')
                    self.app.info.falseQuestions.push({
                        questionId: self.questionId,
                        question: self.question,
                        answers: self.answers,
                        category: self.category
                    })
                    info.falseQuestionsCount++
                    levelInfo.falseQuestionsCount++

                } else {
                    info.trueQuestionsCount++
                    levelInfo.trueQuestionsCount++

                }

                info.questionsCount++
                levelInfo.count++

                let totalLevelCount = levelInfo.numb
                let currentLevelCount = levelInfo.count

                levelInfo.percent = self.calculatePercent(totalLevelCount, currentLevelCount) + '%'


                if (currentLevelCount === totalLevelCount || currentLevelCount > totalLevelCount) {
                    const index = parseInt(self.levelIndex) + 1
                    if (self.app.levelList[self.category].levels[index] !== undefined) self.app.levelList[self.category].levels[index].isOpen = true

                    self.app.levelList[self.category].levels[self.levelIndex].isOpen = false

                }


                setTimeout(function () {
                    // self.app.info = info
                    // self.app.levelList[self.category].levels[self.levelIndex] = levelInfo

                    local.set('app', JSON.stringify(self.app))

                    $('.answer[data-answer="true"]').addClass('true')

                    self.continueGameBtn = true;
                })


            },
            calculatePercent: function (total, numb) {
                const self = this;
                let pPos = parseInt(total)
                let pEarned = parseInt(numb);
                let percent = "";
                if (isNaN(pPos) || isNaN(pEarned)) {
                    percent = " ";
                } else {
                    percent = ((pEarned / pPos) * 100).toFixed(1);
                }

                return percent
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
                const self = this;
                let status = true
                let idList = self.app.idList;
                // if (idList !== null && idList.some(e => e === id)) status = false
                if (idList.includes(id)) status = false
                return status

            },
            setId: function (id) {
                const self = this;
                let idList = self.app.idList;

                // delete id if array over 50
                // if (idList.length > 50) idList.shift()


                idList.push(id)


                window.localStorage.setItem('app', JSON.stringify(self.app));
            }
        }
    }
</script>

<style lang="scss">
    @import "../../sass/main";

    .page-question {
        .answer {
            &.completeLevel {
                text-transform: uppercase !important;
                background-color: #99d814 !important;
                font-weight: bold;
                text-align: center;
            }
        }

    }
</style>
