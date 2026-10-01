import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePagination(currentPage: number, totalPages: number) {
  // If total pages is 7 or less, display all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If current page is among the first 3 pages
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  // If current page is among the last 3 pages
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If current page is somewhere in the middle
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
