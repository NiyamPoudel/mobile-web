<template>
  <v-container fluid class="pa-0">
    <v-row class="pa-12">
      <v-col class="pl-12 pb-0">
        <h1>Congratulations to all our winners</h1>
      </v-col>
    </v-row>
    <v-card class="elevation-0 pr-12 pl-12">
      <v-row>
          <v-col md="9">
          </v-col>
        <v-col>
          <v-text-field
            v-model="search"
            outlined
            dense
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="winners"
            :search="search"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// import VueRecaptcha from "vue-recaptcha";
import WinnerService from "../../services/WinnerService";

export default {
  name: "Winner",
  components: {},
  props: {},
  data: () => ({
      search: '',
    headers: [
      {
        text: "Type",
        align: "start",
        filterable: false,
        value: "type",
      },
      { text: "IMEI Number", value: "imei" },
      { text: "Winner of", value: "prize" },
    ],
    winners: [],
  }),
  beforeCreate() {},
  created() {
    this.getDetails();
  },
  mounted() {},
  watch: {},
  methods: {
    getDetails() {
      WinnerService.getAllWinners().then((response) => {
        if (response.status == 200) {
          this.winners = response.body.data;
        } else {
          this.winners = {};
        }
      });
    },
  },
  computed: {},
};
</script>
<style>
.margin-10px {
  margin: 6px;
}
.pre-formatted {
  text-align: left;
  white-space: pre;
}
</style>
