<template>
  <div class="container__class">
    <div
      v-if="size === 'S'"
      class="chill__container__small"
      @click="emitClickEvent(title)"
    >
      <span id="container__title">{{ title }}</span>
    </div>
    <div v-else-if="size === 'M'" class="chill__container__meduim">
      <span id="container__title">{{ title }}</span>
    </div>
    <div
      v-else
      id="chill__container__large"
      :class="{ green: time === 'Approved' }"
      @click="emitClickEvent(title)"
    >
      <span id="container__title__large">{{ title }}</span>
      <span id="container__timer" v-if="timer !== 0">{{ prefix + time }}</span>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "chill-container",
  props: {
    size: {
      type: String,
      default: "M",
    },
    title: {
      type: String,
      required: true,
    },
    timer: {
      type: String,
      required: false,
      default: "0",
    },
  },
  data: () => ({
    time: "",
    prefix: "Auto approve in: ",
  }),
  mounted() {
    const store = useStore();
    if (
      !store.state.submitTimer &&
      store.state.submitStatus &&
      this.timer &&
      this.timer !== "0"
    ) {
      let minute = Number(this.timer) - 1;
      let sec = 15;
      this.time =
        (String(minute).length === 1 ? "0" + minute : minute) +
        ":" +
        (String(sec).length === 1 ? "0" + sec : sec);
      const timers = setInterval(() => {
        sec--;
        this.time =
          (String(minute).length === 1 ? "0" + minute : minute) +
          ":" +
          (String(sec).length === 1 ? "0" + sec : sec);
        console.log(this.time);
        store.dispatch("timer", this.time);
        if (sec === 0 && minute !== 0) {
          minute--;
          sec = 59;
        }
        if (minute === 0 && sec === 0) {
          this.time = "Approved";
          this.prefix = "";
          store.dispatch("reset");
          clearInterval(timers);
          this.$emit("approved");
        }
      }, 1000);
    } else {
      const loadTimer = setInterval(() => {
        if (store.state.time !== "") {
          this.time = store.state.time;
        } else {
          this.time = "Approved";
          this.prefix = "";
          clearInterval(loadTimer);
          this.$emit("approved");
        }
      }, 1);
    }
  },
  methods: {
    emitClickEvent(title) {
      this.$emit("title-action", title);
    },
  },
};
</script>

<style>
.chill__container__small:hover {
  background: rgb(208, 207, 245);
}

.chill__container__small:active {
  border: 2px solid #555;
  opacity: 0.4;
}

.chill__container__medium:hover {
  background: rgb(208, 207, 245);
}

.chill__container__medium:active {
  border: 2px solid #555;
  opacity: 0.4;
}

#chill__container__large:hover {
  background: rgb(208, 207, 245);
}

#chill__container__large:active {
  border: 2px solid #555;
  opacity: 0.4;
}

.chill__container__small {
  border: 0.2px solid rgb(247, 244, 244);
  background-color: white;
  width: 250px;
  height: 60px;
  margin: 8px 8px 8px 0px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

.chill__container__meduim {
  border: 0.2px solid rgb(247, 244, 244);
  width: 500px;
  height: 60px;
  margin: 8px 8px 8px 0px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

#chill__container__large {
  border: 0.2px solid rgb(247, 244, 244);
  width: 700px;
  min-height: 60px;
  margin: 8px 8px 8px 0px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

#container__title {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  font-size: 20px;
}

#container__title__large {
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 600;
}

#container__timer {
  text-align: right;
  display: flex;
  flex-direction: column;
  margin-top: -14px;
  margin-right: 8px;
  font-size: 14px;
}

.green {
  background: rgb(161, 243, 161) !important;
}
</style>
