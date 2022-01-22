<template>
  <v-container fluid class="pa-0">
    <v-row class="pa-12">
      <v-col class="pl-12 pb-0">
        <h1>Consumer Entries</h1>
      </v-col>
    </v-row>
    <v-card class="elevation-0 pr-12 pl-12">
      <v-row>
        <v-col md="3">
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
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end mb-6">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                outlined
                dense
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
                class="mr-2"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <v-btn
            @click="clear"
            color="#FFBF00"
            class="mr-2 whiteTextInButton"
            elevation="0"
          >
            {{ "Clear" }}
          </v-btn>
          <download-excel
            :data="json_data"
            :fields="json_fields"
            worksheet="Downloaded Report"
            name="report.xls"
            class="mr-2"
          >
            <v-btn
              :disabled="isLoaded"
              color="#FFBF00"
              class="whiteTextInButton"
              elevation="0"
              @click="validateDownload(csvData)"
            >
              <v-icon left dark>cloud_download</v-icon>
              Download Excel
            </v-btn>
          </download-excel>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :loading="isLoaded"
            :headers="headers"
            :items="customers"
            :search="search"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import CustomerService from "../../services/CustomerService";

export default {
  name: "Dashboard",
  components: {},
  props: {},
  data: (vm) => ({
    search: "",
    json_data: [],
    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
    json_fields: {
      Name: "name",
      Phone: "phone",
      IMEI: "imei",
      "Submission Date": "createdAtFormatted",
    },
    isLoaded: false,
    headers: [
      {
        text: "Name",
        align: "start",
        filterable: false,
        value: "name",
      },
      { text: "Phone", value: "phone" },
      { text: "imei", value: "imei" },
      { text: "Submission Date", value: "createdAtFormatted" },
    ],
    customers: [],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
  }),
  beforeCreate() {
    let orgtoken = localStorage.getItem("token");
    console.log(orgtoken);
    if (!orgtoken) {
      this.$router.push("/admin");
    }
    var hours = 10;
    var now = new Date().getTime();
    var setupTime = localStorage.getItem("setupTime");
    // console.log(setupTime);
    // console.log(now);
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem("setupTime", now);
        this.$router.push("/admin");
        window.location.reload();
        // console.log(`this is now time `,` and this is 24 hours `, hours*60*60*1000)
      }
    }
  },
  created() {
    // this.date = "";
    // this.dateFormatted = "";
    this.getDetails(this.date);
  },
  mounted() {},
  watch: {
    date(val) {
      console.log("call API?", val);
      this.dateFormatted = this.formatDate(this.date);
      this.filterWithDate(val);
    },
  },
  methods: {
    getDetails(date) {
      this.isLoaded = true;
      this.customers = [];
      CustomerService.fetchCustomers(date).then((response) => {
        console.log(response);
        this.isLoaded = false;
        if (response.status == 200) {
          this.customers = response.body.data;
          for (var i = 0; i < this.customers.length; i++) {
            // console.log(this.customers[i]);
            this.customers[i].createdAtFormatted =
              this.customers[i].createdAt.split(" ")[0];
          }
        } else {
          this.customers = [];
        }
      });
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    filterWithDate(val) {
      this.getDetails(val);
    },
    clear() {
      // this.date = "";
      // this.dateFormatted = "";
      this.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
      this.getDetails(this.date);
    },
    validateDownload(csvData) {
      // console.log(csvData);
      this.csvExport(csvData);
    },
    csvExport(arrData) {
      this.json_data = arrData;
      console.log("json_data", arrData);
      console.log("json_fields", this.json_fields);
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    csvData() {
      return this.customers.map((item) => ({
        ...item,
      }));
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