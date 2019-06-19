<template>
    <f7-page class="page-levels">
        <!--        <f7-navbar title="Etap Seç" back-link="back" sliding=""></f7-navbar>-->
        <div class="navbar">
            <div class="navbar-inner sliding">
                <div class="left"><a href="/categories/" class="link icon-only icon-only"><i class="icon icon-back"></i></a>
                </div>
                <div class="title">Etap Seç</div>
            </div>
        </div>
        <f7-block>
            <f7-link class="btn-cat" v-bind:class="{ disabled: !item.isOpen, 'complete': item.percent==='100%' }"
                     :href="'/question/'+category+'/'+key+'/'" v-for="(item, key) in info.levels">Etap {{key+1}}
                <f7-icon v-if="!item.isOpen" f7="lock_fill"></f7-icon>
                <f7-icon v-else f7="unlock_fill"></f7-icon>
                <span class="percent">{{item.percent}}</span></f7-link>
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
                category: '',
                app: JSON.parse(local.get('app')),
                info: ''
            }
        },
        created() {
            const self = this;
            const f7 = self.$f7;
            const f7route = self.$f7route.params
            const $ = f7.$
            // f7.views.main.router.back('/categories/', {'force' : true});

            self.category = f7route.category

            self.info = self.app.levelList[self.category]

        },
        methods: {}
    }
</script>

<style lang="scss">
    @import "../../sass/main";
    .btn-cat {
        position: relative;
        font-weight: bold;
        .icon {
            font-size: 20px;
            padding-left: 5px;
        }
        .percent {
           position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-weight: bold;
            font-size: 15px;
        }
    }
</style>
