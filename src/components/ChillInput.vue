<template>
  <div class="chill_input__component">
    <div v-if="label !== ''">
      <label class="input__label">{{ label }}</label>
      <input
        class="chill__input"
        :type="type"
        :class="{ input__error: isError }"
        :placeholder="hint"
        v-model="userValue"
      />
    </div>
    <div v-else>
      <input
        class="chill_input__margin"
        :type="type"
        :class="{ input__error: isError }"
        :placeholder="hint"
        v-model="userValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "chill-input",
  props: {
    type: {
      required: true,
      type: String,
    },
    hint: {
      required: false,
      type: String,
    },
    isError: {
      type: Boolean,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      required: false,
    },
  },
  data: (props) => ({
    userValue: props.value ? props.value : "",
  }),
  watch: {
    userValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        return this.$emit("value", this.userValue);
      }
    },
  },
};
</script>

<style>
.chill_input__component {
  display: flex;
  flex-direction: row;
}
.chill__input {
  margin: 8px 8px 8px 8px;
  padding: 4px 4x;
  box-sizing: border-box;
  border: 2px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
.chill__input:focus {
  border: 2px solid #555;
}
.input__error {
  border: 2px solid rgb(253, 84, 84) !important;
  background-color: rgb(253, 166, 166);
}
.input__label {
  font-size: 15px;
  zoom: 1;
  padding-top: 10px;
  width: 76px;
  display: inline-block;
  padding-left: 8px;
  font-weight: bold;
}

.chill_input__margin {
  margin: 8px 8px 8px 8px;
  padding: 4px 4x;
  box-sizing: border-box;
  border: 2px solid #ccc;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
  margin-left: 64px;
}

.chill_input__margin:focus {
  border: 2px solid #555;
}
</style>
