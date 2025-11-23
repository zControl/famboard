import { Button } from "@/common/ui/actions/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/ui/surfaces/card";
import { UserAvatarSelector } from "@/features/user/components/UserAvatarSelector";
import { useProfile } from "@/features/user/hooks/useProfile";
import { UserProfile } from "@/features/user/types";
import React from "react";

export const UserAvatarCard = () => {
  const { profile, updateProfileMutation } = useProfile();
  const [avatar, setAvatar] = React.useState<string | null>(
    profile?.avatarUrl ?? null,
  );
  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    if (profile?.avatarUrl) {
      setAvatar(profile.avatarUrl);
    }
  }, [profile]);

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    updateProfileMutation.mutate(updatedData);
    setIsDirty(false);
  };

  const handleSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar);
    setIsDirty(true);
  };

  const handleCancel = () => {
    setAvatar(profile?.avatarUrl ?? null);
    setIsDirty(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle>Choose your avatar</CardTitle>
          <CardDescription>You can change this any time!</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={!isDirty}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleUpdateProfile({ avatarUrl: avatar ?? undefined })
            }
            disabled={!isDirty}
          >
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col justify-center items-center gap-4 pt-6">
          <CardTitle>Selected Avatar</CardTitle>
          {avatar ? (
            <div className="flex flex-col justify-center items-center gap-4">
              <img
                className="w-64 h-64 rounded-full"
                src={avatar}
                alt="Selected Avatar"
              />
            </div>
          ) : (
            <p>No avatar selected</p>
          )}
        </div>
        <UserAvatarSelector onSelect={handleSelect} />
      </CardContent>
    </Card>
  );
};
