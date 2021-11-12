import axios from "axios";
import http from './base';
const qs = require('qs');

const loginHttp =  axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

class DataService {
    login(username, password){
        return loginHttp.post("/login",qs.stringify({'username': username,'password': password}))
            .then(response => {
                if(response.data.accessToken) {
                    console.log(response.data);
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data;
            })
    }

    register(user) {
        return http.post("/register",user);
    }

    getCalendarList() {
        return http.get('/user/getCalendarList', {params: {'username': this.getCurrentUsername()}});
    }

    addCalendar(calName,username) {
        return http.post("/user/addCalendar", null,{params: {'calendarName': calName, 'username': username}});
    }

    addNotation(calId, notation) {
        return http.post("/user/addNotation", notation, {params: {'calendarId': calId}});
    }

    deleteCalendar(calId) {
        return http.post("/user/deleteCalendar",null, {params: {'calId': calId}});
    }

    findCalendar(uniqueCode){
        return http.post("/user/findCalendar", null,{params: {'uniqueCode': uniqueCode}})
    }

    updateCalendar(calId,newName) {
        return http.post("/user/updateCalendar", null,{params: {'calId': calId, 'newName': newName}});
    }

    userList(){
        return http.get("/admin/getUserList");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentUserRole() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.roles;
    }

    getCurrentUsername() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.username;
    }

    logout(){
        localStorage.removeItem("user");
    }

}

export default new DataService();