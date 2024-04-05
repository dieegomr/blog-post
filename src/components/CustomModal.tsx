import Modal from 'react-modal';
import CloseIcon from './CloseIcon';
import CommentsForm from './CommentsForm';

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
  customWidth = '40vw',
  customHeight = '50vh',
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
        <div className="sticky top-0 bg-white h-16 overflow-hidden pt-3 pl-5 ">
          <div className="flex justify-between pr-8">
            <h1 className="font-bold text-2xl">{title}</h1>
            <button onClick={() => closeModal()}>
              <CloseIcon />
            </button>
          </div>
        </div>
        {children}
        {footer && (
          <footer className="sticky bottom-0 bg-white h-56 overflow-hidden">
            {footer}
          </footer>
        )}
      </div>
    </Modal>
  );
}
