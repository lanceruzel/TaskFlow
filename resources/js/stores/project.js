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
            isDeleteLoading: false,
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
                        this.projects = response.data;
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

                        //Select the recent project
                        this.getSelectedProject(data.project.id);
            
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
        async updateProject(formData){
            if(localStorage.getItem('token')){
                try{
                    this.isFormLoading = true;

                    const response = await axios.put(`/api/project/update/${this.selectedProject.id}`, formData, {
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
                        
                        this.selectedProject.project_title = data.project.project_title;
            
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

                    this.selectedProject = null;

                    const response = await axios.get(`/api/project/show/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    if(response.status === 200){
                        this.selectedProject = response.data;
                    }
                }catch(error){
                    console.log('Inside Axios getSelectedProject:');
                    console.error(error);  
                }finally{
                    this.istTaskListLoading = false;
                }
            }
        },
        async destroyProject(){
            if(localStorage.getItem('token')){
                try{
                    this.isDeleteLoading = true;

                    const response = await axios.delete(`/api/project/destroy/${this.selectedProject.id}`, {
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
                        this.selectedProject = null;

                        if(this.projects[0]){
                            this.getSelectedProject(this.projects[0].id);
                        }
            
                        //Show response message
                        this.toast.add({
                            severity: data.message.severity, 
                            summary: data.message.summary, 
                            detail: data.message.detail, 
                            life: 3000
                        });
            
                        return true;
                    } 
                }catch(error){
                    console.log('Inside Axios destroyProject:');
                    console.error(error);  
                }finally{
                    this.isDeleteLoading = false;
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
                    const response = await axios.get(`/api/task/show/${this.selectedProject.id}`, {
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
            
                        //Refresh tasks and projects
                        this.getTasks();
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
        
                    console.error('Error in storeTask:', error);
                    return false;
                }finally{
                    this.isFormLoading = false;
                }
            }
        },
        async updateTaskStatus(id, status, title){
            if(localStorage.getItem('token')){
                try{
                    const response = await axios.put(`/api/task/update/${id}`, { status: status, title: title}, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
        
                    if(response.status === 200){
                        if(title){
                            const data = response.data;
                            this.errors = {};

                            //Refresh task
                            this.getTasks();

                            //Show response message
                            this.toast.add({
                                severity: data.message.severity, 
                                summary: data.message.summary, 
                                detail: data.message.detail, 
                                life: 3000
                            });
                        }

                        return true;
                    } 
                }catch (error){
                    //Show error
                    console.error('Error in update task:', error);
                    return false;
                }
            }
        },
        async destroyTask(id){
            if(localStorage.getItem('token')){
                try{
                    this.isDeleteLoading = true;

                    const response = await axios.delete(`/api/task/destroy/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if(response.status === 200){
                        const data = response.data;

                        //Clear errors
                        this.errors = {};
            
                        //Refresh tasks and projects
                        this.getTasks();
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
                }catch(error){
                    console.log('Inside Axios destroy task:');
                    console.error(error);  
                }finally{
                    this.isDeleteLoading = false;
                }
            }
        },
    },
});