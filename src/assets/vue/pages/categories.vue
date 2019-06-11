<template>
    <f7-page class="page-category">
        <f7-navbar title="Kategori Seç" back-link="Framework7"></f7-navbar>
        <!--        <f7-block-title>Kategori Seç</f7-block-title>-->
        <f7-block>

            <f7-link class="btn-cat" href="/question/fen/">Fen</f7-link>
            <f7-link class="btn-cat" href="/question/sosyal/">Sosyal</f7-link>
            <f7-link class="btn-cat" href="/question/saglik/">Saglik</f7-link>
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
    };
</script>

<style lang="scss">
    .page-category {
        background-color: #eff2fb;

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

        .btn-cat {
            display: block;
            width: 100%;
            text-align: center;
            padding: 10px 0;
            background-color: #49c0dc;
            color: #FFFFFF;
            margin-top: 15px;
        }
    }
</style>
