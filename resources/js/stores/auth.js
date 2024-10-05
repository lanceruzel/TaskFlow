import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            errors: {},
            message: '',
            isLoading: false
        };
    },
    getters: {
        welcomeUser: (state) => {
            `Welcome back, ${state.user}!`
        }
    },
    actions: {
        async getUser(){
            if(localStorage.getItem('token')){
                try{
                    const response = await axios.get('/api/user', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if(response.status === 200){
                        //Get logged in user and clear errors
                        this.user = response.data;
                        this.errors = {};
                    }
                }catch(error){
                    console.log('Inside Axios getUser:');
                    console.error(error);  
                }
            }
        },
        async authenticate(route, formData){
            this.isLoading = true;

            try{
                const response = await axios.post(`/api/auth/${route}`, formData);

                if(response.status === 200){
                    const data = response.data;

                    if(data){
                        //Check if user is signing in or signing up
                        if(route === 'login'){
                            //Get message if have
                            if(data.message){
                                this.message = data.message;
                                return;
                            }

                            //Set token and user data
                            localStorage.setItem('token', data.token);
                            this.user = data.user;

                            //Re-route user
                            this.router.push({ name: 'home' });
                        }else{
                            //Get message
                            this.message = data.message;

                            //Re-route user
                            this.router.push({ name: 'sign-in' });
                        }
                    }
                }
            }catch(error){
                //Get form input errors
                if(error.response.data.errors){
                    this.errors = error.response.data.errors;
                }  

                console.log('Inside Axios authenticate:');
                console.error(error);
            }finally{
                this.isLoading = false;
            }
        },
        async logout(){
            if(localStorage.getItem('token')){
                try{
                    const response = await axios.post('/api/auth/logout', null, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if(response.status === 200){
                        //Clear data
                        this.user = null;
                        this.errors = {};
                        localStorage.removeItem('token');
                        
                        //Get message detail
                        this.message = response.data.message;

                        //Re-route user
                        this.router.push({ name: 'sign-in' });
                    }
                }catch(error){
                    console.log('Inside Axios logout:');
                    console.error(error); 
                }
            }
        }
    },
});