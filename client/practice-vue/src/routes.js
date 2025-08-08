import { createWebHistory , createRouter} from "vue-router";
import Home from "./components/Home.vue";
import Userform from "./components/userform.vue";
import edituser from "./components/edituser.vue";
const routes = [
      { path: '/', component: Home },
      { path: '/userform', component: Userform },
      {path: '/:id',name: 'edituser', component: edituser}
    ];

 const router = createRouter({
    history:createWebHistory(),
    routes
 });
 export default router;