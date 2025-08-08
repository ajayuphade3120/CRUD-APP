<template>
    <h2>{{ user[0].name }}</h2>
    <button v-on:click="setdata(username)">Call Fucntion</button>
</template>
<script>
export default {
   name :'child',
   data(){
        return {
            username :"satyam"
        }
   },
   props:{
    user:Object,
    setdata:Function
   }
}
</script>
<style>
</style>