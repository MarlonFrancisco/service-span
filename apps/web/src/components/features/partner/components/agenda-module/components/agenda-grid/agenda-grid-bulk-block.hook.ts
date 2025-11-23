import { IBlockedTime } from '@/types/api/blocked-times.types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  TSelectedSlot,
  TSlotId,
  TUseBulkBlockConfig,
  TUseBulkBlockReturn,
} from './agenda-grid-bulk-block.types';

/**
 * Hook-Driven Architecture: Bulk Block Selection Logic
 * Handles drag selection, shift+click range selection, and bulk blocking
 *
 * @param config - Configuration object with isBlockMode and onBulkBlock callback
 * @returns Object with selection state and handlers
 */
export const useAgendaGridBulkBlock = (
  config: TUseBulkBlockConfig,
): TUseBulkBlockReturn => {
  const { isBlockMode, onBulkBlock } = config;

  // Selection state
  const [selectedSlots, setSelectedSlots] = useState<Set<TSlotId>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

  // Refs for drag and shift selection
  const dragStartSlotRef = useRef<TSlotId | null>(null);
  const lastClickedSlotRef = useRef<TSlotId | null>(null);
  const selectedSlotsDataRef = useRef<Map<TSlotId, TSelectedSlot>>(new Map());

  /**
   * Generate unique slot identifier
   */
  const getSlotId = useCallback(
    (professionalId: string, dayIndex: number, time: string): TSlotId => {
      return `${professionalId}-${dayIndex}-${time}`;
    },
    [],
  );

  /**
   * Check if a slot is selected
   */
  const isSlotSelected = useCallback(
    (professionalId: string, dayIndex: number, time: string): boolean => {
      const slotId = getSlotId(professionalId, dayIndex, time);
      return selectedSlots.has(slotId);
    },
    [selectedSlots, getSlotId],
  );

  /**
   * Add slot to selection
   */
  const addSlotToSelection = useCallback(
    (
      blockedTime: IBlockedTime | undefined,
      professionalId: string,
      dayIndex: number,
      time: string,
      date: string,
    ) => {
      const slotId = getSlotId(professionalId, dayIndex, time);

      setSelectedSlots((prev) => {
        const next = new Set(prev);
        next.add(slotId);
        return next;
      });

      selectedSlotsDataRef.current.set(slotId, {
        id: blockedTime?.id,
        professionalId,
        dayIndex,
        time,
        date,
        isBlocked: blockedTime ? true : false,
      });
    },
    [getSlotId],
  );

  /**
   * Remove slot from selection
   */
  const removeSlotFromSelection = useCallback(
    (professionalId: string, dayIndex: number, time: string) => {
      const slotId = getSlotId(professionalId, dayIndex, time);

      setSelectedSlots((prev) => {
        const next = new Set(prev);
        next.delete(slotId);
        return next;
      });

      selectedSlotsDataRef.current.delete(slotId);
    },
    [getSlotId],
  );

  /**
   * Handle mouse down - Start drag selection
   */
  const handleSlotMouseDown = useCallback(
    (
      blockedTime: IBlockedTime | undefined,
      professionalId: string,
      dayIndex: number,
      time: string,
      date: string,
    ) => {
      if (!isBlockMode) return;

      const slotId = getSlotId(professionalId, dayIndex, time);

      setIsDragging(true);
      dragStartSlotRef.current = slotId;
      lastClickedSlotRef.current = slotId;

      // Toggle selection on mouse down
      if (selectedSlots.has(slotId)) {
        removeSlotFromSelection(professionalId, dayIndex, time);
      } else {
        addSlotToSelection(blockedTime, professionalId, dayIndex, time, date);
      }
    },
    [
      isBlockMode,
      selectedSlots,
      getSlotId,
      addSlotToSelection,
      removeSlotFromSelection,
    ],
  );

  /**
   * Handle mouse enter - Continue drag selection
   */
  const handleSlotMouseEnter = useCallback(
    (
      blockedTime: IBlockedTime | undefined,
      professionalId: string,
      dayIndex: number,
      time: string,
      date: string,
    ) => {
      if (!isBlockMode || !isDragging) return;

      const slotId = getSlotId(professionalId, dayIndex, time);

      // Add to selection during drag
      if (!selectedSlots.has(slotId)) {
        addSlotToSelection(blockedTime, professionalId, dayIndex, time, date);
      }
    },
    [isBlockMode, isDragging, selectedSlots, getSlotId, addSlotToSelection],
  );

  /**
   * Handle mouse up - End drag selection
   */
  const handleSlotMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartSlotRef.current = null;
  }, []);

  /**
   * Clear all selections
   */
  const clearSelection = useCallback(() => {
    setSelectedSlots(new Set());
    selectedSlotsDataRef.current.clear();
    lastClickedSlotRef.current = null;
    dragStartSlotRef.current = null;
  }, []);

  /**
   * Execute bulk block action
   */
  const executeBlockAction = useCallback(() => {
    const slotsArray = Array.from(selectedSlotsDataRef.current.values());

    if (slotsArray.length > 0) {
      onBulkBlock(slotsArray);
      clearSelection();
    }
  }, [onBulkBlock, clearSelection]);

  /**
   * Convert selected slots to array for display
   */
  const selectedSlotsArray = useMemo(() => {
    return Array.from(selectedSlotsDataRef.current.values());
  }, [selectedSlots]); // Re-compute when selectedSlots changes

  /**
   * Clear selection when block mode is disabled
   */
  useEffect(() => {
    if (!isBlockMode) {
      clearSelection();
    }
  }, [isBlockMode, clearSelection]);

  /**
   * Add global mouse up listener to handle drag end outside grid
   */
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleSlotMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, handleSlotMouseUp]);

  return {
    selectedSlots,
    isDragging,
    isSlotSelected,
    handleSlotMouseDown,
    handleSlotMouseEnter,
    handleSlotMouseUp,
    clearSelection,
    executeBlockAction,
    selectedSlotsArray,
    removeSlotFromSelection,
  };
};
