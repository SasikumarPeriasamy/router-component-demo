<template>
  <div class="toster__position">
    <div class="chill_toster"></div>
  </div>
</template>

<script>
export default {
  name: "chill-toster",
  props: {
    msg: String,
  },
};
</script>

<style>
.chill_toster {
  border: 0.2px solid rgb(26, 25, 25);
  background-color: rgb(29, 27, 27);
  width: 250px;
  height: 30px;
  margin: 8px 8px 8px 0px;
  background: rgb(38, 38, 39);
  display: flex;
  flex-direction: column;
  padding: 2px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  z-index: 9;
}
.toster__position {
  position: fixed;
  bottom: 0;
}
</style>
