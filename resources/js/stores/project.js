import axios from "axios";
import { defineStore } from "pinia";

export const useProjectStore = defineStore('authProject', {
    state: () => {
        return {
            projects: null,
            selectedProject: null,
            errors: {},
            message: '',
            isLoading: false
        };
    },
    getters: {},
    actions: {
        async getProjects(){
            if(localStorage.getItem('token')){
                try{
                    const response = await axios.get('/api/project/index', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    if(response.status === 200){
                        //Get projects
                        this.projects = response.data.map((element) => {
                            return {
                                project_title: element.project_title,
                                percentage: 1
                            }
                        });
                    }
                }catch(error){
                    console.log('Inside Axios getProjects:');
                    console.error(error);  
                }
            }
        },
        async storeProject(formData) {
            if(localStorage.getItem('token')){
                try{
                    this.isLoading = true;

                    const response = await axios.post('/api/project/store', formData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
        
                    if(response.status === 200){
                        const data = response.data;

                        //Clear errors
                        this.errors = {};
            
                        //Refresh projects
                        this.getProjects();
            
                        //Show response message
                        this.toast.add({
                            severity: data.message.severity, 
                            summary: data.message.summary, 
                            detail: data.message.detail, 
                            life: 3000
                        });
            
                        return true;
                    } 
                }catch (error){
                    //Get form errors
                    if(error.response && error.response.data.errors){
                        this.errors = error.response.data.errors;
                    }
        
                    console.error('Error in storeProject:', error);
                    return false;
                }finally{
                    this.isLoading = false;
                }
            }
        }
    },
});