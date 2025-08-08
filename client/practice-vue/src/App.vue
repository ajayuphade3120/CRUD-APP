<template>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link v-if="searchStore.isSearchVisible" @click="searchStore.showSearch()" class="navbar-brand" to="/">User Management</router-link>
    <router-link v-if="!searchStore.isSearchVisible" @click="searchStore.showSearch()" class="btn btn-secondary" to="/">Back</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      <form class="d-flex" v-if="searchStore.isSearchVisible">
        <input class="form-control me-2" type="search" placeholder="Search" v-model="searchinput" aria-label="Search">
        <button class="btn btn-outline-success" type="submit" @click="serchUser">Search</button>
      </form>
    </div>
  </div>
</nav>
      <router-view></router-view>   
</template>
  
<script setup>
import { ref } from 'vue';
import { useUserStore } from './stores/userStore';
const searchStore = useUserStore();

  const searchinput = ref('');
  
     const serchUser = async (event) =>{
       event.preventDefault(); 
           console.log("searchinput",searchinput.value);
       try {
        if(searchinput.value !==''){
          const data = await searchStore.serchuserdata(searchinput.value);
          console.log("serchdata", data);
        }
        else{
          alert("Please Enter Something")
        }
       } catch (error) {
        console.error('error searching data.', error);
         
       }
  
      


   }
</script>

<style>
.navbar {
  background-color: #eee1e1;
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #8bcee9;
}

.nav-link.router-link-active {
  background-color: #8bcee9   ;
}
</style>
