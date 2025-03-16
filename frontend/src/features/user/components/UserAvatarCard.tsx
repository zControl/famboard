import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatarSelector } from "@/features/user/components/UserAvatarSelector";
import { useProfile } from "@/features/user/hooks/useProfile";
import { UserProfile } from "@/types/user";
import React from "react";

export const UserAvatarCard = () => {
  const { profile, updateProfile } = useProfile();
  const [avatar, setAvatar] = React.useState<string | null>(
    profile?.avatarUrl ?? null,
  );

  React.useEffect(() => {
    if (profile?.avatarUrl) {
      setAvatar(profile.avatarUrl);
    }
  }, [profile]);

  const handleUpdateProfile = (updatedData: Partial<UserProfile>) => {
    updateProfile.mutate(updatedData);
  };

  const handleSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose your avatar</CardTitle>
        <CardDescription>You can change this any time!</CardDescription>
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
              <Button
                onClick={() => handleUpdateProfile({ avatarUrl: avatar })}
              >
                Save
              </Button>
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
