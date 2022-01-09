import clsx from 'clsx';
import React, { useState } from 'react';

import { parseTimeStamp } from '@/helpers/date';
import { useKeyPressEnter } from '@/hooks/useKeyPress';
import { useGetPostsByProfileIdQuery, usePostCommentMutation } from '@/services/profile';
import { Comment, Data } from '@/typings/posts';

type Message = Data | Record<string, any>;

const MessageCard: React.FC<{ message: Message; withNoBorder: boolean }> = ({ withNoBorder, message }) => {
  return (
    <div className={clsx('w-full', withNoBorder ? 'border-t-0' : 'border-t')}>
      <div className="px-4">
        <div className="flex pt-4 pb-2">
          <div className="flex flex-col justify-center items-center mr-5 w-12">
            <img src="SVG/anonim.svg" alt="anonim" className="bg-gray-400 h-12 w-12 rounded-full border-white" />
          </div>
          <div className="pb-2 flex-1">
            <label className="font-bold text-lg text-gray-800">Anonymous</label>
            <p className="text-sm text-gray-500">{parseTimeStamp(message?.createdAt).format('DD MMMM YYYY')}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-lg text-gray-800">{message?.message}</p>
        </div>
        {message.image?.url && (
          <div>
            <img src={message.image?.url} className="w-full rounded-lg" alt={`gif-${message.image?.url}`} />
          </div>
        )}
      </div>
      <section>
        {message?.comments?.map((msg: Comment, index: number) => {
          return (
            // eslint-disable-next-line no-underscore-dangle
            <div className="flex px-4" key={msg.id}>
              <div className="flex flex-col justify-center items-center mr-5 w-12">
                <div className="bg-gray-200 h-4" style={{ width: index === 0 ? 0 : 2 }} />
                <img
                  src="SVG/anonim.svg"
                  alt={`anonim${msg.id}`}
                  className="bg-gray-400 h-12 w-12 rounded-full border-4 border-white"
                />
                <div className="bg-gray-200 flex-1" style={{ width: 2 }} />
              </div>
              <div className="pt-4 pb-2 flex-1">
                <label className="font-bold text-gray-800">{msg.sender.name}</label>
                <p className="text-gray-800">{msg.comment}</p>
              </div>
            </div>
          );
        })}
      </section>
      <CommentInput withDecorator={message.comments.length > 0} postId={message.id} />
    </div>
  );
};

const CommentInput = ({ withDecorator = false, postId = '' }) => {
  const [create] = usePostCommentMutation();
  const [comment, setComment] = useState('');
  const { refetch } = useGetPostsByProfileIdQuery('ei45m4AqaNHdXS6Qy7WN');

  const handleKey = useKeyPressEnter(async () => {
    await create({
      comment,
      postId,
    });
    refetch();
    setComment('');
  });

  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex px-4 -mt-2 pb-3">
      <div className="flex flex-col justify-center items-center mr-3">
        <div className="bg-gray-200 h-5" style={{ width: withDecorator ? 2 : 0 }} />

        <img
          src="SVG/anonim.svg"
          alt="comment-anonim"
          className="bg-gray-400 h-12 w-12 rounded-full border-4 border-white"
        />
      </div>
      <div className="pt-6 pb-2 w-full flex-1">
        <input
          className="rounded-full border w-full px-2"
          style={{ minHeight: 40 }}
          placeholder="Tulis komentar sebagai anonim..."
          onChange={handleChange}
          onKeyPress={handleKey}
        />
      </div>
    </div>
  );
};

export default MessageCard;
