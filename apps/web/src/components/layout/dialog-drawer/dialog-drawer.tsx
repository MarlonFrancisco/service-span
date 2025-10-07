'use client';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  useIsMobile,
} from '@repo/ui';
import * as React from 'react';

export function DrawerDialog({
  children,
  trigger,
  classNames,
  title,
  description,
  onTrigger,
  containerRef,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  classNames?: string;
  title?: string;
  description?: string;
  onTrigger?: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={onTrigger}>
            {trigger}
          </Button>
        </DialogTrigger>
        <DialogContent className={classNames} ref={containerRef}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={onTrigger}>
          {trigger}
        </Button>
      </DrawerTrigger>
      <DrawerContent className={classNames} ref={containerRef}>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
