import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useState } from "react";

export const EmojiSelector = () => {
  const { profile, updateProfile } = useProfile();
  const [selectedEmoji, setSelectedEmoji] = useState(
    profile?.statusEmoji ?? "😀",
  );

  const emojis = ["😀", "😂", "😍", "🤔", "😎", "👍", "🎉", "🚀"];

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    updateProfile.mutate({ statusEmoji: emoji });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {selectedEmoji}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[8rem] p-2">
        <div className="grid grid-cols-4 gap-2">
          {emojis.map((emoji) => (
            <DropdownMenuItem
              key={emoji}
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
