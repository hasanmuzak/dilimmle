<template>
  <div>
    <Header></Header>
    <Nuxt />
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header,
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.nightMode ? "bg-gray-900 transition duration-300" : "bg-gray-200 transition duration-300",
      },
    };
  },
};
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: 1s all;
}
.page-enter,
.page-leave {
  opacity: 0;
}
</style>
