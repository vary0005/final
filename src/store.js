import Vue from "vue";
import Vuex from "vuex";
import axiosAuth from "./axios-auth";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    error: ""
  },
  mutations: {
    AUTH_USER(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_DATA(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    signUp({ commit }, authData) {
      axiosAuth
        .post("accounts:signUp?key=AIzaSyCNJAGKUvdgU-KooMb9wE1bfEBYllsqiKc", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit("AUTH_USER", {
            token: res.data.idToken,
            userId: res.data.localId
          });

          // Calculate the date for expiring the token
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          // Store the token in local storage for auto login
          localStorage.setItem("token", res.data.idToken);

          // store the expiration date calculated above
          localStorage.setItem("expirationDate", expirationDate);
          // store userId in the local storage
          localStorage.setItem("userId", res.data.localId);

          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message);
            commit("SET_ERROR", error.response.data.error.message);
          }
        });
    },
    signIn({ commit }, authData) {
      axiosAuth
        .post(
          "accounts:signInWithPassword?key=AIzaSyCNJAGKUvdgU-KooMb9wE1bfEBYllsqiKc",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          commit("AUTH_USER", {
            token: res.data.idToken,
            userId: res.data.localId
          });

          // Calculate the date for expiring the token
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          // Store the token in local storage for auto login
          localStorage.setItem("token", res.data.idToken);

          // store the expiration date calculated above
          localStorage.setItem("expirationDate", expirationDate);
          // store userId in the local storage
          localStorage.setItem("userId", res.data.localId);

          // set the logout timer
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data.error.message);
            commit("SET_ERROR", error.response.data.error.message);
          }
        });
    },
    setLogoutTimer({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        // commit("CLEAR_DATA");
        dispatch("logout");
      }, expirationTime * 1000);
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expirationDate");
      const userId = localStorage.getItem("userId");

      const now = new Date();

      if (now >= expirationDate) {
        return;
      }
      commit("AUTH_USER", {
        token: token,
        userId: userId
      });
    },
    logout({ commit }) {
      // Remove the token in local storage
      localStorage.removeItem("token");
      // Remove the expiration date
      localStorage.removeItem("expirationDate");
      // Remove userId in the local storage
      localStorage.removeItem("userId");

      commit("CLEAR_DATA");
      router.push({ name: "signin" });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});
