// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHouse, faAlignJustify, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

import rawDisplayer from "@/components/raw-displayer.vue";
import nestedDraggable from "@/components/nested.vue";

/* add icons to the library */
library.add(faHouse, faAlignJustify, faTimes, faTrash)

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component("rawDisplayer", rawDisplayer)
    .component("nestedDraggable", nestedDraggable)

app.mount('#app')
