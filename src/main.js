import { createApp } from 'vue'
import App from '@/app.vue'
import router from '@/router/router'
// import store from './store'

import components from '@/components'

const app = createApp(App)

components.forEach(el => {
    app.component(el.name, el);
});

app
    .use(router)
    .mount('#app')
