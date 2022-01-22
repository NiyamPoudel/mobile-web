<template>
  <v-container fluid class="pa-0">
    <v-row class="pa-12">
      <v-col class="pl-12 pb-0">
        <h1>Add a Winner</h1>
      </v-col>
    </v-row>
    <v-card elevation="1" class="mx-auto" width="40%">
      <v-card-title class="text-xs-right">
        <span class="headline text-xs-right">Add a Winner</span>
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
                  v-model="type"
                  label="Type*"
                  type="text"
                  outlined
                  required
                  placeholder="type"
                  :rules="typeRules"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-text-field
                  v-model="imei"
                  label="IMEI*"
                  type="text"
                  outlined
                  required
                  placeholder="imei"
                  :rules="imeiRules"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row row wrap>
              <v-col md12 xs12 class="pb-0" md="12" cols="12">
                <v-text-field
                  v-model="prize"
                  label="Prize*"
                  type="text"
                  outlined
                  required
                  placeholder="prize"
                  :rules="prizeRules"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <small>*indicates required field</small>
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
import WinnerService from "../../services/WinnerService";

export default {
  name: "NewWinner",
  components: {},
  props: {},
  data: () => ({
    message: "",
    type: "",
    imei: "",
    prize: "",
    typeRules: [(v) => !!v || "Type is required"],
    imeiRules: [(v) => !!v || "IMEI Number is required"],
    prizeRules: [(v) => !!v || "Prize is required"],
  }),
  beforeCreate() {
    let orgtoken = localStorage.getItem("token");
    if (!orgtoken) {
      this.$router.push("/admin");
    }
  },
  created() {},
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
    validate() {
      if (this.$refs.form.validate()) {
        this.createWinner();
      }
    },
    createWinner() {
      WinnerService.createWinner(this.type, this.imei, this.prize).then((response) => {
        if (response.status === 200) {
          this.message = response.body.message
        } else {
          this.message = "Please try again";
        }
      });
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