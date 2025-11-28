import { Button } from "@/common/ui/actions/button";
import { Input } from "@/common/ui/fields/input";
import { EmojiSelector } from "@/common/ui/overlay/EmojiSelector";
import { Paragraph } from "@/common/ui/typography/typography";
import { useProfile } from "@/features/user/hooks/useProfile";
import { UserProfile } from "@/features/user/types";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const UserSheetStatus = () => {
  const { profile, updateProfileMutation } = useProfile();
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
      updateProfileMutation.mutate(updatedData);
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
          <div className="flex items-center ml-2 space-x-1">
            <Button
              variant={"primary"}
              size={"icon"}
              onClick={() => handleStatusSave({ status: status })}
            >
              <CheckIcon />
            </Button>
            <Button variant={"warning"} size={"icon"} onClick={handleClose}>
              <XIcon />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Paragraph className="text-center underline">Status</Paragraph>
          <div className="flex items-center cursor-pointer px-2 py-4 hover:bg-accent">
            <EmojiSelector />
            <div className="ml-4" onClick={() => setChanged(!changed)}>
              <div className="text-lg">{profile?.status}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
