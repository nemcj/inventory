<template>
  <a @click="clickhandler()" class="button">{{ title }}</a>
</template>

<script>
import { close } from "fs";
export default {
  name: "vuebuttonek",
  props: ["title"],
  data() {
    return {
      classes: {
        dark: false,
        light: false
      }
    };
  },
  methods: {
    clickhandler: function() {
      this.$emit("clicked");
    }
  },
  mounted: function() {}
};
</script>

<style lang="scss" scoped>
$primary: rgba(36, 123, 160, 1);
$info: rgba(112, 193, 179, 1);
$info-alt: rgba(178, 219, 191, 1);
$danger: rgba(255, 22, 84, 1);
$dark: rgba(1, 22, 39, 1);
$light: rgba(253, 255, 252, 1);
$warn: rgba(255, 159, 28, 1);

.button {
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  color: $primary;
  transition: background-color 0.15s ease-out;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
  &.primary {
    background-color: $primary;
    color: $light;
  }
  &.light {
    background-color: $light;
    color: $dark;
  }
  &.dark {
    color: $light;
    background-color: $dark;
  }
  &.rounded {
    border-radius: 5px;
  }
  &.upper {
    text-transform: uppercase;
  }
}
</style>
