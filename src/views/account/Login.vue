<template>
    <Background />
    <LoginNavBar/>
    <div class="login-container">
<!--        <img src="/person.png" class="earth-img" />-->
        <div class="login-box">
          <LoginForm></LoginForm>
        </div>
    </div>
</template>

<script setup>
import Background from '../../components/Background/Background.vue';
import LoginForm from "@/views/account/LoginForm.vue";
import LoginNavBar from "@/components/NavBar/LoginNavBar.vue";
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-container {
  .login-box {
    min-width: 900px;
    min-height: 600px;
    z-index: 2;
    position: absolute;
    width: 60%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 0.7px 1.7px rgba(0, 0, 0, 0.248);
    box-sizing: border-box;
    backdrop-filter: blur(8px);
  }
}

.el-input__wrapper {
  background-color: transparent !important;
}
</style>