import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface ModalProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inputValue: string) => void;
}

export default function InviteModal({ role,  isOpen, onClose, onSubmit }: ModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setError("Input is required.");
      return;
    }
    setError("");
    onSubmit(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            leave="ease-in duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                {role === "facilitator" ? "Create a Room" : "Join a Room"}
              </Dialog.Title>

              <div className="mt-4">
                <input
                  type="text"
                  id="input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="m-2 h-[30px] w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Continue
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
