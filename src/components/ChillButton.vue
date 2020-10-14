<template>
  <div class="chill_button__component">
    <button
      id="chill__button"
      :type="type"
      @click="onClick"
      :disabled="disabled"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "chill-button",
  props: {
    type: String,
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  methods: {
    onClick() {
      this.$emit("on-click");
    },
  },
};
</script>

<style>
.chill_button__component {
  margin: 24px 8px 8px 8px;
  z-index: 1;
}

#chill__button {
  width: 60px;
  height: 25px;
  padding: 4px 4x;
  box-sizing: border-box;
  border: 2px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  z-index: 1;
}

#chill__button:active {
  border: 2px solid #555;
  opacity: 0.4;
}
</style>
