import dayjs from 'dayjs';
import React from 'react';

type Message = {
  id: string;
  name: string;
  message: string;
  dateCreated: Date;
  comments: Comment[];
};

type Comment = {
  id: string;
  name: string;
  message: string;
};

const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className="border-t">
      <div className="px-4">
        <div className="flex pt-4 pb-2">
          <div className="flex flex-col justify-center items-center mr-5 w-12">
            <img src="SVG/anonim.svg" alt="anonim" className="bg-gray-400 h-12 w-12 rounded-full border-white" />
          </div>
          <div className="pb-2 flex-1">
            <label className="font-bold text-lg text-gray-800">{message.name}</label>
            <p className="text-sm text-gray-500">{dayjs(message.dateCreated).format('DD MMMM YYYY')}</p>
          </div>
        </div>
        <div>
          <p className="text-lg text-gray-800">{message.message}</p>
        </div>
      </div>
      <section>
        {message.comments?.map((msg, index) => {
          return (
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
                <label className="font-bold text-gray-800">{msg.name}</label>
                <p className="text-gray-800">{msg.message}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex px-4 -mt-2 pb-3">
        <div className="flex flex-col justify-center items-center mr-3">
          <div className="bg-gray-200 h-5" style={{ width: 2 }} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default MessageCard;