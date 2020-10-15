<template>
  <div class="dashboard__header"><strong>Dashboard</strong></div>
  <div class="dashboard__home" v-for="title in data.titles" :key="title.id">
    <chill-container
      size="S"
      :title="title.title"
      @title-action="routeToPage"
    ></chill-container>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ChillContainer from "./../components/ChillContainer.vue";
import router from "./../router/router";

export default {
  components: {
    ChillContainer,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = route.params.user;
    const data = reactive({
      titles: [
        { id: 1, title: "HOME" },
        { id: 2, title: "Register" },
        { id: 3, title: "Submitted" },
        { id: 4, title: "Edit" },
        { id: 5, title: "About" },
      ],
      user: user,
    });

    function routeToPage(page) {
      store.dispatch("setUser", data.user);
      if (data.user) {
        router.push("/" + page.toLowerCase() + "/" + data.user);
      }
    }

    return { data, routeToPage, store };
  },
};
</script>

<style scoped>
.dashboard__header {
  position: relative;
  background: rgb(208, 207, 245);
  border: 30px solid rgb(208, 207, 245);
  width: 100%;
  font-size: 30px;
  text-align: center;
}
.dashboard__home {
  position: relative;
  display: flex;
}
.option__class {
  position: relative;
}
</style>
