import AddChannelModal from './addChannel.jsx';
import RenameChannelModal from './renameChannel.jsx';
import RemoveChannelModal from './removeChannel.jsx';

const modals = {
  addChannel: AddChannelModal,
  renameChannel: RenameChannelModal,
  removeChannel: RemoveChannelModal,
};

const getModal = (modalType) => modals[modalType];

export default getModal;
