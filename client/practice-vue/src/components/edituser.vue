<template>
  <div>
    <h2 style="text-align: center; margin-top: 20px; "> Edit User Profile</h2>
   </div>
    <form @submit.prevent="handleUpdate">
    <div>
      <label class="form-label" for="name">Name</label>
      <input class="form-control" type="text" id="name" v-model="users.name" />
    </div>
    <div>
      <label class="form-label" for="email">Email</label>
      <input class="form-control" type="email" id="email" v-model="users.email" />
    </div>
       <div>
      <label class="form-label" for="phone">Phone</label>
      <input class="form-control" type="text" id="phone" v-model="users.phone" />
    </div>
    <div>
      <label class="form-label dob" for="dob">DOB</label>
      <input class="form-control" type="date" id="dob" v-model="users.dob" />
    </div>
    <div>
      <label class="form-label" for="address">Address</label>
      <input class="form-control" type="text" id="address" v-model="users.address" />
    </div>
    <button type="submit">Update</button>
      <p v-if="message">{{ message }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/routes';
// import { updateUser } from '@/services/api';
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const route = useRoute();
const userId = ref(route.params.id);
const users = ref(route.query);
  console.log(" users.value", users.value );
const message = ref('');

    const handleUpdate = async (event) => {
        event.preventDefault(); 
  try {
    //  await updateUser(userId.value, users.value);
      await userStore.updateUser(userId.value, users.value);
    message.value = 'User updated successfully!';
    router.push('/');
  } catch (error) {
    message.value = 'Error updating user.';
    console.error('Error updating user:', error);
  }
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