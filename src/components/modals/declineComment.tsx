import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DeclineCommentProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
  title?: string;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

const DeclineComment: React.FC<DeclineCommentProps> = ({
  visible,
  onClose,
  onSubmit,
  title = "Add a comment",
  placeholder = "Enter your comment...",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!visible) setComment("");
  }, [visible]);

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px]"
        />
        <DialogFooter className="flex justify-end gap-2 mt-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={comment.trim().length === 0}
          >
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineComment;
