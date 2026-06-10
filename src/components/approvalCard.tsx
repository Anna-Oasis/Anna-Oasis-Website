import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const badgeStatus = {
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected",
} as const;

export type BadgeStatus = keyof typeof badgeStatus;
export type BadgeStatusValue = (typeof badgeStatus)[BadgeStatus];

type ApprovalCardProps = {
  title: string;
  subTitle: string;
  onApprove?: () => void;
  onDecline?: () => void;
  badge?: BadgeStatusValue;
  data?: Record<string, any>;
  DeclineButtonTitle?: string;
};

const formatKey = (key: string): string => {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Helper function to check if a key likely contains an image attachment string
const isImageKey = (key: string, value: any): boolean => {
  if (typeof value !== "string") return false;
  const lowerKey = key.toLowerCase();
  return (
    lowerKey.includes("image") ||
    lowerKey.includes("pic") ||
    lowerKey.includes("photo") ||
    lowerKey.includes("url") ||
    value.match(/\.(jpeg|jpg|gif|png|webp)/i) !== null
  );
};

const ApprovalCard: React.FC<ApprovalCardProps> = ({
  title,
  subTitle,
  onApprove,
  onDecline,
  badge,
  data,
  DeclineButtonTitle = "Decline", // Fallback text alignment
}) => {
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (badge === badgeStatus.Pending && badgeRef.current) {
      badgeRef.current.classList.add("animate-pulse");
    } else if (badgeRef.current) {
      badgeRef.current.classList.remove("animate-pulse");
    }
  }, [badge]);

  const getBadgeClass = (): string => {
    switch (badge) {
      case badgeStatus.Approved:
        return "bg-green-600 text-white";
      case badgeStatus.Rejected:
        return "bg-red-600 text-white";
      case badgeStatus.Pending:
      default:
        return "bg-orange-500 text-white";
    }
  };

  // Safe image discovery selector to preview an image on the root card face
  const foundImageField = data
    ? Object.entries(data).find(([k, v]) => isImageKey(k, v))
    : null;
  const rootPreviewImage = foundImageField
    ? (foundImageField[1] as string)
    : null;

  return (
    <div className="my-3">
      {/* Outer Card Shell Box container updated to support light/dark modes */}
      <div className="rounded-lg bg-card text-card-foreground p-6 border border-border shadow-sm hover:shadow transition-shadow">
        <div className="flex flex-col sm:flex-row gap-5 items-start justify-between">
          {/* Main info row content layout */}
          <div className="flex gap-4 items-start w-full sm:w-auto">
            {rootPreviewImage && (
              <div className="w-14 h-14 rounded-md overflow-hidden bg-secondary border border-border flex-shrink-0">
                <img
                  src={rootPreviewImage}
                  alt="Student Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="text-sm font-medium text-muted-foreground italic">
                {subTitle}
              </p>
            </div>
          </div>

          {/* Badge Label Status pill rendering layout */}
          {badge && (
            <div
              ref={badgeRef}
              className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getBadgeClass()}`}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Action Trigger Buttons section layout container */}
        <div className="flex justify-end mt-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View details
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl bg-card text-card-foreground border border-border heavy-scrollbar">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                  Verification Profile Data
                </DialogTitle>
              </DialogHeader>

              {/* Dynamic Property Key list items maps layout */}
              <div className="mt-4 space-y-4">
                {data &&
                  Object.entries(data).map(([key, value]) => {
                    const isImg = isImageKey(key, value);
                    return (
                      <div
                        key={key}
                        className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3 border border-border/60"
                      >
                        <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                          {formatKey(key)}
                        </p>

                        <div className="mt-1.5 text-foreground text-sm font-medium">
                          {isImg ? (
                            <div className="mt-2 max-w-full rounded-md overflow-hidden bg-background border border-border group relative">
                              <img
                                src={value as string}
                                alt={formatKey(key)}
                                className="max-h-72 w-auto mx-auto object-contain p-1"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                              <a
                                href={value as string}
                                target="_blank"
                                rel="noreferrer"
                                className="block text-center text-xs text-primary underline mt-2 py-1 bg-muted/40 hover:bg-muted"
                              >
                                Open full size image in new window &rarr;
                              </a>
                            </div>
                          ) : (
                            <p className="break-all whitespace-pre-wrap">
                              {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Footer Confirmation Action row drawer setup */}
              <DialogFooter className="mt-6 flex flex-row justify-end gap-3 w-full">
                {onDecline && (
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="bg-destructive text-destructive-foreground hover:opacity-90"
                      onClick={onDecline}
                    >
                      {DeclineButtonTitle}
                    </Button>
                  </DialogClose>
                )}

                {onApprove && (
                  <DialogClose asChild>
                    <Button
                      variant="default"
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={onApprove}
                    >
                      Approve
                    </Button>
                  </DialogClose>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ApprovalCard;
