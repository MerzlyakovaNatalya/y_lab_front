import React, { memo } from 'react'
import DOMPurify from 'dompurify'
import { cn as bem } from '@bem-react/classname'
import { IChat } from '@src/store/chat/types'
import Img from '../../assets/images/avatar.png'
import ChatButton from './chat-button'
import MessageCheck from './message-check'
import getTimeFromDate from '@src/utils/time-from-date'
import './style.css'

interface IChatLayout {
  onMessage: () => void
  onLastMessage: () => void
  onNewMessage: () => void
  clearChat: () => void
  textarea: () => React.ReactNode
  font: () => React.ReactNode
  setFontOpen: React.Dispatch<React.SetStateAction<boolean>>
  messages: IChat[]
  name: string
  statusClearChat: boolean
  isfontOpen: boolean
  connected: boolean
}

const ChatLayout = React.forwardRef<HTMLDivElement, IChatLayout>((props, ref) => {
  const {
    onMessage,
    onLastMessage,
    onNewMessage,
    clearChat,
    textarea,
    font,
    setFontOpen,
    connected,
    isfontOpen,
    messages,
    name,
    statusClearChat,
  } = props
  const cn = bem('Chat')

  return (
    <div className={cn()}>
      {statusClearChat && <p className={cn('title')}>Сообщения удалены</p>}
      {messages.length < 1 && <p className={cn('title')}>Время ожидания сообщений</p>}
      {messages?.map(item => (
        <div
          className={cn('wrap-message', { right: item.author.username === name })}
          key={item._id}
          ref={ref}
        >
          <div className={cn('message')}>
            <img className={cn('img')} src={Img} alt="Avatar"></img>
            <p className={cn('time')}>{getTimeFromDate(item.dateCreate)}</p>
            <p className={cn('name')}>{item.author.username}</p>
            <div
              className={cn('text')}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
            />
            <MessageCheck />
          </div>
        </div>
      ))}
      <div className={cn('input')}>
        <button className={cn('font')} onClick={() => setFontOpen(prev => !prev)}>
          шрифт
        </button>
        {isfontOpen && font()}
        {textarea()}
        <div>
          {connected && (
            <button className={cn('button')} onClick={onMessage}>
              Отправить
            </button>
          )}
        </div>
      </div>
      <ChatButton onLastMessage={onLastMessage} clearChat={clearChat} onNewMessage={onNewMessage} />
    </div>
  )
})

export default memo(ChatLayout)
