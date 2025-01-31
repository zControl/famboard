interface ColumnTitleProps {
  title: string;
}

export const ColumnTitle = ({ title }: ColumnTitleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{title}</span>
    </div>
  );
};
