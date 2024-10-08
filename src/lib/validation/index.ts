import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    passwordRepeat: z.string().min(8, { message: "Password must be at least 8 characters." }) // Menambahkan validasi untuk konfirmasi password
    .refine((val) => {
      // Menggunakan 'this' untuk mengakses konteks
      const password = (this as unknown as { parent: { password: string } })?.parent.password; 
      return val !== password; // Memastikan nilai sama dengan password
    }, { message: "Passwords must match." }) // Menambahkan pesan kesalahan

  });

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });


  // ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  // imageUrl: z.string().url({ message: "Must be a valid URL" }).max(1000, { message: "Maximum 1000 characters." }).optional(),
  file: z.custom<File[]>(),
});


export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
  phoneNumber: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,9}$/, { message: "Nomor telepon harus valid dan menggunakan format Indonesia" }).min(10, { message: "Nomor telepon minimal 10 digit" }).max(13, { message: "Nomor telepon maksimal 13 digit" }),
});