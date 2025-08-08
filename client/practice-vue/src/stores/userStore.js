import { defineStore } from "pinia";
import axios from "axios";
    const api = axios.create({
   baseURL: 'http://localhost:3000'
});
export const useUserStore = defineStore('user',{
    state:()=>({
        users :[],
         isSearchVisible: true,
    }),
    actions:{
        async getAllUsers (){
            try {
                const response = await api.get(`/users`);
                this.users = response.data;
                return  response.data;
            } catch (error) {
                this.error = "failed to fetch users";
                console.log(error);
                
            }
        },
        async adduser(newuser){
            try {
                const response = await api.post(`/create`,newuser);
                this.users.push(response.data);
            } catch (error) {
                this.error = "failed to add user";
                console.log(error);
            }
        },
        async updateUser(userId,updateduser){
            try {
                const response = await api.post(`/update/${userId}`,updateduser);
                const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) {
          this.users[index] = response.data; 
        }
            } catch (error) {
                this.error =  "failed to update user";
                console.log(error);

            }
        },
        async deleteUser(userId){
            try {
                await api.get(`/delete/${userId}`);
                 this.users = this.users.filter(user => user.id !== userId);
            } catch (error) {
                     this.error = 'Failed to delete user.';
                    console.error(error);       
            }
        },
             async uploadCSV(formData){
              try {
                const response =  api.post(`/upload`, formData, {
              headers: {'Content-Type': 'multipart/form-data'},
            });
            return (await response).data
              } catch (error) {
                console.error('Failed to upload file and saved data:', error);
                throw error; 
              }
        
          },
            async serchuserdata (query){
            try {
                const response = await api.get(`search?query=${query}`);
                this.users = response.data;
                console.log("response.data;",response.data);
                
                return  response.data;
            } catch (error) {
                this.error = "failed to fetch users";
                console.log(error);
                
            }
        },
            showSearch() {
            this.isSearchVisible = true;
            },
            hideSearch() {
            this.isSearchVisible = false;
            },

        
    }
});