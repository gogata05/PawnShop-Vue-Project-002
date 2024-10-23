<!-- client\src\components\Alert.vue -->
<script>
export default {
  props: {
    alert: String
  }
};
</script>

<template>
  <label>
    <input type="checkbox" class="alertCheckbox" autocomplete="off" />
    <div class="alert error">
      <span class="alertClose">X</span>
      <span class="alertText"> {{ alert }} <br class="clear" /></span>
    </div>
  </label>
</template>

<style scoped>
.alert {
  position: absolute;
  top: 10px;
  left: 5%;
  width: 90%;
  height: auto;
  padding: 10px;
  line-height: 1.8;
  border-radius: 5px;
  cursor: hand;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: 400;
  z-index: 1;
}

.alertCheckbox {
  display: none;
}

:checked + .alert {
  display: none;
}

.alertText {
  display: table;
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.alertClose {
  float: right;
  padding-top: 5px;
  font-size: 10px;
}

.clear {
  clear: both;
}

.error {
  background: #cb2d3e; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ef473a, #cb2d3e); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ef473a, #cb2d3e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: 1px solid rgb(200, 96, 96);
  color: rgb(45, 20, 20);
}
</style>
