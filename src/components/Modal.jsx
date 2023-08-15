import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function Modal({ isOpen, close, children }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full transform min-h-screen overflow-hidden bg-white dark:bg-stone-900 text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  close: () => {},
  children: Fragment,
};
