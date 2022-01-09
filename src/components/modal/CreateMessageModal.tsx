import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import { selectTab, setTab } from '@/redux/slices/appSlice';
import {
  closeModal,
  reset,
  selectImgType,
  selectImgUrl,
  selectIsOpen,
  selectPostMessage,
  setMessage,
} from '@/redux/slices/postMessageSlice';
import { useGetPostsByProfileIdQuery, useSendMessageMutation } from '@/services/profile';
import { CreatePostPayload } from '@/typings/posts';

import { Button } from '../Button';
import TenorSearch from '../tenor/TenorSearch';

const CreateMessageModal: React.FC = () => {
  const imageUrl = useSelector(selectImgUrl);
  const tab = useSelector(selectTab);
  const isOpen = useSelector(selectIsOpen);

  const dispatch = useDispatch();
  const handleOpenGif = () => {
    if (tab === '') {
      dispatch(setTab('gif'));
    } else {
      dispatch(setTab(''));
    }
  };

  const handleCloseTab = () => {
    dispatch(setTab(''));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return isOpen ? (
    <div
      style={{ width: '100vw', height: typeof window !== 'undefined' ? window.innerHeight : '100w' }}
      className="fixed bottom-0 top-0 left-0 bg-white p-4"
    >
      <section id="top-head" className="flex justify-between mb-10">
        <button type="button" onClick={handleClose}>
          <FiX />
        </button>
        <ButtonSendMessage />

        <div className="fixed bottom-0 left-0 bg-white border-t w-full">
          <button className="px-6 py-4" onClick={handleOpenGif} type="button">
            <AiOutlineGif className="h-6 w-6" />
          </button>
          {tab === 'gif' && <TenorSearch />}
        </div>
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
          <TextArea onFocus={handleCloseTab} />
          {imageUrl && <img src={imageUrl} alt="gif" />}
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};

const TextArea: React.FC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, any>> = (props) => {
  const message = useSelector(selectPostMessage);
  const dispatch = useDispatch();
  const handleChangeText = (e: any) => {
    dispatch(setMessage(e.target.value));
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);
  return (
    <textarea
      {...props}
      ref={textareaRef}
      className="w-full focus:ring-0 focus:stroke-0 focus:outline-none mb-6"
      value={message}
      onChange={handleChangeText}
      placeholder="Tulis pesan rahasia mu disini..."
    />
  );
};

const ButtonSendMessage: React.FC = () => {
  const [create] = useSendMessageMutation();
  const imageUrl = useSelector(selectImgUrl);
  const imageType = useSelector(selectImgType);
  const message = useSelector(selectPostMessage);
  const router = useRouter();
  const dispatch = useDispatch();
  const { refetch } = useGetPostsByProfileIdQuery('ei45m4AqaNHdXS6Qy7WN');

  const handleSend = async () => {
    const payload: CreatePostPayload = {
      image: {
        type: imageType,
        url: imageUrl,
      },
      message,
      profileId: 'ei45m4AqaNHdXS6Qy7WN',
    };

    await create(payload);
    router.push('/');
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
