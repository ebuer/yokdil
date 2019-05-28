<template>
    <f7-page>
        <f7-navbar>
            <div class="title">Yökdil Kelime</div>
        </f7-navbar>
        <f7-block-title class="searchbar-found">Links</f7-block-title>
        <f7-list class="components-list searchbar-found">
            <f7-list-item link="/categories/" title="Oyuna Başla" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  import { f7Page, f7Block, f7Navbar, f7NavLeft, f7NavTitle, f7NavTitleLarge, f7NavRight, f7BlockTitle, f7List, f7ListItem, f7Link, f7Searchbar, f7Icon } from 'framework7-vue';
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
  };
</script>
