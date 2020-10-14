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
    <div v-else class="chill__container__large">
      <span id="container__title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
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

.chill__container__large:hover {
  background: rgb(208, 207, 245);
}

.chill__container__large:active {
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
  height: 70px;
  margin: 8px 8px 8px 0px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

.chill__container__large {
  border: 0.2px solid rgb(247, 244, 244);
  width: 700px;
  height: 80px;
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
</style>
