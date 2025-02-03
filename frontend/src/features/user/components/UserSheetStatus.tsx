import { EmojiSelector } from "@/components/common/EmojiSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/features/user/hooks/useProfile";
import { UserProfile } from "@/types/user";
import { useEffect, useState } from "react";

export const UserSheetStatus = () => {
  const { profile, updateProfile } = useProfile();
  const [status, setStatus] = useState(profile?.status ?? "");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setStatus(profile?.status ?? "");
  }, [profile?.status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setChanged(newStatus !== profile?.status);
  };

  const handleStatusSave = (updatedData: Partial<UserProfile>) => {
    if (profile?.userId) {
      updateProfile.mutate(updatedData);
      setChanged(false);
    } else {
      console.error("User ID is missing");
    }
  };

  const handleClose = () => {
    setStatus(profile?.status ?? "");
    setChanged(false);
  };

  return (
    <div>
      {changed ? (
        <div className="flex flex-row items-center">
          <Input
            type="text"
            value={status}
            placeholder={profile?.status}
            className="w-full my-2"
            onChange={handleStatusChange}
          />
          <Button onClick={() => handleStatusSave({ status: status })}>
            C
          </Button>
          <Button onClick={handleClose}>X</Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2 my-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setChanged(!changed)}
            >
              <EmojiSelector />
              <div>{profile?.status}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
