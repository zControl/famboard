interface ColumnTitleProps {
  title: string;
}

// This component might not be necessary...standby.
export const ColumnTitle = ({ title }: ColumnTitleProps) => {
  return <span>{title}</span>;
};
