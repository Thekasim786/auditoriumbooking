import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationThread = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage?.trim() && onSendMessage) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="MessageSquare" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Communication Thread
        </h2>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-muted rounded-lg">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message?.sender === 'You' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={message?.avatar}
                    alt={message?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={`flex-1 max-w-[80%] ${message?.sender === 'You' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs md:text-sm font-medium text-foreground">
                    {message?.sender}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message?.timestamp}
                  </span>
                </div>

                <div
                  className={`p-3 md:p-4 rounded-lg ${
                    message?.sender === 'You' ?'bg-primary text-primary-foreground' :'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed">
                    {message?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {messages?.length === 0 && (
            <div className="text-center py-8">
              <Icon
                name="MessageCircle"
                size={48}
                className="text-muted-foreground mx-auto mb-3"
              />
              <p className="text-sm md:text-base text-muted-foreground">
                No messages yet. Start the conversation.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            variant="default"
            iconName="Send"
            onClick={handleSend}
            disabled={!newMessage?.trim()}
            className="flex-shrink-0"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationThread;