export interface Option {
  value: string;
  label: React.ReactNode;
}

export interface DetailListItemProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  units?: React.ReactNode;
  icon?: React.ReactNode;
}