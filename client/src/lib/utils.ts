import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const base64ToFile = (base64String: string, fileName: string): File => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const byteString = atob(arr[1]); // Giải mã Base64
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }

  return new File([arrayBuffer], fileName, { type: mime });
};
export function formatDate(date: Date): string {
  if (!(date instanceof Date) && typeof date !== "string") {
    return "Invalid date"
  }

  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return "Invalid date"
  }

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  const seconds = String(d.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
};


export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

export function formatDateV2(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}


