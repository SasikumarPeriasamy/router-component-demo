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
  <div class="home__content" v-if="data.userRegister">
    <div class="home_content__tiles" v-for="tile in data.tiles" :key="tile.id">
      <chill-container
        size="S"
        :title="tile.title"
        @title-action="routeToPage"
      ></chill-container>
    </div>
  </div>
  <div class="home_content__redirect" v-else>
    <span id="hint__content"
      >You haven't registered in our site yet. Kindly Register and try
      again..</span
    >
    <chill-container
      size="S"
      title="Register"
      @title-action="routeToRegisterPage"
    ></chill-container>
  </div>
  <div class="home_container__response">
    <div v-if="data.selectedContainer === 3 && data.isJokeReady">
      <chill-container size="L" :title="data.joke"></chill-container>
    </div>
    <div v-else-if="data.selectedContainer === 2">
      <chill-container size="S" :title="data.luckyNo"></chill-container>
    </div>
    <div v-else-if="data.selectedContainer === 0">
      <chill-container size="S" :title="data.translate"></chill-container>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import ChillContainer from "./../components/ChillContainer.vue";
import { useStore } from "vuex";
import router from "./../router/router";

export default {
  components: {
    ChillContainer,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = route.params.user;
    const userName = "";
    const selectedContainer = "";
    const tiles = [
      { id: 0, title: "Translate" },
      { id: 1, title: "Meaning" },
      { id: 2, title: "Lucky Number" },
      { id: 3, title: "Frequent Jokes" },
    ];
    const data = reactive({
      user,
      userName: userName,
      firstName: "",
      lastName: "",
      tiles: tiles,
      selectedContainer,
      userRegister: false,
      joke: "",
      isJokeReady: false,
      luckyNo: "",
      isLucky: false,
      notTranslated: true,
      translate: "",
    });

    function routeToPage(title) {
      if (title === "Frequent Jokes") {
        fetch(
          "https://api.icndb.com/jokes/random?" +
            "firstName=" +
            data.firstName +
            "&lastName=" +
            data.lastName
        )
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            data.isJokeReady = true;
            data.joke = resp.value.joke;
          });
      }
      switch (title) {
        case "Lucky Number": {
          if (!data.isLucky) {
            const randomNo = Math.floor(Math.random() * 10 + 1);
            data.luckyNo = randomNo;
          }
          data.isLucky = true;
          break;
        }
        case "Translate": {
          if (data.notTranslated) {
            fetch(
              "https://api.funtranslations.com/translate/braille.json" +
                "?text=" +
                data.userName
            )
              .then((response) => response.json())
              .then((res) => (data.translate = res.contents.translated));
            data.notTranslated = false;
          }
          break;
        }
      }
      data.selectedContainer = tiles
        .filter((tile) => tile.title === title)
        .map((tile) => tile.id)[0];
    }

    onMounted(() => {
      const activeUser = store.state.user;
      const availableUser = store.state.userDetails;
      const userDetails = availableUser.filter(
        (user) => user.userName.toLowerCase() === activeUser.toLowerCase()
      );
      if (userDetails.length !== 0) {
        data.userName =
          userDetails[0].firstName + " " + userDetails[0].lastName;
        data.firstName = userDetails[0].firstName;
        data.lastName = userDetails[0].lastName;
        data.userRegister = true;
      } else {
        const initialletter = user.charAt(0).toUpperCase();
        data.userName = initialletter + user.slice(1, user.length);
        data.userRegister = false;
      }
    });

    function routeToRegisterPage() {
      router.push("/register/" + data.user);
    }

    return { data, routeToPage, routeToRegisterPage };
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
  position: fixed;
  display: flex;
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

.home_container__response {
  display: flex;
  position: relative;
  margin-top: 74px;
  margin-left: 8px;
}

.home_content__redirect {
  display: grid;
  float: left;
  margin-left: 8px;
}

#hint__content {
  font-size: 10px;
  color: rgb(147, 92, 250);
}
</style>
