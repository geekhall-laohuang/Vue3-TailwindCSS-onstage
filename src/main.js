import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/index.scss'
import store from './store'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import mDirectives from './directives'
import useTheme from './utils/theme'
import './premission'

//注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
useTheme()
createApp(App).use(router).use(store).use(mLibs).use(mDirectives).mount('#app')
