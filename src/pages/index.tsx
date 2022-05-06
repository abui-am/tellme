import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/Button';
import MessageCard from '@/components/card/MessageCard';
import TextField from '@/components/field/TextField';
import {
  useGetPostsByProfileIdQuery,
  useGetProfileByUsernameQuery,
  usePutProfileByIdMutation,
} from '@/services/profile';
import { useGetMyselfQuery } from '@/services/secured/profile';

const IndexPage = () => {
  const [username, setUsername] = useState('');
  const [editProfile] = usePutProfileByIdMutation();
  const { data } = useGetMyselfQuery('');

  const handleSubmit = async () => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);

      editProfile({
        id: auth.user?.uid,
        data: {
          username,
        },
      });
    }
  };

  const { data: profile } = useGetProfileByUsernameQuery(data?.username as string, {
    skip: !data?.username,
  });

  const { data: posts, isFetching } = useGetPostsByProfileIdQuery(data?.uid ?? '', {
    skip: !data?.uid,
  });

  if (!data?.username) {
    return (
      <div>
        <TextField name="username" onChange={(e: any) => setUsername(e.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    );
  }
  return (
    <div>
      <div className="h-72 bg-gray-200 w-full flex justify-center absolute top-0" style={{ zIndex: -1 }} />

      <section id="main" className="max-w-screen-lg ml-auto mr-auto">
        <section className="w-full flex justify-center z-10 mb-6">
          <div className="mt-44 flex flex-col items-center bg-white rounded-3xl border mx-4 w-full relative">
            <img
              alt="Profile"
              src={profile?.imageUrl ?? '265112957_1028677061247492_6032049044662209224_n.jpg'}
              className="w-44 h-44 rounded-full border-4 border-white bg-gray-300 object-cover absolute -translate-y-28"
            />
            <div className="mt-20 flex flex-col items-center">
              <h1 className="mb-2 text-xl font-bold text-gray-800">{profile?.displayName}</h1>
              <span className="mb-6 text-gray-700">{profile?.username}</span>
            </div>
          </div>
        </section>

        <section className="px-4 border-b">
          <h2 className="font-bold mb-4 text-xl text-gray-800">Linimasa</h2>
        </section>
        <section className="max-w-xl ml-auto mr-auto">
          {!isFetching &&
            posts?.data?.map((data, index) => {
              return <MessageCard type="self" withNoBorder={index === 0} message={data} key={data.id} />;
            })}
        </section>
      </section>

      <footer className="px-4 mt-6 flex justify-center items-center bg-gray-100 text-gray-400 h-12">v.0.0.0.01</footer>
    </div>
  );
};

export default IndexPage;
