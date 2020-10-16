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
</template>

<script>
import Login from "./components/Login.vue";
import ChillButton from "./components/ChillButton.vue";
import router from "./router/router";

export default {
  name: "App",
  components: {
    Login,
    ChillButton,
  },
  data: () => ({
    loginStatus: true,
  }),
  methods: {
    checkLoginStatus(loginSuccess) {
      this.loginStatus = false;
      router.push("/" + loginSuccess);
    },
    onButtonClick() {
      router.push("/");
      this.loginStatus = true;
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
