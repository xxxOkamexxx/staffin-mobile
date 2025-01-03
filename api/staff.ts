import { Alert, Platform } from "react-native";
import { api } from "./API";
import { User } from "./user";
import * as FileSystem from 'expo-file-system';

export interface CV {
  name: string;
  url: string;
}

export interface ExpData {
  id: number
  position: string;
  description?: string;
  companyName: string;
  location: string;
  startDate: string
  endDate: string
  staffId: number
}

export interface EducationData {
  id: number
  name: string
  institution: string
  startDate: string
  endDate: string
  staffId: number
}


// Generate CV
const generateCV = async (token: string) => {
  try {

    const response = await api.post(
      '/Staff/Generate-CV', 
      {}, 
      {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'accept': '*/*', 
        }
      }
    );
    const { message, url } = response.data;

    console.log(message);  // "CV generated and saved."
    console.log(url);      // "https://staffin.clearq.se/Staff/Download-CV"

    return url; 
  } catch (error: any) {
    Alert.alert('Error', error.response?.data?.message || "Failed to generate CV");
    throw new Error(error.response?.data?.message || "Failed to generate CV");
  }
};


// Download CV
const downloadCV = async (token: string) => {
  try {
    const response = await api.get('/Staff/Download-CV', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*',
      },
      responseType: 'blob', 
    });

    const fileData = response.data;

    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
      : 'StaffCV.pdf'; 

    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, fileData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Alert.alert('Success', `CV downloaded successfully to: ${fileUri}`);
    
  } catch (error: any) {
    Alert.alert('Error', error.response?.data?.message || 'Failed to download CV');
    throw new Error(error.response?.data?.message || 'Failed to download CV');
  }
};


// Get CV
const getCV = async (token: string) => {
  try {
    const response = await api.get("/Staff/Get-CV", {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    return response.data;
  } catch (error: any) {
    Alert.alert('Error', error.response?.data?.message || "Failed to fetch CV" )
    throw new Error(error.response?.data?.message || "Failed to fetch CV");
  }
};


// Update Staff
const updateStaff = async (userData: Partial<User>, token: string) => {
  try {
    const response = await api.put("/Staff/UpdateStaff", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    Alert.alert('Error', error.response?.data?.message || "Failed to update user profile")
    throw new Error(error.response?.data?.message || "Failed to update user profile");
  }
};


// Get Staff Experience
const getExperience = async (token: string) => {
  try {
    const response = await api.get("/Staff/StaffExperience-Get", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
    
  } catch (error: any) {
    Alert.alert('Error', error.response?.date?.message || "Failed to get experience")
    throw new Error(error.response?.data?.message || "Failed to get experience");
  }
};


// Add Staff Experience
const  addExperience = async (expData:Partial<ExpData>, token:string) => {
  try {
    const response = await api.post("/Staff/StaffExperience-Add", expData, {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    return response.data;
  } catch(error:any){
    Alert.alert('Error', error.response?.data?.message || "Failed to add experience")
  }
};


// Update Staff Experience
const updateExperience = async (experienceId: number, expData:Partial<ExpData>, token:string) => {
  try {
    const response = await api.put(`/Staff/StaffExperience-Update?experienceId=${experienceId}`, expData, {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    console.log('update exp:', response)
    return response.data;
  } catch(error:any){
    Alert.alert('Error', error.response?.data?.message || "Failed to update experience")
  }
};


// Delete Staff Experience
const deleteExperience = async (experienceId: number, token: string): Promise<void> => {
  try {
    const response = await api.delete(`/Staff/StaffExperience-Remove?experienceId=${experienceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Delete response:", response.data);
    Alert.alert("Success", "Experience deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    Alert.alert(
      "Error",
      error.response?.data?.message || "Failed to delete experience"
    );
  }
};



// Get Staff Education
const getEducation = async (token:string) => {
  try {
    const response = await api.get("/Staff/GetStaff-Education", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
    
  } catch (error: any) {
    Alert.alert('Error', error.response?.date?.message || "Failed to get experience")
    throw new Error(error.response?.data?.message || "Failed to get experience");
  }
};


// Add Staff Education
const addEducation = async (educationData:Partial<EducationData>, token:string) => {
  try {
    const response = await api.post("/Staff/StaffEducation-Add", educationData, {
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    return response.data;
  } catch(error:any){
    Alert.alert('Error', error.response?.data?.message || "Failed to add experience")
  }
};


// Update Staff Education
const updateEducation = async () => {
  
};


// Delete Staff Education
const deleteEducation = async (educationId: number, token: string) => {
  try {
    const response = await api.delete(`/Staff/StaffEducation-Remove?educationId=${educationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Delete response:", response.data);
    Alert.alert("Success", "Experience deleted successfully!");
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    Alert.alert(
      "Error",
      error.response?.data?.message || "Failed to delete experience"
    );
  }
};

export { 
  generateCV,  
  downloadCV, 
  getCV, 
  updateStaff,
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
};