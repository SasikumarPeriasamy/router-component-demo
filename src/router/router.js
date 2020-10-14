import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import HomePage from "@/views/HomePage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import SubmittedPage from "@/views/SubmittedPage.vue";
import EditPage from "@/views/EditPage.vue";
import AboutPage from "@/views/AboutPage.vue";

const routes = [
  {
    path: "/:user",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/home/:user",
    name: "HOME",
    component: HomePage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/submitted",
    name: "Submitted",
    component: SubmittedPage,
  },
  {
    path: "/edit/:editId",
    name: "Edit",
    component: EditPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;