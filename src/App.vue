<template>
  <div class="main_page">
    <div class="main_page__login" v-if="loginStatus">
      <Login @login-status="checkLoginStatus" />
    </div>
    <div v-else>
      <chill-button
        id="logout__button"
        type="button"
        @on-click="onButtonClick"
        label="Logout"
      ></chill-button>
      <router-view />
    </div>
  </div>
  <div v-if="timeout">
    <chill-toster msg="logout"></chill-toster>
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import ChillButton from "./components/ChillButton.vue";
import ChillToster from "./components/ChillToster.vue";
import router from "./router/router";
import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    Login,
    ChillButton,
    ChillToster,
  },
  data: () => ({
    loginStatus: null,
    store: useStore(),
    timeout: false,
    timer: 100,
  }),
  mounted() {
    this.loginStatus =
      !this.store.state.isLoggedIn &&
      String(window.location.href).slice(21) === "/";

    const time = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.timeout = true;
        clearInterval(time);
      }
    }, 1000);
  },
  methods: {
    checkLoginStatus(loginSuccess) {
      this.loginStatus = !this.store.state.isLoggedIn;
      router.push("/" + loginSuccess);
    },
    onButtonClick() {
      router.push("/");
      this.loginStatus = true;
      this.store.dispatch("logout");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

#logout__button {
  float: right;
  display: flex;
  margin-top: 34px;
}
</style>
