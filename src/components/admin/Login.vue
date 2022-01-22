<template>
  <v-container fluid>
    <v-row row class="mt-5">
      <v-card
        style="border-radius: 10px; margin-top: 5%"
        class="mx-auto"
        width="40%"
      >
        <v-card-title class="text-xs-right">
          <span class="headline text-xs-right">Realme Campaigns</span>
        </v-card-title>
        <v-card-text>
          <div class="text-xs-center">
            <v-alert
              :value="true"
              color="error"
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
                    v-model="username"
                    label="Username*"
                    type="text"
                    outlined
                    prepend-icon="person"
                    outline
                    required
                    placeholder="username"
                    :rules="usernameRules"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md12 xs12 class="pb-0">
                  <v-text-field
                    v-model="password"
                    label="Password*"
                    outlined
                    :type="showPass ? 'text' : 'password'"
                    outline
                    prepend-icon="lock"
                    required
                    placeholder="1-9/a-z/A-Z/!-+"
                    :rules="passwordRules"
                    v-on:keyup.enter="validate"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <small>*indicates required field</small>
            <div class="text-xs-right">
              <v-btn color="primary" block :disabled="!valid" @click="validate"
                >Login</v-btn
              >
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import LoginService from "../../services/LoginService";

export default {
  name: "Login",
  data() {
    return {
      valid: true,
      message: "",
      showPass: false,
      username: "",
      usernameRules: [(v) => !!v || "Username is required"],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  props: {
    value: Boolean,
  },
  beforeCreate() {
    let orgtoken = localStorage.getItem("token");
    if (orgtoken) {
      this.$router.push("/dashboard");
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
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.accessLogin();
      }
    },
    accessLogin() {
      LoginService.adminLogin(this.username, this.password).then((response) => {
        if (response.status === 200 && "token" in response.body) {
          localStorage.setItem("token", response.body.token);
          this.$router.push("/dashboard");
        } else if (response.status === 400) {
          this.message = "Username or password is incorrect";
        } else {
          this.message = "Please try again";
        }
      });
    },
  },
};
</script>
