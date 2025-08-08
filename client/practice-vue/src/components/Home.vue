<template>
      <div class="container">
   <button class="btn btn-secondary" @click="addUserdata()">Add User</button>
    <div>
   <div style="display: flex;">
    <input style="width: 60%; margin-right: 20px;" type="file" class="form-control" ref="myFile" @change="handleFileChange" accept=".csv" />
    <button  class="btn btn-primary" @click="uploadCsv" :disabled="!selectedFile">Upload CSV</button>
  </div>
  </div>
</div>
  <div class="home-table-container">
    <div>
    </div>
    <EasyDataTable :headers="headers" :items="users" >
      <template #item-action="item">
      <button class="btn btn-outline-success btn-sm m-2" @click="editItem(item)">Edit</button>
      <button class="btn btn-outline-danger btn-sm m-2" @click="deleteItem(item)">Delete</button>
    </template>
    </EasyDataTable>
     <div v-if="userStore.loading">Loading users...</div>
  </div>
</template>

<script setup >
// import { getusers } from "@/services/api";
import EasyDataTable from "vue3-easy-data-table";
import { onMounted, ref } from 'vue';
import router from "@/routes";
// import { deleteUser } from "@/services/api";
// import { uploadCSV } from "@/services/api";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const headers= [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email', sortable: true },
  { text: 'Phone', value: 'phone' },
  { text: 'Date of Birth', value: 'dob' },
  { text: 'Address', value: 'address' },
   { text: 'Action', value: 'action' },

];

const users =  ref([]);
const selectedFile = ref(null);
const myFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};
  const uploadCsv = async () => {
  if (!selectedFile.value) {
    alert('Please select a CSV file first.');
    return;
  }
  try {
    const formData = new FormData();
    formData.append('myFile', selectedFile.value);

    // const response = await uploadCSV(formData);
   const response = await userStore.uploadCSV(formData);
    getusersdata();
    console.log('CSV uploaded successfully:', response);
    alert('CSV uploaded successfully!');
    myFile.value.value = '';
    selectedFile.value = null;
  } catch (error) {
    console.error('Error uploading CSV:', error);
    alert('Error uploading CSV. Please try again.');
  }
};
onMounted(async () => {
  // await  userStore.getAllUsers();
    getusersdata();
    
});
  const addUserdata = async()=>{
    userStore.hideSearch();
    router.push('/userform');
  }
  const getusersdata = async() =>{
    // const data = await getusers();
        const data = await  userStore.getAllUsers();
        console.log("data",data);
        for (const user of data) {
          user.dob = new Date(user.dob);
          const formattedDate = user.dob.toISOString().substring(0, 10);
          user.dob = formattedDate          
        }
        users.value = data;
        console.log("users.value",users.value);
  }

  const editItem = (item) => {
      console.log("Editing:", item);
          userStore.hideSearch();
      router.push({ name: 'edituser', params: { id: item.id },query:item });
    }

   const deleteItem = async (item) =>{
      console.log("Deleting:", item);
      // await deleteUser(item.id);
      if (confirm('Are you sure you want to delete this user?')) {
        await userStore.deleteUser(item.id);
      }
          getusersdata();

    }

</script>

<style scoped>
.home-table-container {
  padding: 0 140px 0 140px;
}
    .container {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
   width: 80%;
   margin: 45px 125px 45px 125px;
}
</style>