import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitArray(arr : workSanity[],max_element = 6) {
    const firstArrayLength = arr.length >= 10 ? max_element: arr.length;
    const firstArray = arr.slice(0, firstArrayLength);
    const secondArray = arr.length > max_element ? arr.slice(firstArrayLength) : [];
  
    return [firstArray, secondArray];
  }