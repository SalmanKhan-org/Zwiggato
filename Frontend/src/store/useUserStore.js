import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from 'axios';
import { toast } from 'react-toastify';
const API_END_POINT = "https://zwiggato-ldwb.onrender.com/api/v1"
axios.defaults.withCredentials = true


export const useUserStore = create()(persist((set) => ({
    user: null,
    isAuth: false,
    isCheckingAuth: true,
    loading: false,
    signup: async (input) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuth:true });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message||"Something went wrong");
            set({loading:false})
        }
    },
    login: async (input) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuth: true });
            }
        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false })
        }
    },
    verifyEmail: async (verificationCode) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuth: true });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message||"Something went wrong");
            set({ loading: false })
        }
    },
    checkAuthentication: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/get-user`);
            if (response.data.success) {
                set({ loading: false, user: response.data.user, isAuth: true, isCheckingAuth:false });
            }
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong")
            set({ loading: false, isAuth:false, isCheckingAuth:false })
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/logout`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, isAuth: false, user: null });
                localStorage.removeItem("user-name");  // Clear Zustand persisted data
                window.location.href = "/login";  // Hard reload for persistence fix
            }
        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    forgotPassword: async (email) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`,{email});
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false});
            }
        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false })
        }
    },
    resetPassword: async (token, newPassword) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`,{newPassword});
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false});
            }
        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false })
        }
    },
    updateProfile: async (formData) => {
        try {
            const response = await axios.put(`${API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                set({ user: response.data.user, isAuth: true });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

}), {
    name: `user-name`,
    storage: createJSONStorage(()=>localStorage)
}))