import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import { POSITION  } from "vue-toastification";

import 'reset-css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "vue-toastification/dist/index.css";
import 'bootstrap'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast,{
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true,
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
})

app.mount('#app')
