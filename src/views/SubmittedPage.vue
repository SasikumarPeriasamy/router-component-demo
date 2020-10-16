<template>
  <div class="submitted__header">
    <strong>Submitted</strong>
  </div>
  <div id="header__back">
    <router-link
      id="header__link"
      :to="{ name: 'Dashboard', params: { user: data.user } }"
      >Back</router-link
    >
  </div>
  <div class="submit__content" v-if="data.isSubmit">
    <span id="app_title"
      ><h5>{{ "Applications" }}</h5></span
    >
    <div>
      <chill-container
        size="L"
        :title="data.display"
        @title-action="routeToPage"
        @approved="approved"
        timer="1"
      ></chill-container>
    </div>
  </div>
  <div v-else>
    <span id="app_title"
      ><h5>{{ "There is no submitted applications." }}</h5></span
    >
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ChillContainer from "./../components/ChillContainer";
import router from "./../router/router";

export default {
  components: {
    ChillContainer,
  },
  setup() {
    const routers = useRoute();
    const user = routers.params.user;
    const initialletter = user.charAt(0).toUpperCase();
    const store = useStore();
    const isApproved = false;
    const data = reactive({
      user,
      display: "",
      userName: "",
      isSubmit: true,
      isApproved,
    });

    onMounted(() => {
      data.userName = initialletter + user.slice(1, user.length);
      const users = store.state.userDetails;
      const sdata = users.filter((user) => !user.registered || user.updated);
      if (sdata.length !== 0) {
        data.display = sdata[0].firstName + " " + sdata[0].lastName;
      } else {
        data.isSubmit = false;
      }
    });

    function approved() {
      data.isApproved = true;
      store.dispatch("updateUserStatus", user);
    }

    function routeToPage(title) {
      if (data.isApproved && title) {
        router.push("/home/" + data.user);
      }
    }

    return { data, store, approved, routeToPage };
  },
};
</script>

<style scoped>
.submitted__header {
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

.submit__content {
  display: grid;
  margin: auto;
  width: 50%;
}

#app_title {
  float: left;
  display: flex;
  margin-left: 8px;
}
</style>
