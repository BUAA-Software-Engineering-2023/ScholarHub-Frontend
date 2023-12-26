<template>
    <div class="container">
        <div  style="width:100%;height:100vh">
          <img src="@/assets/imgs/background.png" alt="">
        </div>
    </div>
</template>
<!--背景图可以直接组件调用-->
<script>
// import * as THREE from 'three'
// import Net from 'vanta/src/vanta.net'
// export default {
//     name: "hello",
//     data() {
//         return {
//
//         };
//     },
//     mounted() {
//         this.vantaEffect = Net({
//             el: this.$refs.vantaRef,
//             THREE: THREE
//         })
//         VANTA.NET({
//             el: this.$refs.vantaRef,
//             mouseControls: true,
//             touchControls: true,
//             gyroControls: false,
//             minHeight: 200.00,
//             minWidth: 200.00,
//             scale: 1.00,
//             scaleMobile: 1.00,
//             color: 0xe7e9ea,
//             backgroundColor: 0x0c161f,
//             spacing: 12.00
//         })
//     },
//     beforeDestroy() {
//         if (this.vantaEffect) {
//             this.vantaEffect.destroy()
//         }
//     },
//     methods: {
//
//     },
//
// };
</script>

<style>
.container{
  margin: 0 !important;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -10;
  width:100%;
  height:100%;
  box-sizing: border-box;
}
</style>
