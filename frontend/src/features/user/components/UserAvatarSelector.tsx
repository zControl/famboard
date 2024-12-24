import React from "react";

const avatars = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
];

interface AvatarSelectorProps {
  onSelect: (avatar: string) => void;
}

export const UserAvatarSelector = ({ onSelect }: AvatarSelectorProps) => {
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    null,
  );
  const handleSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 mx-auto px-8">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className="relative cursor-pointer mx-auto"
          onClick={() => handleSelect(avatar)}
        >
          <img
            src={avatar}
            alt="Avatar"
            className={`w-16 h-16 rounded-full ${
              selectedAvatar === avatar
                ? "ring-4 ring-offset-2 ring-offset-card-foreground ring-highlight"
                : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};
