<template>
  <v-app>
    <app-header></app-header>
    <v-content class="secondary lighten-4 mt-2 pt-4">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <!-- End Main Content Container -->
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
  data: () => ({
    message: "",
  }),
  beforeCreate() {},
  mounted() {},
  methods: {},
};
</script>

<style>
#app {
  font-family: "Open Sans", sans-serif; /* this was it */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
