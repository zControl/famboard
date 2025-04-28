export interface Option {
  value: string;
  label: string;
}

export interface DetailListItemProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  units?: React.ReactNode;
  icon?: React.ReactNode;
}