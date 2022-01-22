<template>
  <v-footer dark padless>
    <v-card flat tile class="accent lighten-1 white--text">
      <v-row>
        <v-col class="pb-0">
          <v-card-text>
            <v-btn
              v-for="l in links"
              :key="l.icon"
              class="mx-1 white--text"
              icon
              :href="l.url" target="_blank"
            >
              <v-icon size="24px">{{ l.icon }}</v-icon>
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pt-0 mt-0">
          <v-card-text class="white--text pt-0">
            &copy; {{ new Date().getFullYear() }} —
            <strong>realme. All Rights Reserved.</strong>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    footer: {
      fixed: true,
      clippedLeft: true,
    },
    links: [
      {
        icon: "mdi-facebook",
        url: "https://www.facebook.com/realmeNP/",
      }, {
        icon: "mdi-instagram",
        url: "https://www.instagram.com/realme.nepal/?hl=en",
      }
    ],
  }),
};
</script>
