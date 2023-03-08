import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseDialog from "./components/ui/BaseDialog.vue";

// /* import the fontawesome core */
// import { library } from "@fortawesome/fontawesome-svg-core";

// /* import font awesome icon component */
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// /* import specific icons */
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
// library.add(faSearch);

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";

import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components: {
    ...components,
    VDataTable,
  },
  directives,
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.component("BaseDialog", BaseDialog);
app.mount("#app");
