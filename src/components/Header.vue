<template>
  <div class="pa-2">
    <v-app-bar
      v-if="$route.name == 'Home' || $route.name == 'Winner'"
      elevation="0"
      app
      clipped-left
      color="white"
    >
      <v-img
        style="cursor: pointer"
        class="mx-8"
        src="@/assets/realme-logo.png"
        max-height="100"
        max-width="100"
        contain
        @click="$router.push('/')"
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn
        @click="viewList"
        text
        color="accent"
        class="whiteTextInButton"
        elevation="0"
        >View Winners</v-btn
      >
    </v-app-bar>
    <v-app-bar
      v-else-if="$route.name == 'Dashboard' || $route.name == 'NewWinner' || $route.name == 'Campaign'"
      elevation="0"
      app
      clipped-left
      color="white"
    >
      <v-img
        style="cursor: pointer"
        class="mx-8"
        src="@/assets/realme-logo.png"
        max-height="100"
        max-width="100"
        contain
        @click="$router.push('/')"
      ></v-img>
      <v-spacer></v-spacer>
      <v-btn
        @click="viewDashboard"
        text
        color="accent"
        class="whiteTextInButton"
        elevation="0"
        >Dashboard</v-btn
      >
      <v-btn
        @click="viewCampaign"
        text
        color="accent"
        class="whiteTextInButton"
        elevation="0"
        >Campaign</v-btn
      >
      <v-btn
        @click="viewNewWinner"
        text
        color="accent"
        class="whiteTextInButton"
        elevation="0"
        >New Winner</v-btn
      >
      <v-btn
        @click="deleteWinners"
        text
        color="accent"
        class="whiteTextInButton"
        elevation="0"
        >Delete</v-btn
      >

      <v-btn
        @click="logout"
        text
        color="accent"
        class="whiteTextInButton"
        elevation="0"
        >Logout</v-btn
      >
    </v-app-bar>
    <v-app-bar v-else elevation="0" app clipped-left color="white">
      <v-img
        style="cursor: pointer"
        class="mx-8"
        src="@/assets/realme-logo.png"
        max-height="100"
        max-width="100"
        contain
        @click="$router.push('/')"
      ></v-img>
    </v-app-bar>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700">
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to delete all consumer entries?
          </v-card-title>
          <v-card-text
            ></v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              No
            </v-btn>
            <v-btn color="green darken-1" text @click="confirmDelete">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import WinnerService from "../services/WinnerService";

export default {
  props: {
    source: String,
  },
  data: () => ({
    dialog: false,
    drawer: null,
    currentRouteName: "",
    activeKey: 0,
    paths: false,
    activeStyle: {
      color: "primary",
    },
    staticStyle: {
      color: "black",
    },
    items: [
      { icon: "face", text: "Reception", path: "/reception" },
      { icon: "history", text: "Unregistered", path: "/unregistered" },
      { icon: "list", text: "Enrolled List", path: "/enrolled" },
      {
        icon: "mdi-book-open-outline",
        text: "Report",
        path: "/report",
        list: [
          {
            icon: "mdi-chart-pie",
            text: "Overall Report",
            path: "/report/allreport",
          },
          {
            icon: "mdi-chart-pie",
            text: "Enrolled Report",
            path: "/report/enreport",
          },
          {
            icon: "mdi-chart-pie",
            text: "Unregistered Report",
            path: "/report/unreport",
          },
        ],
      },
    ],
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
  methods: {
    confirmDelete(){
      //call API to delete all consumer entries
      WinnerService.deleteWinners().then((response) => {
        console.log("deleted API call",response)
        window.location.reload();
      });
    },
    deleteWinners() {
      console.log("");
      this.dialog = true
    },
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      window.location.reload();
    },
    others() {
      this.activeKey = true;
    },
    report() {
      this.activeKey = false;
    },
    viewList() {
      this.$router.push("/winner");
    },
    viewDashboard() {
      this.$router.push("/dashboard");
    },
    viewCampaign() {
      this.$router.push("/campaign");
    },
    viewNewWinner() {
      this.$router.push("/newwinner");
    },
  },
};
</script>

<style>
.sidetext {
  font-size: 15px !important;
}
</style>