<template>
  <transition name="slide-fade" mode="out-in">
    <div class="popup">popup</div>
  </transition>
</template>


<script>
export default {
  name: "popupwindow"
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.popup {
  position: fixed;
  right: 1rem;
  top: 1rem;
  max-width: calc(100vw - 2rem);
  background: royalblue;
  color: #fff;
  padding: 1rem;
}
</style>



