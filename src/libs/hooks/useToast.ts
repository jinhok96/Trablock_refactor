import { useRef } from 'react';
import { Id, ToastContent, ToastOptions, TypeOptions, toast } from 'react-toastify';

type CustomToastOptions = Omit<ToastOptions, 'type'>;

export default function useToast() {
  const toastIdRef = useRef<Id | null>(null);

  const closeToast = () => {
    toast.dismiss();
  };

  const showToast = (content: ToastContent, type: TypeOptions, options?: CustomToastOptions) => {
    toastIdRef.current = toast(content, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      draggable: false,
      closeOnClick: true,
      onClick: () => closeToast(),
      type,
      ...options
    });
  };

  return { showToast, closeToast };
}
