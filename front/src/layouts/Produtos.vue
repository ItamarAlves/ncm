<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$q.addressbarColor.set();
  }
};
</script>

<style>
</style>