import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/user';
const PRODUCER_API_BASE_URL = 'http://localhost:8080/producer';
const BUYER_API_BASE_URL = 'http://localhost:8080/buyer';
const ORDER_API_BASE_URL = 'http://localhost:8080/order';
class ApiService {

  

    fetchCropsByUserId(userId) {
        return axios.get(PRODUCER_API_BASE_URL + '/' + userId);
    }
    fetchCropsById(cropId) {
        return axios.get(PRODUCER_API_BASE_URL + '/edit/' + cropId);
    }
    addCrop(userId,crop) {
        console.log(crop);
        return axios.post(""+PRODUCER_API_BASE_URL+ '/add-crops/'+userId,crop );
    }
    deleteCrop(cropId) {
        return axios.delete(PRODUCER_API_BASE_URL + '/' + cropId);
    }
    editCrop(crop) {
        return axios.put(PRODUCER_API_BASE_URL + '/' + crop.id, crop);
    }


    addUser(user) {
        console.log(user.role);
        return axios.post(""+USER_API_BASE_URL+ '/register', user);
    }
    loginUser(user) {
        console.log(user);
        console.log("In lgin request");
        return axios.post(""+USER_API_BASE_URL+ '/login', user);
    }
    fetchUserById(userId) {
        console.log(userId);
        return axios.get(USER_API_BASE_URL+'/'+ userId);
    }
    editUser(user,userId){
        console.log(user);
        return axios.put(USER_API_BASE_URL+'/'+userId, user);
    }
    deleteUser(userId){
        console.log(userId);
        return axios.delete(USER_API_BASE_URL+'/'+userId);
    }


    fetchCrops() {
        return axios.get(BUYER_API_BASE_URL );
    }
    checkOut(data){

        return axios.post(BUYER_API_BASE_URL+'/add-items',data)
    }

    addOrder(data){

        return axios.post(BUYER_API_BASE_URL+'/order',data)
    }
    
orderHistory(id){
    return axios.get(ORDER_API_BASE_URL+'/'+id)

}
  
}

export default new ApiService();