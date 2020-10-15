<template>
  <div class="register__header"><strong>Register</strong></div>
  <div id="header__back">
    <router-link
      id="header__link"
      :to="{ name: 'Dashboard', params: { user: data.user } }"
      >Back</router-link
    >
  </div>
  <div v-if="data.toRegister">
    <span><h5>Kindly fill the below details and click "Submit"</h5></span>
    <div class="register__content" v-if="data.userNotExist">
      <form id="register__form" @submit.prevent>
        <chill-input
          type="text"
          @value="data.firstName = $event"
          hint="First name"
          label="Frist Name"
        />
        <chill-input
          type="text"
          @value="data.lastName = $event"
          hint="Last name"
          label="Last Name"
        />
        <chill-input
          type="text"
          @value="data.gender = $event"
          :isError="data.errorGender"
          hint="male or female"
          label="Gender"
        />
        <chill-input
          type="number"
          @value="data.age = $event"
          hint=""
          label="Age"
        />
        <chill-input
          type="text"
          @value="data.address = $event"
          :isError="data.errorAddress"
          hint="Plot no, city, state, pincode."
          label="Address"
        />
        <chill-input
          type="number"
          @value="data.mob = $event"
          :isError="data.errorMob"
          hint="should be 10 digit"
          label="Mobile No"
        />
        <chill-button
          type="button"
          @on-click="submit"
          :disabled="toDisable"
          label="Submit"
        ></chill-button>
      </form>
    </div>
    <div class="msg__registered" v-else></div>
  </div>
  <div v-else>
    <span id="app_title"
      ><h5>{{ ">Already Registered." }}</h5></span
    >
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import ChillInput from "./../components/ChillInput";
import ChillButton from "./../components/ChillButton";
import router from "./../router/router";
import { useStore } from "vuex";
export default {
  components: {
    ChillInput,
    ChillButton,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = route.params.user;
    let datas = [];
    let toRegister = true;
    const data = reactive({
      user,
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      address: "",
      mob: "",
      userNotExist: true,
      errorGender: false,
      errorAddress: false,
      errorMob: false,
      toRegister,
    });

    const userdata = store.state.userDetails.filter(
      (users) => users.userName === user
    );
    if (userdata.length !== 0) {
      data.toRegister = !userdata[0].registered;
    }

    function submit() {
      let error = false;
      if (!data.gender) {
        data.errorGender = true;
        error = true;
      } else if ((data.gender !== "male") | "female") {
        data.errorGender = true;
        error = true;
      } else {
        data.errorGender = false;
      }
      if (data.mob && data.mob.length !== 10) {
        data.errorMob = true;
        error = true;
      } else {
        data.errorMob = false;
      }
      if (data.address) {
        datas = data.address.split(",");
        if (datas.length !== 4) {
          data.errorAddress = true;
          error = true;
        } else {
          data.errorAddress = false;
        }
      }
      if (!error) {
        const newUserDetail = {
          userName: data.user,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          address: {
            streetAddress: datas[0],
            city: datas[1],
            state: datas[2],
            postalCode: datas[3],
          },
          phoneNumbers: {
            type: "home",
            number: data.mob,
          },
          registered: false,
        };
        store.dispatch("addUserDetail", newUserDetail);
        router.push("/submitted/" + data.user);
      }
    }

    return { data, submit };
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

.register__content {
  display: flex;
  margin: auto;
  width: 50%;
  height: 50%;
  background-color: white;
  margin-top: 8px;
}

#register__form {
  margin: auto;
  width: 50%;
}

#app_title {
  float: left;
  display: flex;
  margin-left: 8px;
}
</style>
