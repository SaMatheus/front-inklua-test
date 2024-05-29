import { toast } from "react-hot-toast";

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

export function showToast({ message, type, duration = 4000 }: ToastProps) {
  if (type === 'error') {
    toast.error(message, { duration });
  } else {
    toast.success(message, { duration });
  }
}