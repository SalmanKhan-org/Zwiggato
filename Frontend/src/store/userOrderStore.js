import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import axios from 'axios';
import { toast } from 'react-toastify';
const API_END_POINT = "https://zwiggato-ldwb.onrender.com/api/v1"
axios.defaults.withCredentials = true

export const useOrderStore = (create)(persist((set) => ({
    loading: false,
    orders: [],
    createCheckoutSession: async (checkoutSessionRequest) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutSessionRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const session = response.data.session;
                window.location.href = session.url;
                set({ loading: false });
            }
        } catch (error) {
            toast.error(error?.response?.data?.error||"Something went wrong")
            set({ loading: false });
        }
    },
    getOrderDetails: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/all-orders`);
            set({ loading: false, orders: response.data.orders });
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong")
            set({ loading: false });
        }
    }
})), {
    name: 'order-state',
    storage : createJSONStorage(()=>localStorage)
})