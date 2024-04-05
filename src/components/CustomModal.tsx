import Modal from 'react-modal';
import CloseIcon from './CloseIcon';

type CustomModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  customWidth?: string;
  customHeight?: string;
  title: string;
  footer?: React.ReactNode;
};

export default function CustomModal({
  isModalOpen,
  closeModal,
  children,
  title,
  customWidth = '60%',
  customHeight = '25rem',
  footer = null,
}: CustomModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      style={{
        content: {
          height: customHeight,
          width: customWidth,
          margin: 'auto',
          padding: 0,
          backgroundColor: '#F5F5F5',
        },
      }}
    >
      <div className="flex-col">
        <div className="sticky top-0 bg-white h-16 overflow-hidden pt-3 pl-5 shadow-sm">
          <div className="flex justify-between pr-8">
            <h1 className="font-bold text-2xl rounded-md">{title}</h1>
            <button
              className="hover:bg-slate-200 p-1"
              onClick={() => closeModal()}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        {children}
        {footer && (
          <footer className="sticky bottom-0 h-56 overflow-hidden">
            {footer}
          </footer>
        )}
      </div>
    </Modal>
  );
}
