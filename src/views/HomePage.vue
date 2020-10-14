<template>
  <div class="home__header"><strong>HOME</strong></div>
  <div id="header__back">
    <router-link
      id="header__link"
      :to="{ name: 'Dashboard', params: { user: data.user } }"
      >Back</router-link
    >
  </div>
  <div id="home__title">
    <h3>Hi {{ data.userName }}</h3>
  </div>
  <div class="home__content">
    <div class="home_content__tiles" v-for="tile in data.tiles" :key="tile.id">
      <chill-container
        size="S"
        :title="tile.title"
        @title-action="routeToPage"
      ></chill-container>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import ChillContainer from "./../components/ChillContainer.vue";
export default {
  components: {
    ChillContainer,
  },
  setup() {
    const router = useRoute();
    const user = router.params.user;
    const initialletter = user.charAt(0).toUpperCase();
    const userName = initialletter + user.slice(1, user.length);
    const tiles = [
      { id: 0, title: "Translate" },
      { id: 1, title: "Meaning" },
      { id: 2, title: "Favourite Number" },
    ];
    const data = reactive({ user, userName: userName, tiles: tiles });

    return { data };
  },
};
</script>

<style scoped>
.home__header {
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

.home__content {
  float: left;
  margin-left: 8px;
}

.home_content__tiles {
  position: relative;
  display: flex;
}

#home__title {
  position: relative;
  flex-direction: column;
  display: table;
  margin-left: 8px;
}
</style>
