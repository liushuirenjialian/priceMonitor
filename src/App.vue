<template>
  <div id="grainReserves">
    <router-view>

   </router-view>
<!--    <img src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {userInfo,selectList} from "@/api/getInfo";

export default {
  name: 'grainReserves',
  components: {
    // HelloWorld
  },
    created(){

    }
}
</script>

<style>
/*#grainReserves {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
