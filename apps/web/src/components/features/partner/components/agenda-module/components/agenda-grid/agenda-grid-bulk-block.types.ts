/**
 * ANCR-FA Types for Bulk Block Selection
 * Represents a unique time slot identifier
 */
export type TSlotId = `${string}-${number}-${string}`; // professionalId-dayIndex-time

/**
 * Slot selection data
 */
export type TSelectedSlot = {
  professionalId: string;
  dayIndex: number;
  time: string;
  date: string;
};

/**
 * Bulk block hook configuration
 */
export type TUseBulkBlockConfig = {
  isBlockMode: boolean;
  onBulkBlock: (slots: TSelectedSlot[]) => void;
};

/**
 * Bulk block hook return type
 */
export type TUseBulkBlockReturn = {
  selectedSlots: Set<TSlotId>;
  isDragging: boolean;
  isSlotSelected: (professionalId: string, dayIndex: number, time: string) => boolean;
  handleSlotMouseDown: (professionalId: string, dayIndex: number, time: string, date: string, isBlocked: boolean) => void;
  handleSlotMouseEnter: (professionalId: string, dayIndex: number, time: string, date: string, isBlocked: boolean) => void;
  handleSlotMouseUp: () => void;
  handleShiftClick: (professionalId: string, dayIndex: number, time: string, date: string, isBlocked: boolean) => void;
  clearSelection: () => void;
  executeBlockAction: () => void;
  selectedSlotsArray: TSelectedSlot[];
  removeSlotFromSelection: (professionalId: string, dayIndex: number, time: string) => void;
};

/**
 * Bulk action toolbar configuration
 */
export type TBulkActionToolbarConfig = {
  selectedCount: number;
  onBlock: () => void;
  onClear: () => void;
};
