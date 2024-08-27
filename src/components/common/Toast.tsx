import { Slide, ToastContainer, ToastContainerProps } from 'react-toastify';

export default function Toast({ ...restToastContainerProps }: ToastContainerProps) {
  return (
    <ToastContainer
      {...restToastContainerProps}
      transition={Slide}
      pauseOnHover={false}
      className="p-layout z-toast"
      toastClassName="shadow-toast rounded-lg p-2 bg-white-01 m-0 mt-2"
      bodyClassName="text-black-01 font-pretendard font-toast m-0 p-2 pr-1"
    />
  );
}
