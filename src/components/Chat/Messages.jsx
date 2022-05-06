import React, { useEffect, useRef } from 'react';

const Messages = ({ props }) => {
  const { activeChannelId, channels, messages, t } = props;
  const activeChannelMessages = messages.filter((message) => message.channelId === activeChannelId);

  const messagesBottomRef = useRef(null);
  useEffect(() => {
    messagesBottomRef.current.scrollIntoView();
  }, [activeChannelId, messages]);

  const renderChannelInfo = () => {
    const currentChannel = channels.find((channel) => channel.id === activeChannelId);
    if (!currentChannel) {
      return null;
    }
    return (
      <div className="bg-light mb-3 px-4 py-2 shadow-sm">
        <p className="m-0">{currentChannel.name}</p>
        <span className="small text-muted">
          {t('messagesCount.key', { count: activeChannelMessages.length })}
        </span>
      </div>
    );
  };

  const renderMessages = () => {
    if (activeChannelMessages.length === 0) {
      return (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <span className="small text-muted">{t('empty')}</span>
        </div>
      );
    }
    return (
      activeChannelMessages.map((message) => (
        <div className="mb-1 text-break" key={message.id}>
          <strong>
            {message.username}
            :&nbsp;
          </strong>
          {message.body}
        </div>
      ))
    );
  };

  return (
    <>
      {renderChannelInfo()}
      <div className="h-100 overflow-auto px-4">
        {renderMessages()}
        <div ref={messagesBottomRef} />
      </div>
    </>
  );
};

export default Messages;
