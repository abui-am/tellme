import React, { useState } from 'react';

import { Button } from '@/components/Button';
import MessageCard from '@/components/card/MessageCard';
import LayoutMain from '@/components/container/LayoutMain';
import ProfileForm from '@/components/form/ProfileForm';
import UsernameForm from '@/components/form/UsernameForm';
import { useGetPostsByProfileIdQuery, useGetProfileByUsernameQuery } from '@/services/profile';
import { useGetMyselfQuery } from '@/services/secured/profile';

const IndexPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching: isFetchingProfile, refetch } = useGetMyselfQuery('');

  // const { data: profile, isFetching: isFetchingProfile } = useGetProfileByUsernameQuery(data?.username as string, {
  //   skip: !data?.username,
  // });

  if (isFetchingProfile) {
    return <div>Loading...</div>;
  }

  if (!data?.username && !isFetchingProfile) {
    return (
      <LayoutMain id="username" className="pt-16">
        <UsernameForm
          onSubmit={() => {
            refetch();
          }}
        />
      </LayoutMain>
    );
  }
  return (
    <div>
      <div
        className="h-72 w-full bg-gray-200 flex justify-center absolute top-0 object-cover object-top"
        style={{ zIndex: -1, backgroundImage: `url(${data?.coverUrl})` }}
      />

      <section id="main" className="max-w-screen-lg ml-auto mr-auto">
        <section className="w-full flex justify-center z-10 mb-6">
          <div className="mt-44 flex flex-col items-center bg-white rounded-3xl border mx-4 w-full relative">
            <img
              alt="Profile"
              src={data?.imageUrl ?? '265112957_1028677061247492_6032049044662209224_n.jpg'}
              className="w-44 h-44 rounded-full border-4 border-white bg-gray-300 object-cover absolute -translate-y-28"
            />
            <div className="mt-20 flex flex-col items-center">
              <h1 className="text-xl font-bold text-gray-800">{data?.displayName}</h1>
              <span className="mb-2 text-gray-700">@{data?.username}</span>
              <span className="mb-6 text-gray-700">{data?.description}</span>
              <Button
                className="mb-6 w-60"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit Profile
              </Button>
              <EditProfileModal
                isOpen={isOpen}
                handleClose={() => {
                  refetch();
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </section>

        <section className="px-4 border-b">
          <h2 className="font-bold mb-4 text-xl text-gray-800">Linimasa</h2>
        </section>
        <section className="max-w-xl ml-auto mr-auto">
          <Posts uid={data?.uid ?? ''} />
        </section>
      </section>

      <footer className="px-4 mt-6 flex justify-center items-center bg-gray-100 text-gray-400 h-12">v.0.0.0.01</footer>
    </div>
  );
};

const Posts: React.FC<{ uid: string }> = ({ uid }) => {
  const { data: posts, isFetching } = useGetPostsByProfileIdQuery(uid ?? '', {
    skip: !uid,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (!posts?.data || posts?.data?.length === 0) {
    return (
      <div>
        <img
          src="/placeholder/empty_message.svg"
          width={221}
          height={221}
          alt="empty_message"
          className="mb-8 ml-auto mr-auto mt-12"
        />
        <span className="text-2xl font-bold block text-center">Tidak Ada Pesan</span>
        <p className="text-center text-gray-600 mb-6">
          Salin link board-mu dan sebarkan <br /> ke teman-teman mu!
        </p>
        <Button className="w-60 ml-auto mr-auto mb-12" variant="outlined">
          Salin Link
        </Button>
      </div>
    );
  }
  if (posts?.data && posts?.data?.length > 1) {
    return (
      <>
        {posts?.data.map((data, index) => {
          return <MessageCard type="self" withNoBorder={index === 0} message={data} key={data.id} />;
        })}
      </>
    );
  }
  return <div />;
};

const EditProfileModal: React.FC<{ isOpen: boolean; handleClose: () => void }> = ({ isOpen, handleClose }) => {
  return isOpen ? (
    <div
      style={{ width: '100vw', height: typeof window !== 'undefined' ? window.innerHeight : '100w' }}
      className="fixed bottom-0 top-0 left-0 bg-white p-4 z-10"
    >
      <ProfileForm handleClose={handleClose} />
    </div>
  ) : (
    <div />
  );
};

export default IndexPage;
