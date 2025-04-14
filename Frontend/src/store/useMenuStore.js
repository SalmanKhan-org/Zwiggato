import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRestaurantStore } from './useRestaurantStore';
const API_END_POINT = "http://localhost:8000/api/v1"
axios.defaults.withCredentials = true

export const useMenuStore = create()(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async (formData) => {
       try {
           set({ loading: true });
           const response = await axios.post(`${API_END_POINT}/add/menu`, formData, {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           });
           if (response.data.success) {
               toast.success(response.data.message);
               set({ loading: false, menu: response.data.menu });
           }
           //update menu to restaurant
           useRestaurantStore.getState().addMenuToRestaurant(response.data.menu);
       } catch (error) {
           toast.error(error.response.data.message);
           set({ loading: false});
       }
    },
    updateMenu: async (formData,id) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/menu/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            //update restaurant menu
            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    }
}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}))