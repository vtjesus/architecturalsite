import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  description: z.string().optional(),
});