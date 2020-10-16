<template>
  <div class="edit__header"><strong>Edit</strong></div>
  <div id="header__back">
    <router-link
      id="header__link"
      :to="{ name: 'Dashboard', params: { user: data.user } }"
      >Back</router-link
    >
  </div>
  <div v-if="data.isRegistered">
    <span><h5>Kindly update the details and click "Update"</h5></span>
    <div class="edit__content">
      <form id="edit__form" @submit.prevent>
        <chill-input
          type="text"
          @value="data.firstName = $event"
          hint="First name"
          label="Frist Name"
          :value="data.firstName"
        />
        <chill-input
          type="text"
          @value="data.lastName = $event"
          hint="Last name"
          label="Last Name"
          :value="data.lastName"
        />
        <chill-input
          type="text"
          @value="data.gender = $event"
          :isError="data.errorGender"
          hint="male or female"
          label="Gender"
          :value="data.gender"
        />
        <chill-input
          type="number"
          @value="data.age = $event"
          hint=""
          label="Age"
          :value="data.age"
        />
        <chill-input
          type="text"
          @value="data.plno = $event"
          :isError="data.errorPlno"
          hint="Plot no"
          label="Address"
          :value="data.plno"
        />
        <div class="register__address">
          <chill-input
            class="margin__address"
            type="text"
            @value="data.city = $event"
            :isError="data.errorCity"
            hint="City"
            :value="data.city"
          />
          <chill-input
            class="margin__address"
            type="text"
            @value="data.state = $event"
            :isError="data.errorState"
            hint="State"
            :value="data.state"
          />
          <chill-input
            class="margin__address"
            type="text"
            @value="data.pincode = $event"
            :isError="data.errorCode"
            hint="Pincode"
            :value="data.pincode"
          />
        </div>
        <chill-input
          type="number"
          @value="data.mob = $event"
          :isError="data.errorMob"
          hint="should be 10 digit"
          label="Mobile No"
          :value="data.mob"
        />
        <chill-button
          type="button"
          @on-click="update"
          :disabled="data.isEdite"
          label="Update"
        ></chill-button>
      </form>
    </div>
  </div>
  <div v-else-if="data.submitted">
    <span id="app_title"
      ><h5>{{ "Your application is pending. Please be patient..." }}</h5></span
    >
  </div>
  <div v-else>
    <span id="app_title"
      ><h5>{{ "You haven't registered yet... :(" }}</h5></span
    >
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import ChillInput from "./../components/ChillInput";
import ChillButton from "./../components/ChillButton";
import { useStore } from "vuex";
import router from "./../router/router";

export default {
  components: {
    ChillInput,
    ChillButton,
  },
  setup() {
    const route = useRoute();
    const user = route.params.user;
    const store = useStore();
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
      userNotExist: true,
      errorGender: false,
      errorPlno: false,
      errorCity: false,
      errorState: false,
      errorCode: false,
      errorMob: false,
      isRegistered: false,
      submitted: false,
    });

    const userdata = store.state.userDetails.filter(
      (users) => users.userName === user
    );
    if (userdata.length !== 0) {
      data.isRegistered =
        !userdata[0].updated &&
        userdata[0].registered &&
        !store.state.submitStatus;
      data.submitted = store.state.submitStatus && userdata[0].registered;
      data.firstName = userdata[0].firstName;
      data.lastName = userdata[0].lastName;
      data.gender = userdata[0].gender;
      data.age = userdata[0].age;
      data.plno = userdata[0].address.streetAddress;
      data.city = userdata[0].address.city;
      data.state = userdata[0].address.state;
      data.pincode = userdata[0].address.postalCode;
      data.mob = userdata[0].phoneNumbers[0].number;
    }

    function update() {
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
          registered: true,
          updated: true,
        };
        store.dispatch("updateUserDetail", newUserDetail);
        store.dispatch("submitted");
        router.push("/submitted/" + data.user);
      }
    }

    return { data, store, update };
  },
};
</script>

<style scoped>
.edit__header {
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

.edit__content {
  display: flex;
  margin: auto;
  width: 50%;
  height: 50%;
  background-color: white;
  margin-top: 8px;
}

#edit__form {
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
