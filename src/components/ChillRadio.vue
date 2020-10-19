<template>
  <form>
    <label class="radio__mainlabel">{{ label }}</label>
    <div class="radio__component" v-for="item in items" :key="item.id">
      <label class="radio__label">{{ item.value }}</label>
      <input
        type="radio"
        class="radio__button"
        :id="item.value"
        :value="item.value"
        name="gender"
        :class="{ radio__error: isError }"
        v-model="defaultVal"
        @click="onClick(item.id)"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "chill-radio",
  props: {
    items: Array,
    isError: {
      type: Boolean,
      default: false,
      required: false,
    },
    label: String,
    default: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  data: () => ({
    defaultVal: "",
  }),
  methods: {
    onClick(id) {
      this.$emit("on-click", id);
    },
  },
  mounted() {
    this.defaultVal = this.items.filter(
      (item) => Number(item.id) === Number(this.default)
    )[0].value;
  },
};
</script>

<style>
.radio__component {
  display: table-cell;
}

.radio__button {
  margin: 8px 8px 8px 8px;
  border: 2px solid #ccc;
  height: 11px;
  width: 11px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
input[type="radio"]:focus {
  border: 2px solid #555;
}
input[type="radio"]:checked {
  border: 2px solid #555;
}
.radio__button:active {
  border: 2px solid #555;
}
.radio__error {
  border: 2px solid rgb(253, 84, 84) !important;
}
.radio__label {
  font-size: 14px;
  zoom: 1;
  padding-top: 5px;
  width: 64px;
  padding-left: 8px;
}
.radio__mainlabel {
  font-size: 15px;
  zoom: 1;
  padding-top: 5px;
  min-width: 75px;
  padding-left: 8px;
  float: left;
  font-weight: bold;
}
</style>
