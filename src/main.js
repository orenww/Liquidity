import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseDialog from './components/ui/BaseDialog.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSearch } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faSearch)

const app = createApp(App);

app.use(router);
app.use(store);
 
app.component('base-dialog', BaseDialog);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

