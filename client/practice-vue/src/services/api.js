import axios from "axios";


const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

 const getusers = async () => {
  try {
    const response = await apiClient.get('/users');    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

 const postUser = async (userData) => {
  try {
    const response =  await apiClient.post('/create', userData);
    return response.data;
  } catch (error) {
    console.error('Error posting user:', error);
    throw error; 
  }
};
   const updateUser = async (userId, userData) =>{
      try {
        const response = await apiClient.post(`/update/${userId}`, userData);
        return response.data; 
      } catch (error) {
        console.error('Error updating user:', error);
        throw error; 
      }
    }
       const deleteUser = async (userId) =>{
      try {
        const response = await apiClient.get(`/delete/${userId}`);
        return response.data; 
      } catch (error) {
        console.error('Error updating user:', error);
        throw error; 
      }
    }
     const uploadCSV = async (formData) => {
      try {
            return apiClient.post(`/upload`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
      } catch (error) {
        console.error('Error updating user:', error);
        throw error; 
      }

  }
export  {getusers , postUser,updateUser,deleteUser,uploadCSV}