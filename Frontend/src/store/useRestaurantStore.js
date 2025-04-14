import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from 'axios';
import { toast } from 'react-toastify';
const API_END_POINT = "https://zwiggato-ldwb.onrender.com/api/v1"
axios.defaults.withCredentials = true

export const useRestaurantStore = create()(persist((set,get) => ({
    loading: false,
    restaurant: null,
    searchedRestaurants: null,
    appliedFilter: [],
    singleRestaurant: null,
    restaurantOrders:[],
    createRestaurant: async (input) => {
        try {
            set({ loading: true })
            const response = await axios.post(`${API_END_POINT}/create`,  input , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error) {
            toast.success(error.response.data.message);
            set({ loading: false });
        }
    },
    getRestaurant: async () => {
        try {
            set({ loading: true })
            const response = await axios.get(`${API_END_POINT}/restaurant`);
            if (response.data.success) {
                set({ loading: false, restaurant: response.data.restaurant });
            }
        } catch (error) {
            if (error.response.status === 404) {
                set({restaurant:null})
            }
            set({ loading: false });
        }
    },
    updateRestaurant: async (input) => {
        try {
            set({ loading: true })
            const response = await axios.put(`${API_END_POINT}/update`, input , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error) {
            toast.success(error.response.data.message);
            set({ loading: false });
        }
    },
    searchRestaurant: async (searchText, searchQuery, selectedCuisines) => {
        try {
            set({ loading: true });
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            if (selectedCuisines?.length) {
                params.set("selectedCuisines", selectedCuisines.join(","));
            }
            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false,searchedRestaurants:response.data.restaurants });
            }
        } catch (error) {
            toast.success(error.response.data.message);
            set({ loading: false });
        }
    },
    addMenuToRestaurant: (menu) => {
        set((state) => ({
            restaurant:state.restaurant ? {...state.restaurant, menus:[...state.restaurant.menus,menu]}:null
        }))
    },
    updateMenuToRestaurant: (updateMenu) => {
        set((state) => {
            if (state.restaurant) {
                const updateMenuList = state.restaurant.menus.map((menu) => menu._id === updateMenu._id ? updateMenu : menu);
                return {
                    restaurant: {
                        ...state.restaurant,
                        menus: updateMenuList
                    }
                }
            }
        })
    },
    setAppliedFilter: (value) => {
        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item != value) : [...state.appliedFilter, value];
            return {
                appliedFilter : updatedFilter
            }
        })
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] });
    },
    getSingleRestaurant: async (id) => {
        try {
            set({ loading: true })
            const response = await axios.get(`${API_END_POINT}/restaurant/${id}`);
            if (response.data.success) {
                set({ loading: false, singleRestaurant: response.data.restaurant });
            }
        } catch (error) {
            if (error.response.status === 404) {
                set({ singleRestaurant: null })
            }
            set({ loading: false });
        }
    },
    getRestaurantOrders: async () => {
        try {
            const response = await axios.get(`${API_END_POINT}/orders`);
            if (response.data.success) {
                set({restaurantOrders:response.data.orders})
            }
        } catch (error) { toast.error(error?.response?.data?.error || "Something went wrong") }
    },
    updateRestaurantOrder: async (orderId, status) => {
        try {
            const response = await axios.put(
                `${API_END_POINT}/order/${orderId}/status`,
                { status }, // ✅ Correct: wrap status in an object
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );



            if (response.data.success) {
                const updatedOrder = get().restaurantOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, status: response.data.status }
                        : order
                );
                set({ restaurantOrders: updatedOrder });
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)
}))