import Modal from 'components/modals/Modal';

interface Props {
  isOpen: boolean;
  onDismiss?: () => void;
  onDelete: () => void;
}

export const ProjectDeleteModal = ({ isOpen, onDismiss, onDelete }: Props) => {
  return (
    <Modal
      title='Delete Project'
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <div className='flex flex-col w-full overflow-y-auto px-8'>
        <p className='text-md font-medium text-gray-700 my-6'>Are you sure you want to delete your project.</p>

        <div className='flex flex-row items-center justify-between mb-6'>
          <button onClick={onDismiss} className='w-5/12 inline-flex items-center justify-center px-4 py-3 transition-all rounded-md text-indigo-600 border border-indigo-600 hover:bg-gray-100 rouned hover:text-gray-700'>
            Cancel
          </button>
          <button onClick={onDelete} className='w-5/12 inline-flex items-center justify-center px-4 py-3 transition-all rounded-md rouned bg-red-600 text-white hover:bg-red-500'>
            Delete
          </button>
        </div>
      </div>
    </Modal >
  );
};
