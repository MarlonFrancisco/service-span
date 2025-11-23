export type TCancelReactivateDialogConfig = {
  isOpen: boolean;
  planName: string;
  cancelAtPeriodEnd: boolean;
  nextBillingDate?: Date;
  isCanceling: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};
