<template>
  <v-container fluid class="pa-0">
    <v-row class="pa-12">
      <v-col class="pl-12 pb-0">
        <h1>Update Campaign</h1>
      </v-col>
    </v-row>
    <v-card elevation="1" class="mx-auto" width="40%">
      <v-card-title class="text-xs-right">
        <span class="headline text-xs-right">Update campaign details</span>
      </v-card-title>
      <v-card-text>
        <div class="text-xs-center">
          <v-alert
            :value="true"
            color="primary"
            transition="scale-transition"
            icon="warning"
            v-if="this.message"
            outline
            class="text-xs-center"
            style="border-radius: 5px"
          >
            <b>{{ this.message }}</b>
          </v-alert>
        </div>
        <v-container grid-list-xl>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-text-field
                  v-model="title"
                  label="Title"
                  type="text"
                  outlined
                  placeholder="type"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-text-field
                  v-model="description"
                  label="Description"
                  type="text"
                  outlined
                  placeholder="type"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-textarea
                  v-model="steps"
                  auto-grow
                  label="Steps to Enter"
                  rows="2"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-textarea
                  v-model="terms"
                  auto-grow
                  label="Terms and Conditions"
                  rows="2"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-file-input
                  label="Click to upload image"
                  prepend-icon=""
                  v-model="banner"
                  accept="image/png, image/jpeg"
                  small-chips
                  @keydown.space="preventLeadingSpace"
                  outlined
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-xs-right">
            <v-btn color="primary" block :disabled="!valid" @click="validate"
              >Enter</v-btn
            >
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import HomeService from "../../services/HomeService";
import CampaignService from "../../services/CampaignService";

export default {
  name: "Campaign",
  components: {},
  props: {},
  data: () => ({
    campaignDetails: {},
    message: "",
    title: "",
    description: "",
    steps: "",
    terms: "",
    banner: null,
  }),
  beforeCreate() {
    let orgtoken = localStorage.getItem("token");
    if (!orgtoken) {
      this.$router.push("/admin");
    }
  },
  created() {
    this.getDetails();
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {},
  watch: {},
  methods: {
    getDetails() {
      HomeService.getCampaign().then((response) => {
        if (response.status == 200) {
          this.campaignDetails = response.body.data;
          this.title = this.campaignDetails.title;
          this.description = this.campaignDetails.description;
          this.steps = this.campaignDetails.steps;
          this.terms = this.campaignDetails.terms;
        } else {
          this.campaignDetails = {};
        }
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.updateCampaign();
      }
    },
    updateCampaign() {
      console.log("For snapshot",this.banner);
      let fd = new FormData();
      fd.append("title",this.title)
      fd.append("description", this.description);
      fd.append("steps", this.steps);
      fd.append("terms", this.terms);
      if (this.banner !== null) {
        fd.append("banner", this.banner);
      }
      for (var data of fd) {
        console.log(data);
      }
      CampaignService.updateCampaign(this.campaignDetails.id, fd).then((response) => {
        console.log(response);
        this.$router.push("/dashboard");
      });
    },
    preventLeadingSpace(e) {
      // only prevent the keypress if the value is blank
      if (!e.target.value) e.preventDefault();
      // otherwise, if the leading character is a space, remove all leading white-space
      else if (e.target.value[0]==' ') e.target.value = e.target.value.replace(/^\s*/, "");
    },
  },
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