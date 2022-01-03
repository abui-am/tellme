import { useDispatch } from 'react-redux';

import { Button } from '@/components/Button';
import MessageCard from '@/components/card/MessageCard';
import CreateMessageModal from '@/components/modal/CreateMessageModal';
import { openModal } from '@/redux/slices/postMessageSlice';

const MESSAGES = {
  id: Math.random().toString(),
  name: 'Anonim',
  message: 'test',
  dateCreated: new Date(),
  comments: [
    {
      id: Math.random().toString(),
      name: 'Anonim',
      message: 'test',
    },

    {
      id: Math.random().toString(),
      name: 'Anonim',
      message: 'tes 2',
    },
    {
      id: Math.random().toString(),
      name: 'Anonim',
      message: 'test3',
    },
  ],
};
export default function Home() {
  const dispatch = useDispatch();
  const handleClickButton = () => {
    dispatch(openModal());
  };
  return (
    <div>
      <div className="h-72 bg-indigo-500 w-full flex justify-center absolute top-0" style={{ zIndex: -1 }} />

      <section id="main" className="max-w-screen-lg ml-auto mr-auto">
        <section className="w-full flex justify-center z-10">
          <div className="mt-44 flex flex-col items-center bg-white rounded-3xl border mx-4 w-full relative">
            <img
              alt="Profile"
              src="265112957_1028677061247492_6032049044662209224_n.jpg"
              className="w-44 h-44 rounded-full border-4 border-white bg-gray-300 object-cover absolute -translate-y-28"
            />
            <div className="mt-20 flex flex-col items-center">
              <h1 className="mb-2 text-xl font-bold text-gray-800">Abui Abui</h1>
              <span className="mb-8 text-gray-700">Tulis bebas pisan ss</span>
            </div>
          </div>
        </section>
        <section className="px-3 mb-6">
          <Button onClick={handleClickButton} className="mt-6">
            Kirim pesan rahasia
          </Button>
          <CreateMessageModal />
        </section>
        <section className="px-3">
          <h2 className="font-bold mb-4 text-xl text-gray-800">Linimasa</h2>
        </section>
        <section>
          <MessageCard message={MESSAGES} />
          <MessageCard message={MESSAGES} />
        </section>
      </section>

      <footer className="px-3 mt-6 flex justify-center items-center bg-gray-100 text-gray-400 h-12">
        Made with love by Abui
      </footer>
    </div>
  );
}
