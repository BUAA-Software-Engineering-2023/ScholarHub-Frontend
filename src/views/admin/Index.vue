<template>
  <div class="client-main clearfix">
    <NavBar class="client-header" />
    <div class="client-body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar/NavBar.vue";
</script>
<style>
</style>