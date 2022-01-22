import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
import '@mdi/font/css/materialdesignicons.css'
export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#ffc915',
            secondary: '#ffffff',
            accent: '#111111',
            error: '#b71c1c',
          },
        },
      },
});
