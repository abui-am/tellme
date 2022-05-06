import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/Button';
import MessageCard from '@/components/card/MessageCard';
import CreateMessageModal from '@/components/modal/CreateMessageModal';
import { openModal } from '@/redux/slices/postMessageSlice';
import { useGetPostsByProfileIdQuery, useGetProfileByUsernameQuery } from '@/services/profile';

export default function Home() {
  const dispatch = useDispatch();

  const handleClickButton = () => {
    dispatch(openModal());
  };

  const { query } = useRouter();

  const { data } = useGetProfileByUsernameQuery(query?.id as string, {
    skip: !query?.id,
  });

  const { data: posts, isFetching } = useGetPostsByProfileIdQuery(data?.uid ?? '', {
    skip: !data?.uid,
  });
  return (
    <div>
      <div className="h-72 bg-gray-200 w-full flex justify-center absolute top-0" style={{ zIndex: -1 }} />

      <section id="main" className="max-w-screen-lg ml-auto mr-auto">
        <section className="w-full flex justify-center z-10 mb-6">
          <div className="mt-44 flex flex-col items-center bg-white rounded-3xl border mx-4 w-full relative">
            <img
              alt="Profile"
              src={data?.imageUrl ?? '265112957_1028677061247492_6032049044662209224_n.jpg'}
              className="w-44 h-44 rounded-full border-4 border-white bg-gray-300 object-cover absolute -translate-y-28"
            />
            <div className="mt-20 flex flex-col items-center">
              <h1 className="mb-2 text-xl font-bold text-gray-800">{data?.displayName}</h1>
              <span className="mb-6 text-gray-700">{data?.email}</span>
            </div>
            <section className="px-3 mb-3 w-full">
              <Button onClick={handleClickButton}>Kirim pesan rahasia</Button>
              <CreateMessageModal />
            </section>
          </div>
        </section>

        <section className="px-4 border-b">
          <h2 className="font-bold mb-4 text-xl text-gray-800">Linimasa</h2>
        </section>
        <section className="max-w-xl ml-auto mr-auto">
          {!isFetching &&
            posts?.data?.map((data, index) => {
              return <MessageCard type="anonymous" withNoBorder={index === 0} message={data} key={data.id} />;
            })}
        </section>
      </section>

      <footer className="px-4 mt-6 flex justify-center items-center bg-gray-100 text-gray-400 h-12">v.0.0.0.01</footer>
    </div>
  );
}
