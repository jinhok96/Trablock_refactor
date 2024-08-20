import { useCallback, useRef } from 'react';
import { ToastContent, ToastOptions, toast } from 'react-toastify';

export default function useToast() {
  const isToastOpenedRef = useRef(false);
  const toastCloseTimerIdRef = useRef<NodeJS.Timeout | null>(null);
  const toastOpenTimerIdRef = useRef<NodeJS.Timeout | null>(null);

  const open = (content: ToastContent, options?: ToastOptions) => {
    toast(content, {
      position: 'bottom-center',
      autoClose: false,
      hideProgressBar: true,
      draggable: false,
      closeOnClick: true,
      onClick: () => close(),
      ...options
    });
    isToastOpenedRef.current = true;
  };

  const close = () => {
    toast.dismiss();
    isToastOpenedRef.current = false;
  };

  const showToast = useCallback(
    (content: ToastContent, options?: ToastOptions) => {
      close();

      if (toastOpenTimerIdRef.current) {
        clearTimeout(toastOpenTimerIdRef.current);
      }
      toastOpenTimerIdRef.current = setTimeout(() => open(content, options), 200);

      if (toastCloseTimerIdRef.current) {
        clearTimeout(toastCloseTimerIdRef.current);
      }
      toastCloseTimerIdRef.current = setTimeout(() => close(), 3000);
    },
    [open, close]
  );

  const closeToast = useCallback(() => {
    close();
  }, [close]);

  return { showToast, closeToast };
}
