<template>
  <div class="login__page">
    <br />
    <img src="./../assets/OIP.png" width="50" />
    <form class="login__form" @submit.prevent>
      <chill-input
        type="text"
        @value="this.username = $event"
        :isError="errorUsr"
        hint="User Name"
      />
      <chill-input
        type="password"
        @value="this.password = $event"
        :isError="errorPwd"
        hint="Password"
      />
      <chill-button
        type="button"
        :disabled="toDisable"
        @on-click="onButtonClick"
        label="Login"
      ></chill-button>
    </form>
    <br />
  </div>
</template>

<script>
import ChillInput from "./ChillInput.vue";
import ChillButton from "./ChillButton.vue";
export default {
  name: "Login",
  props: {
    msg: String,
  },
  components: {
    ChillInput,
    ChillButton,
  },
  data: () => ({
    username: "",
    password: "",
    errorUsr: false,
    errorPwd: false,
    toDisable: false,
  }),
  methods: {
    onButtonClick() {
      if (this.username && this.password) {
        this.$emit("login-status", this.username);
      } else {
        this.errorUsr = !this.username;
        this.errorPwd = !this.password;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login__page {
  background-color: white;
  box-shadow: 5px 10px 8px #888888;
  border: 2px solid rgb(226, 239, 247);
  position: absolute;
  left: 40%;
  width: 300px;
  height: 300px;
  top: 20%;
}
.login__form {
  position: relative;
  width: 100%;
  margin-top: 20px;
}
</style>
