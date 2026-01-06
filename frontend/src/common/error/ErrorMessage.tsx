interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="flex flex-row items-center space-x-2 px-4 py-2 border border-dashed border-destructive">
      <div className="text-lg text-destructive">Error: </div>
      <div className="text-sm text-muted-foreground">{message}</div>
    </span>
  );
};
