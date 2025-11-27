import { Button } from "@/common/ui/actions/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/ui/overlay/dropdown-menu";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useState } from "react";

export const EmojiSelector = () => {
  const { profile, updateProfileMutation } = useProfile();
  const [selectedEmoji, setSelectedEmoji] = useState(
    profile?.statusEmoji ?? "😀",
  );

  const emojis = ["😀", "😂", "😍", "🤔", "😎", "👍", "🎉", "🚀"];

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    updateProfileMutation.mutate({ statusEmoji: emoji });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <div className="text-4xl">{selectedEmoji}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-32 p-2">
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
