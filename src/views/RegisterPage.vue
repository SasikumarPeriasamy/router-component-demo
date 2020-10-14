<template>
  <div class="register__header"><strong>Register</strong></div>
  <div id="header__back">
    <router-link
      id="header__link"
      :to="{ name: 'Dashboard', params: { user: data.user } }"
      >Back</router-link
    >
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const router = useRoute();
    const user = router.params.user;
    const data = reactive({ user });

    return { data };
  },
};
</script>

<style scoped>
.register__header {
  position: relative;
  background: rgb(208, 207, 245);
  border: 30px solid rgb(208, 207, 245);
  width: 100%;
  font-size: 30px;
  text-align: center;
}

#header__link {
  z-index: 1;
  text-decoration: none;
  text-align: right;
  font-weight: bold;
}

#header__link:active {
  opacity: 0.2;
  color: bold rgb(208, 207, 245);
}

#header__back {
  float: left;
  margin-top: -58px;
  display: flex;
  z-index: 1;
  margin-left: 16px;
}
</style>
