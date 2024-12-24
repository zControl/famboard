import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatarSelector } from "@/features/user/components/UserAvatarSelector";
import React from "react";

export const UserAvatarCard = () => {
  const [avatar, setAvatar] = React.useState<string | null>(null);

  const saveAvatar = (avatar: string) => {
    // TODO: save avatar to backend
    console.log("Avatar saved:", avatar);
  };

  const handleSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar);
    console.log("Selected avatar:", selectedAvatar);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose your avatar</CardTitle>
        <CardDescription>You can change this any time!</CardDescription>
      </CardHeader>
      <CardContent>
        <UserAvatarSelector onSelect={handleSelect} />
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col justify-center items-center gap-4 pt-6">
          <CardTitle>Selected Avatar</CardTitle>
          {avatar ? (
            <div className="flex flex-col justify-center items-center gap-4">
              <img
                className="w-64 h-64 rounded-full"
                src={avatar}
                alt="Selected Avatar"
              />
              <Button onClick={() => saveAvatar(avatar)}>Save</Button>
            </div>
          ) : (
            <p>No avatar selected</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
