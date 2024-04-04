import Modal from 'react-modal';
import CloseIcon from './CloseIcon';

type CustomModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  customWidth?: string;
  title: string;
};

export default function CustomModal({
  isModalOpen,
  closeModal,
  children,
  title,
  customWidth = '40vw',
}: CustomModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      style={{
        content: {
          height: '50vh',
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
      </div>
    </Modal>
  );
}
