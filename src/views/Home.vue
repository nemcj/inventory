<template>
  <div class="home">
    <h1>Vue Buttonek</h1>
    <vue-buttonek @clicked="myFunc();" class="primary" title="text"></vue-buttonek>
    <popup-window></popup-window>
  </div>
</template>

<script>
// @ is an alias to /src
import VueButtonek from "@/components/VueButtonek.vue";
import PopupWindow from "@/components/PopupWindow.vue";

export default {
  created() {
    this.$emit("created");
  },
  name: "home",
  components: {
    VueButtonek,
    PopupWindow
  },
  data() {
    return {};
  },
  methods: {
    myFunc: function(
      type = "success",
      content = "Lorem ipsum",
      action = false
    ) {}
  },
  mounted: function() {}
};
</script>


<style lang="scss" scoped>
.home {
  max-width: 100%;
  width: 768px;
  margin: 0 auto;
}
</style>

