import React from "react";

const avatars = [
  "/avatars/avatar-1.jpg",
  "/avatars/avatar-2.jpg",
  "/avatars/avatar-3.jpg",
  "/avatars/avatar-4.jpg",
  "/avatars/avatar-5.jpg",
  "/avatars/avatar-6.jpg",
  "/avatars/avatar-7.jpg",
  "/avatars/avatar-8.jpg",
  "/avatars/avatar-9.jpg",
  "/avatars/avatar-10.jpg",
  "/avatars/avatar-11.jpg",
  "/avatars/avatar-12.jpg",
  "/avatars/avatar-13.jpg",
  "/avatars/avatar-14.jpg",
  "/avatars/avatar-15.jpg",
  "/avatars/avatar-16.jpg",
  "/avatars/avatar-17.jpg",
  "/avatars/avatar-18.jpg",
  "/avatars/avatar-19.jpg",
  "/avatars/avatar-20.jpg",
  "/avatars/avatar-21.jpg",
  "/avatars/avatar-22.jpg",
  "/avatars/avatar-23.jpg",
  "/avatars/avatar-24.jpg",
  "/avatars/avatar-25.jpg",
  "/avatars/avatar-26.jpg",
  "/avatars/avatar-27.jpg",
  "/avatars/avatar-28.jpg",
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
    <div className="grid grid-cols-4 gap-y-4 mx-auto px-4 md:gap-y-6 md:px-8">
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
