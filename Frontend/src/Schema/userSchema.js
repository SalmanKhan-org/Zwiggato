import { z } from 'zod';

//validation Schema for Signup 
export const userSignupSchema = z.object({
    name: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email Address"),
    password: z.string().min(6, "Password must be atleast 6 characters"),
    contact: z.string().min(10,"Contact number must be of 10 digits")
})

//validation Schema for Login 
export const userLoginSchema = z.object({
    email: z.string().email("Invalid email Address"),
    password: z.string().min(6, "Password must be atleast 6 characters")
})


