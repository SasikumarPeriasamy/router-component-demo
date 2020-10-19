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
        <chill-radio
          :items="data.radio"
          label="Gender"
          @on-click="
            data.gender = data.radio.filter((val) => val.id === $event)[0].value
          "
        >
        </chill-radio>
        <chill-input
          type="number"
          @value="data.age = $event"
          hint=""
          label="Age"
        />
        <chill-input
          type="text"
          @value="data.plno = $event"
          :isError="data.errorPlno"
          hint="Plot no"
          label="Address"
        />
        <div class="register__address">
          <chill-input
            class="margin__address"
            type="text"
            @value="data.city = $event"
            :isError="data.errorCity"
            hint="City"
          />
          <chill-input
            class="margin__address"
            type="text"
            @value="data.state = $event"
            :isError="data.errorState"
            hint="State"
          />
          <chill-input
            class="margin__address"
            type="text"
            @value="data.pincode = $event"
            :isError="data.errorCode"
            hint="Pincode"
          />
        </div>
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
  <div v-else-if="data.submitted">
    <span id="app_title"
      ><h5>{{ "Your application is pending. Please be patient..." }}</h5></span
    >
  </div>
  <div v-else>
    <span id="app_title"
      ><h5>{{ "Already registered. Thank you..." }}</h5></span
    >
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import ChillInput from "./../components/ChillInput";
import ChillButton from "./../components/ChillButton";
import ChillRadio from "./../components/ChillRadio";
import router from "./../router/router";
import { useStore } from "vuex";
export default {
  components: {
    ChillInput,
    ChillButton,
    ChillRadio,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = route.params.user;
    let toRegister = true;
    const data = reactive({
      user,
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      plno: "",
      city: "",
      state: "",
      pincode: "",
      mob: "",
      radio: [
        { id: 1, value: "Male" },
        { id: 2, value: "Female" },
      ],
      userNotExist: true,
      errorGender: false,
      errorPlno: false,
      errorCity: false,
      errorState: false,
      errorCode: false,
      errorMob: false,
      toRegister,
      submitted: false,
    });

    const userdata = store.state.userDetails.filter(
      (users) => users.userName === user
    );
    if (userdata.length !== 0) {
      data.toRegister =
        !userdata[0].registered &&
        !userdata[0].updated &&
        !store.state.submitStatus;
      data.submitted = store.state.submitStatus && !userdata[0].registered;
    }

    function submit() {
      let error = false;
      if (!data.gender) {
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
      if (!data.plno) {
        data.errorPlno = true;
        error = true;
      } else {
        data.errorPlno = false;
      }
      if (!data.city) {
        data.errorCity = true;
        error = true;
      } else {
        data.errorCity = false;
      }
      if (!data.state) {
        data.errorState = true;
        error = true;
      } else {
        data.errorState = false;
      }
      if (!data.pincode) {
        data.errorCode = true;
        error = true;
      } else {
        data.errorCode = false;
      }
      if (!error) {
        const newUserDetail = {
          userName: data.user,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          age: data.age,
          address: {
            streetAddress: data.plno,
            city: data.city,
            state: data.state,
            postalCode: data.pincode,
          },
          phoneNumbers: [
            {
              type: "home",
              number: data.mob,
            },
          ],
          registered: false,
          updated: false,
        };
        store.dispatch("addUserDetail", newUserDetail);
        store.dispatch("submitted");
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

.register__address {
  margin: auto;
  width: 84%;
}

.margin__address {
  margin-top: -8px !important;
}
</style>
