import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A function that takes in any number of class names and/or Tailwind-like object
 * syntax and outputs a single class string that can be used on an element.
 * The output class string will be the combination of all the input class names
 * 
 * @param inputs Any number of class names and/or Tailwind-like object syntax
 * @example
 * import { cn } from "@/utils/classNames";
 *
 * cn("className", "hover:bg-blue-500") // returns 'whatever-was-in-className hover:bg-blue-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}