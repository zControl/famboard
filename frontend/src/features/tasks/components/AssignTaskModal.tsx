import { ActionModal } from "@/components/composites/ActionModal";
import { Task } from "@/types/task";
import { Row } from "@tanstack/react-table";

interface AssignTaskModalProps {
  row: Row<Task>;
  open: boolean;
}
export const AssignTaskModal = ({ row, open }: AssignTaskModalProps) => {
  const handleAssignTask = () => {
    console.log("Assigning task");
    // mutation here
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <ActionModal
      open={open}
      trigger="Assign"
      title="Are you sure you want to assign this task?"
      description="This will assign the task to the selected users."
      onCancel={handleCancel}
      onConfirm={handleAssignTask}
    >
      <p>Hello Assign Users Modal for {row.original.title}</p>
    </ActionModal>
  );
};
