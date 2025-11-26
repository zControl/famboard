export interface Option {
  value: string;
  label: React.ReactNode;
}

export interface DetailListItemProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  value?: React.ReactNode;
  units?: React.ReactNode;
  media?: React.ReactNode;
}