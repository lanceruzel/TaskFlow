import axios from "axios";
import { defineStore } from "pinia";

export const useProjectStore = defineStore('authProject', {
    state: () => {
        return {
            projects: [],
            selectedProject: null,
            errors: {},
            message: '',
            istTaskListLoading: false,
            isFormLoading: false,
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
                                id: element.id,
                                project_title: element.project_title,
                                percentage: 1,
                                tasks: element.tasks
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
                    this.isFormLoading = true;

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
                    this.isFormLoading = false;
                }
            }
        },
        async getSelectedProject(id){
            if(localStorage.getItem('token')){
                try{
                    this.istTaskListLoading = true;

                    const response = await axios.get(`/api/project/show/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    if(response.status === 200){
                        this.selectedProject = response.data;
                        console.log(this.selectedProject)
                    }
                }catch(error){
                    console.log('Inside Axios getSelectedProject:');
                    console.error(error);  
                }finally{
                    this.istTaskListLoading = false;
                }
            }
        },
        getFilteredTasks(status) {
            // Filter tasks
            return (!this.selectedProject || !this.selectedProject.tasks) ? null :
                this.selectedProject.tasks.filter((element) => element.status === status);
        },
        async getTasks(){
            if(localStorage.getItem('token') && this.selectedProject != null){
                try{
                    const response = await axios.post('/api/task/index', { 'project_id': this.selectedProject.id }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    if(response.status === 200){
                        //Get tasks
                        this.selectedProject.tasks = response.data;
                    }
                }catch(error){
                    console.log('Inside Axios getTasks:');
                    console.error(error);  
                }
            }
        },
        async storeTask(formData){
            console.log(formData);
            if(localStorage.getItem('token')){
                try{
                    this.isFormLoading = true;

                    const response = await axios.post('/api/task/store', {
                        project_id: this.selectedProject.id,
                        title: formData.title,
                        assigned_id: null
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
        
                    if(response.status === 200){
                        const data = response.data;

                        //Clear errors
                        this.errors = {};
            
                        //Refresh tasks
                        this.getTasks();
            
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
        
                    console.error('Error in storeTask:', error);
                    return false;
                }finally{
                    this.isFormLoading = false;
                }
            }
        }
    },
});