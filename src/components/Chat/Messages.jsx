import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import selectors from '../../slices/selectors.js';

const Messages = () => {
  const channel = useSelector(selectors.selectActiveChannel);
  const messages = useSelector(selectors.selectActiveChannelMessages);
  const { t } = useTranslation();

  const messagesBottomRef = useRef(null);
  useEffect(() => {
    messagesBottomRef.current.scrollIntoView();
  }, [channel, messages]);

  const renderChannelInfo = () => {
    if (!channel) {
      return null;
    }
    return (
      <div className="bg-light mb-3 px-4 py-2 shadow-sm">
        <p className="m-0">{channel.name}</p>
        <span className="small text-muted">
          {t('chatPage.messagesCount.key', { count: messages.length })}
        </span>
      </div>
    );
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <div className="h-100 d-flex align-items-center justify-content-center">
          <span className="small text-muted">{t('chatPage.empty')}</span>
        </div>
      );
    }
    return (
      messages.map((message) => (
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
