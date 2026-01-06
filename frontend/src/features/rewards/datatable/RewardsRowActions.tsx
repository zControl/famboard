import { Button } from "@/common/ui/actions/button";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/ui/overlay/dropdown-menu";
import { RewardModal } from "@/features/rewards/components/RewardModal";
import { useRewards } from "@/features/rewards/hooks/useRewards";
import { Reward } from "@/features/rewards/types";
import { Row } from "@tanstack/react-table";
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface RewardsRowActionProps {
  row: Row<Reward>;
}

export const RewardsRowActions = ({ row }: RewardsRowActionProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { deleteRewardMutation } = useRewards();

  const handleEditTask = () => {
    setModalOpen(true);
  };

  const handleDeleteTask = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = (confirmed: boolean) => {
    if (confirmed) {
      deleteRewardMutation.mutate(row.original.id);
    }
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleEditTask}>
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDeleteTask}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isModalOpen && (
        <RewardModal
          modalOpen={isModalOpen}
          onModalOpenChange={setModalOpen}
          existingReward={row.original}
        />
      )}

      <ActionModal
        open={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title={`Delete ${row.original.title} ?`}
        onConfirm={() => handleConfirmDelete(true)}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
