<template>
  <v-app>
    <v-app-bar
      color="red darken-2"
      app
      fixed
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img src="./assets/logo.png" max-height="50px" max-width="50px" class="mr-10"></v-img>
      <v-toolbar-title id="header-text">The S Servers</v-toolbar-title>


    </v-app-bar>
    <v-navigation-drawer
            v-model="drawer"
            app
            color="white"
    >
      <v-img src="./assets/drawer-back.jpg" :aspect-ratio="16/9">
        <v-row align="end" class="lightbox" no-gutters style="height: 100%">
          <v-col class="white--text pa-2" cols="12">
            <div class="">Test</div>
            <div class="body-1">test@gmail.com</div>
          </v-col>
        </v-row>
      </v-img>
      <v-list
        dense
        nav
      >
        <v-list-item v-for="link in pages" :key="link.title" link :to="link.url" class="pl-3">
          <v-list-item-icon class="mr-2 ml-0">
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: function () {
    return {
      drawer: false,
      pages: [
        {title: 'Домой', icon: "mdi-home", url: '/'},
        {title: 'Банлист', icon: "mdi-lock", url: '/bans'}
      ],
    }
  }
};
</script>

<style>
  #header-text{
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 500;
    font-size: 2em;
  }

  .lightbox {
    box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
</style>