import AddChannelModalContent from './addChannel.jsx';
import RenameChannelModalContent from './renameChannel.jsx';
import RemoveChannelModalContent from './removeChannel.jsx';

const modalContents = {
  addChannel: AddChannelModalContent,
  renameChannel: RenameChannelModalContent,
  removeChannel: RemoveChannelModalContent,
};

const getModalContent = (modalType) => modalContents[modalType];

export default getModalContent;
