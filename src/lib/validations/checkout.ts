import { z } from "zod";

/** Checkout demo form validation (Persian messages) */
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3, "نام و نام خانوادگی را کامل وارد کنید")
    .max(60, "نام بیش از حد طولانی است"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
  email: z
    .string()
    .email("ایمیل معتبر نیست")
    .max(120)
    .or(z.literal(""))
    .optional(),
  province: z.string().min(2, "استان را وارد کنید"),
  city: z.string().min(2, "شهر را وارد کنید"),
  address: z.string().min(10, "آدرس کامل‌تری وارد کنید").max(300),
  postalCode: z
    .string()
    .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
    .or(z.literal(""))
    .optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
