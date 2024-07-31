import React, { ReactNode } from "react"
import { Dialog } from "@headlessui/react";
import { useRef } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
  }

export function Modal({ onClose = () => {}, children }: ModalProps) {
  let overlayRef = useRef(null);

  return (
    // <Dialog
    //   static
    //   open={true}
    //   onClose={onClose}
    //   initialFocus={overlayRef}
    //   className="fixed inset-0 z-10 flex items-center justify-center"
    // >
    //   <Dialog.Overlay
    //     ref={overlayRef}
    //     className="fixed inset-0 bg-gray-800/60"
    //   />
    //   <div className="relative flex items-center justify-center w-1/2">
    //     {children}
    //   </div>
    // </Dialog>
    <Dialog
      open={true}
      onClose={onClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-40 flex items-center justify-center"
    >
      <div ref={overlayRef} className="fixed inset-0 bg-gray-900/90" />
      <div className="relative w-full h-full">
        {children}
      </div>
    </Dialog>
  );
}