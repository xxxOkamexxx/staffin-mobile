import { Staffin_API } from "./API";

export interface User {
  id: number;
  title?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  profileImage?: string;
  phoneNumber?: string;
  about?: string;
  roleId: number;
  companyId?: number;
  companyName?: string;
  educations?: Education[];
  skills?: Skill[];
  languages?: Language[];
  experience?: Experience[];
}

interface Experience {
  id: number;
  position: string;
  description: string;
  companyName: string;
  location: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
}

interface Skill {
  id: number;
  name: string;
}

interface Language {
  id: number;
  name: string;
  rating: number;
}

interface Education {
  id: number;
  name: string;
  institution: string;
  startDate: string;
  endDate: string; // ISO 8601 format
  staffId: number // ISO 8601 format
}

// Get User Info
const getUser = async (userId: number): Promise<User> => {
  try {
    const response = await Staffin_API.get<User>(`/User/GetUser-id?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error("GetUser error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch current user");
  }
};

export { 
  getUser
}