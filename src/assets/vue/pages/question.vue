<template>
    <f7-page>
        <f7-navbar title="Soru" back-link="Back" sliding></f7-navbar>
        <f7-block>

            <f7-card class="question-card">
                <f7-card-content>
                    <p>Aşağıdakilerden hangisi <b>{{question}}</b> ifadesinin Türkçe
                        karşılığıdır ?</p>
                </f7-card-content>
            </f7-card>
            <f7-card>
                <f7-card-content>
                    <f7-button class="answer" :data-answer=item.isTrue v-for="item in answers"
                               v-on:click="answer(item.isTrue, $event)" fill>
                        {{item.word}}
                    </f7-button>
                </f7-card-content>
            </f7-card>
        </f7-block>
    </f7-page>
</template>

<script>
    import {f7Page, f7Navbar, f7Block, f7Link, f7Card, f7CardContent, f7Button} from "framework7-vue";

    export default {
        components: {
            f7Page,
            f7Navbar,
            f7Block,
            f7Link,
            f7Card,
            f7CardContent,
            f7Button
        },
        data() {
            return {
                category: 'fen',
                questionId: '',
                question: '',
                answers: '',
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params


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

                if (!answer) $(clicked).addClass('false')

                $('.answer[data-answer="true"]').addClass('true')

                setTimeout(function () {
                    self.getNewQuestion()
                }, 2000)


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

                f7.request.get('http://yakakartim.net/api/OyunYokdil/index.php?questionCategory=' + self.category, function (data) {
                    data = JSON.parse(data)
                    if (!self.checkId(data.result.id)) self.getNewQuestion()
                    self.question = data.result.word + "(" + data.result.type + ")";
                    self.answers = self.randomList(data.result.means);
                    self.questionId = data.result.id
                    $('.answer').removeClass('clicked true false')
                    self.setId(self.questionId)
                });
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
    .answer {
        margin: 10px 0;
        text-transform: lowercase !important;

        &.clicked {
            pointer-events: none;
        }

        &.true {
            background-color: green;
        }

        &.false {
            background-color: #F44336;
        }
    }
</style>
