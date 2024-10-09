import Button, { ButtonProps } from '@/components/common/buttons/Button';

export interface TabMenuButtonProps extends ButtonProps {
  tabName: string;
  isSelected: boolean;
}

export default function TabMenuButton({ tabName, isSelected, onClick, ...restButtonProps }: TabMenuButtonProps) {
  return (
    <Button
      {...restButtonProps}
      className={`flex-col-center w-[3.125rem] gap-1.5 ${isSelected && 'text-black-01'}`}
      onClick={onClick}
    >
      {tabName}
      <div className={`ml-px h-0.5 w-12 bg-black-01 ${!isSelected && 'hidden'}`} />
    </Button>
  );
}
