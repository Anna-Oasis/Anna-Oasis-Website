import React, { useEffect, useRef } from 'react';
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
  Pending: 'Pending',
  Approved: 'Approved',
  Rejected: 'Rejected',
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
};

const formatKey = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const ApprovalCard: React.FC<ApprovalCardProps> = ({
  title,
  subTitle,
  onApprove,
  onDecline,
  badge,
  data,
}) => {
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (badge === badgeStatus.Pending && badgeRef.current) {
      badgeRef.current.classList.add('animate-pulse');
    }
  }, [badge]);

  const getBadgeClass = (): string => {
    switch (badge) {
      case badgeStatus.Approved:
        return 'bg-green-500';
      case badgeStatus.Rejected:
        return 'bg-red-500';
      case badgeStatus.Pending:
      default:
        return 'bg-orange-500';
    }
  };

  return (
    <div className="m-4">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-semibold text-black w-3/4">{title}</h2>

          {badge && (
            <div
              ref={badgeRef}
              className={`px-4 py-1 rounded-full text-white text-sm ${getBadgeClass()}`}
            >
              {badge}
            </div>
          )}
        </div>

        <p className="text-base font-medium text-black italic mt-1">{subTitle}</p>

        <div className="flex justify-end mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">View more</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl">Details</DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                {data &&
                  Object.entries(data).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-100 rounded-lg px-4 py-3"
                    >
                      <p className="font-semibold text-black">{formatKey(key)}</p>
                      <p className="text-gray-800 mt-1 text-sm">
                        {typeof value === 'string' ? value : JSON.stringify(value)}
                      </p>
                    </div>
                  ))}
              </div>

              <DialogFooter className="mt-6 flex justify-evenly">
                {onApprove && (
                  <DialogClose asChild>
                    <Button
                      variant="default"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={onApprove}
                    >
                      Approve
                    </Button>
                  </DialogClose>
                )}

                {onDecline && (
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={onDecline}
                    >
                      Decline
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
