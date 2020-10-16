import { createStore } from "vuex";
import userDetails from "./../assets/User/UserDetails";

export default createStore({
  state: {
    user: "DemoUser",
    userDetails: userDetails,
    submitStatus: false,
  },
  mutations: {
    SET_USER(state, userName) {
      state.user = userName;
    },
    ADD_DETAIL(state, userDetail) {
      state.userDetails.push(userDetail);
    },
    UPDATE_USER(state, userUpdate) {
      const detail = state.userDetails.filter(
        (user) => user.userName === userUpdate
      )[0];
      detail.registered = true;
      detail.updated = false;
      state.submitStatus = false;
    },
    UPDATE_DETAIL(state, updateDetail) {
      for (let index = 0; index < state.userDetails.length; index++) {
        if (
          String(state.userDetails[index].userName).toLowerCase() ===
          String(updateDetail.userName).toLowerCase()
        ) {
          state.userDetails.splice(index, 1);
        }
      }
      state.userDetails.push(updateDetail);
    },
    SUBMITTED(state) {
      state.submitStatus = true;
    },
  },
  actions: {
    setUser({ commit }, newUser) {
      commit("SET_USER", newUser);
    },
    addUserDetail({ commit }, addUserDetail) {
      commit("ADD_DETAIL", addUserDetail);
    },
    updateUserStatus({ commit }, user) {
      commit("UPDATE_USER", user);
    },
    updateUserDetail({ commit }, addUserDetail) {
      commit("UPDATE_DETAIL", addUserDetail);
    },
    submitted({ commit }) {
      commit("SUBMITTED");
    },
  },
  modules: {},
});
