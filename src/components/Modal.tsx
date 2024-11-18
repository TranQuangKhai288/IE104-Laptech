import { ReactElement, FC } from "react";
import { FaWindowClose } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  title: string;
}

export default function Modal(props: ModalProps): ReturnType<FC> {
  if (!props.isOpen) return null;
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg px-2 w-full max-w-[30vw] max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 flex flex-row justify-between bg-white h-20 px-4">
          <div className="flex items-center justify-center">
            <h2 className="font-bold text-center text-lg">{props.title}</h2>
          </div>
          <button onClick={props.onClose} className="text-red-500">
            <FaWindowClose className="text-2xl"/>
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}
