'use client';

import { Slide, ToastClassName, ToastContainer, ToastContainerProps, TypeOptions } from 'react-toastify';

export default function Toast({ ...restToastContainerProps }: ToastContainerProps) {
  const contextClass: { [type in TypeOptions]: string } = {
    success: 'bg-primary-01 text-white-01',
    error: 'bg-red-01 text-white-01',
    info: 'bg-white-01 text-black-01',
    warning: 'bg-red-01 text-white-01',
    default: 'bg-white-01 text-black-01'
  };

  const toastClassName: ToastClassName = (context) =>
    contextClass[context?.type || 'default'] +
    ' flex shadow-toast rounded-lg p-2 m-0 mt-2 w-fit max-w-96 pointer-events-auto';

  const bodyClassName: ToastClassName = () => 'flex-row-center w-fit font-pretendard font-toast m-0 p-2 pr-4';

  return (
    <ToastContainer
      {...restToastContainerProps}
      transition={Slide}
      pauseOnHover={false}
      className="p-layout flex-col-center pointer-events-none z-toast w-full"
      toastClassName={toastClassName}
      bodyClassName={bodyClassName}
    />
  );
}
