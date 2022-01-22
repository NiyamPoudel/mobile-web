<template>
  <v-container fluid class="pa-0">
    <v-row style="background-color: #f5f5f5" class="pa-md-12 pa-0">
      <v-col class="pl-0 pr-0">
        <v-img
          contain
          v-bind:src="`${campaignDetails.banner}`"
          lazy-src="@/assets/placeholder-image.png"
          alt="Banner"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey darken-3"
              ></v-progress-circular>
            </v-row> </template
        ></v-img>
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pb-0 bm-0">
            <p style="font-size: 30px; font-weight: 700" class="pb-0 mb-0">
              {{ campaignDetails.title }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 mb-0">
            <p class="pb-0 mb-0">
              {{ campaignDetails.description }}
            </p>
          </v-col>
        </v-row>
        <br /><br />
        <v-row>
          <v-col class="pt-1">
            <v-snackbar v-model="snackbar">
              {{ text }}
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
            <form class="pt-4 pb-5">
              <v-row>
                <v-col class="pt-0 mt-0" md="7">
                  <v-text-field
                    background-color="white"
                    filled
                    hide-details
                    dense
                    v-model="fullName"
                    label="Full Name"
                    required
                    :rules="nameRules"
                    @keydown.space="preventLeadingSpace"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0 mt-0" md="7">
                  <v-text-field
                    background-color="white"
                    filled
                    hide-details
                    dense
                    v-model="mobileNumber"
                    label="Mobile Number"
                    required
                    :rules="PhoneRules"
                    @keydown.space="preventLeadingSpace"
                    @keypress="isNumber($event)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0 mt-0" md="7">
                  <v-text-field
                    background-color="white"
                    filled
                    dense
                    counter
                    maxlength="15"
                    v-model="imeiNumber"
                    label="IMEI Number"
                    required
                    :rules="imeiRules"
                    @keydown.space="preventLeadingSpace"
                    @keypress="isNumber($event)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  You can find your IMEI number by calling *#06# on your phone
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <vue-recaptcha
                    ref="invisibleRecaptcha"
                    :sitekey="sitekey"
                    :loadRecaptchaScript="true"
                  >
                    <v-btn
                      @click="submit"
                      color="#FFBF00"
                      :disabled="submitDisabled"
                      class="g-recaptcha whiteTextInButton"
                      elevation="0"
                    >
                      {{ "Submit" }}
                    </v-btn>
                  </vue-recaptcha>
                </v-col>
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="pa-md-12 pa-0">
      <v-col md="2" xs="1" cols="1" v-if="!mobile"> </v-col>
      <v-col style="text-align: left">
        <h1>How to Participate in the Scheme</h1>
        <br />
        <span v-for="(item, i) in stepsArray" :key="`steps-` + i">
          <span>{{ item }}</span>
          <br />
        </span>
        <br />
        <h1>Terms and Conditions for the Scheme</h1>
        <br />
        <span v-for="(item, j) in termsArray" :key="`terms-` + j">
          <span>{{ item }}</span>
          <br />
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import HomeService from "../../services/HomeService";

export default {
  name: "Home",
  components: {
    VueRecaptcha,
  },
  props: {},
  data: () => ({
    sitekey: process.env.VUE_APP_RECAPTCHA_KEY,
    attrs: "",
    submitDisabled: true,
    snackbar: false,
    text: "Successfully submitted",
    imeiNumber: "",
    mobileNumber: "",
    fullName: "",
    campaignDetails: {},
    stepsArray: [],
    termsArray: [],
    nameRules: [(v) => !!v || "Name is required"],
    PhoneRules: [(v) => !!v || "Phone number is required"],
    imeiRules: [(v) => !!v || "IMEI is required"],
  }),
  beforeCreate() {},
  created() {
    this.getDetails();
  },
  mounted() {},
  watch: {
    combined(value) {
      if (value == true) {
        this.submitDisabled = false;
      }
      if (value == false) {
        this.submitDisabled = true;
      }
    },
  },
  methods: {
    getDetails() {
      HomeService.getCampaign().then((response) => {
        if (response.status == 200) {
          this.campaignDetails = response.body.data;
          this.stepsArray = this.campaignDetails.steps.split("\n");
          this.termsArray = this.campaignDetails.terms.split("\n");
        } else {
          this.campaignDetails = {};
        }
      });
    },
    preventLeadingSpace(e) {
      if (!e.target.value) e.preventDefault();
      else if (e.target.value[0] == " ")
        e.target.value = e.target.value.replace(/^\s*/, "");
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    submit() {
      this.$refs.invisibleRecaptcha.execute();
      var body = {};
      body = {
        name: this.fullName,
        phone: this.mobileNumber,
        imei: this.imeiNumber,
      };
      HomeService.createCustomer(body).then((response) => {
        if (response.status == 200) {
          this.text = response.body.message;
          this.snackbar = true;
        } else {
          this.text = response.body.message;
          this.snackbar = true;
        }
      });
    },
  },
  computed: {
    combined() {
      return (
        Boolean(this.fullName) &&
        Boolean(this.mobileNumber) &&
        this.imeiNumber.length == 15
      );
    },
    mobile() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
    },
  },
};
</script>
<style>
.margin-10px {
  margin: 6px;
}
</style>
