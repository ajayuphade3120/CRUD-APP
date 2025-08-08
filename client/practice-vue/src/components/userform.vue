<template>
  <div class="container mt-5">
            <h2>Create User Data</h2>
  </div>
  <form @submit.prevent="handleSubmit">
    <div>
      <label class="form-label" for="name">Name</label>
      <input  class="form-control" type="text" id="name" v-model="formData.name" />
    </div>
    <div>
      <label class="form-label" for="email">Email</label>
      <input  class="form-control" type="email" id="email" v-model="formData.email" />
    </div>
       <div>
      <label class="form-label" for="phone">Phone</label>
      <input  class="form-control" type="text" id="phone" v-model="formData.phone" />
    </div>
    <div>
      <label class="form-label dob" for="dob">DOB</label>
      <input  class="form-control" type="date" id="dob" v-model="formData.dob" />
    </div>
    <div>
      <label class="form-label" for="address">Address</label>
      <input  class="form-control" type="text" id="address" v-model="formData.address" /> 
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
// import { postUser } from '@/services/api';
import { reactive } from 'vue';
import router from '@/routes';
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
// interface userForm {
//   name: string;
//   email: string;
//   phone:string;
//   dob :Date | null,
//   address:string
// }

const formData = reactive({
  name: '',
  email: '',
  phone:'',
  dob : null,
  address:''
});

const handleSubmit = async (event) => {
        event.preventDefault(); 
        console.log("userform",formData);
          // const newuser = await postUser(formData);
          // console.log('Form submitted:', newuser);
          await userStore.adduser(formData);
            router.push('/');
        
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

label {
  font-weight: bold;
  margin-right: 25px;
}

input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
    h2{
        text-align: center;
    }
    .dob{
          width: 167px;
    margin-left: 10px;
    }
</style>