import { createStore } from "vuex";
import userDetails from "./../assets/User/UserDetails";

export default createStore({
  state: {
    user: "DemoUser",
    userDetails: userDetails,
  },
  mutations: {
    SET_USER(state, userName) {
      state.user = userName;
    },
    ADD_DETAIL(state, userDetail) {
      state.userDetails.push(userDetail);
    },
    UPDATE_USER(state, userUpdate) {
      state.userDetails.filter(
        (user) => user.userName === userUpdate
      )[0].registered = true;
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
  },
  modules: {},
});
