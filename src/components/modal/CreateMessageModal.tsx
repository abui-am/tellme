import dayjs from 'dayjs';
import { IEmojiPickerProps } from 'emoji-picker-react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { FiSmile, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import EmojiPicker from '@/components/emoji/EmojiSearch';
import { closeTabWithException, selectTab, setTab } from '@/redux/slices/appSlice';
import {
  closeModal,
  reset,
  selectImgType,
  selectImgUrl,
  selectIsOpen,
  selectPostMessage,
  setMessage,
} from '@/redux/slices/postMessageSlice';
import { useGetPostsByProfileIdQuery, useGetProfileByUsernameQuery, useSendMessageMutation } from '@/services/profile';
import { CreatePostPayload } from '@/typings/posts';

import { Button } from '../Button';
import TenorSearch from '../tenor/TenorSearch';

const CreateMessageModal: React.FC = () => {
  const imageUrl = useSelector(selectImgUrl);
  const [cursorPos, setCursorPos] = useState<number | null>(null);

  const isOpen = useSelector(selectIsOpen);
  const message = useSelector(selectPostMessage);
  const dispatch = useDispatch();

  const handleCloseTab = () => {
    setCursorPos(null);
    dispatch(closeTabWithException());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const textAreaRef = useRef<any>();

  return isOpen ? (
    <div
      style={{ width: '100vw', height: typeof window !== 'undefined' ? window.innerHeight : '100w' }}
      className="fixed bottom-0 top-0 left-0 bg-white p-4 z-10"
    >
      <section id="top-head" className="flex justify-between mb-10">
        <button type="button" onClick={handleClose}>
          <FiX />
        </button>
        <ButtonSendMessage />
        <EmojiAndGifPicker
          onEmojiClick={(e, emojiObject) => {
            if (cursorPos === null) {
              const currCursorPos: number = textAreaRef.current.selectionStart;
              const text1 = message.slice(0, currCursorPos);
              const text2 = message.slice(currCursorPos);

              dispatch(setMessage(`${text1}${emojiObject.emoji}${text2}`));
              setCursorPos(currCursorPos + emojiObject.emoji.length);
            } else {
              const text1 = message.slice(0, cursorPos);
              const text2 = message.slice(cursorPos);
              dispatch(setMessage(`${text1}${emojiObject.emoji}${text2}`));
              setCursorPos((cursorPos) => (cursorPos ?? 0) + emojiObject.emoji.length);
            }
          }}
        />
      </section>
      <div>
        <div>
          <div className="flex pt-4 pb-2">
            <div className="flex flex-col justify-center items-center mr-5 w-12">
              <img src="SVG/anonim.svg" alt="anonim" className="bg-gray-400 h-12 w-12 rounded-full border-white" />
            </div>
            <div className="pb-2 flex-1">
              <label className="font-bold text-lg text-gray-800">Anonim</label>
              <p className="text-sm text-gray-500">{dayjs().format('DD MMMM YYYY')}</p>
            </div>
          </div>
          <TextArea onFocus={handleCloseTab} ref={textAreaRef} />
          {imageUrl && <img src={imageUrl} alt="gif" />}
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};

const EmojiAndGifPicker: React.FC<{ onEmojiClick: IEmojiPickerProps['onEmojiClick'] }> = ({ onEmojiClick }) => {
  const dispatch = useDispatch();
  const tab = useSelector(selectTab);
  const handleOpenGif = () => {
    if (tab === '') {
      dispatch(setTab('gif'));
    } else {
      dispatch(setTab(''));
    }
  };
  const handleOpenEmojiPicker = () => {
    if (tab === '') {
      dispatch(setTab('emoji'));
    } else {
      dispatch(setTab(''));
    }
  };

  return (
    <div className="fixed bottom-0 left-0 bg-white border-t w-full">
      <section id="" className="flex">
        <button
          className="px-6 py-4"
          onClick={handleOpenGif}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          type="button"
        >
          <AiOutlineGif className="h-6 w-6" />
        </button>
        <button
          className="px-6 py-4"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={handleOpenEmojiPicker}
          type="button"
        >
          <FiSmile className="h-6 w-6" />
        </button>
      </section>
      {tab === 'gif' && <TenorSearch />}
      {tab === 'emoji' && <EmojiPicker disableSearchBar onEmojiClick={onEmojiClick} />}
    </div>
  );
};

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, any>
>((props, ref) => {
  const message = useSelector(selectPostMessage);
  const dispatch = useDispatch();
  const handleChangeText = (e: any) => {
    dispatch(setMessage(e.target.value));
  };

  const textareaRef = ref ?? useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef != null && typeof textareaRef !== 'function' && textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message, textareaRef]);
  return (
    <textarea
      {...props}
      ref={textareaRef}
      style={{ resize: 'none', minHeight: 200 }}
      className="w-full focus:ring-0 focus:stroke-0 focus:outline-none mb-6"
      value={message}
      onChange={handleChangeText}
      placeholder="Tulis pesan rahasia mu disini..."
    />
  );
});

const ButtonSendMessage: React.FC = () => {
  const [create] = useSendMessageMutation();
  const imageUrl = useSelector(selectImgUrl);
  const imageType = useSelector(selectImgType);
  const message = useSelector(selectPostMessage);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useGetProfileByUsernameQuery(router?.query?.id as string, {
    skip: !router?.query?.id,
  });
  const { refetch } = useGetPostsByProfileIdQuery(data?.uid ?? '', {
    skip: !data?.uid,
  });

  const handleSend = async () => {
    const payload: CreatePostPayload = {
      image: {
        type: imageType,
        url: imageUrl,
      },
      message,
      profileId: data?.uid,
    };

    await create(payload);
    refetch();
    dispatch(reset());
  };

  return (
    <Button className="w-max" onClick={handleSend}>
      Kirim Pesan
    </Button>
  );
};

export default CreateMessageModal;
