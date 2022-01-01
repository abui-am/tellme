import dayjs from 'dayjs';
import React from 'react';
import { AiOutlineGif } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

import { Button } from '../Button';
import Modal, { ModalProps } from './Modal';

const CreateMessageModal: React.FC<ModalProps> = ({ ...props }) => {
  return (
    <div
      style={{ width: '100vw', height: typeof window !== 'undefined' ? window.innerHeight : '100w' }}
      className="fixed bottom-0 top-0 left-0 bg-white p-4"
    >
      <section id="top-head" className="flex justify-between mb-10">
        <button type="button" onClick={props.onRequestClose}>
          <FiX />
        </button>
        <Button className="w-max">Kirim Pesan</Button>

        <div className="fixed bottom-0 left-0 bg-white border-t w-full">
          <button className="px-6 py-4">
            <AiOutlineGif className="h-6 w-6" />
          </button>
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
          <textarea className="w-full focus:ring-0 focus:stroke-0 focus:outline-none" placeholder="test" />
        </div>
      </div>
    </div>
  );
};

export default CreateMessageModal;
