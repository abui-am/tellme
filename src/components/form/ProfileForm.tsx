import { Field, Form, Formik } from 'formik';
import React from 'react';
import { FiX } from 'react-icons/fi';

import {
  useGetMyselfQuery,
  usePutProfileByIdMutation,
  useUploadProfileCoverMutation,
  useUploadProfileMutation,
} from '@/services/secured/profile';
import { ProfileStored, PutProfileByIdPayload } from '@/typings/profile';

import { Button } from '../Button';
import { FormikDropzone } from '../field/Dropzone';
import { FormikTextArea } from '../field/TextArea';
import { FormikTextField } from '../field/TextField';

const getInitialValues = (val: ProfileStored | undefined): PutProfileByIdPayload => ({
  username: val?.username ?? '',
  displayName: val?.displayName ?? '',
  email: val?.email ?? '',
  coverUrl: val?.coverUrl ?? '',
  description: val?.description ?? '',
  imageUrl: val?.imageUrl ?? '',
});

const ProfileForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const [editProfile] = usePutProfileByIdMutation();
  const [uploadProfile] = useUploadProfileMutation();
  const [uploadCover] = useUploadProfileCoverMutation();

  const { data } = useGetMyselfQuery('');
  const handleSubmit = async (values: PutProfileByIdPayload) => {
    const { imageUrl, coverUrl, username: _, ...rest } = values;

    const jsonBody: PutProfileByIdPayload = rest;

    if (typeof imageUrl !== 'string') {
      const profile = await uploadProfile({ file: imageUrl });
      if ('data' in profile) jsonBody.imageUrl = profile.data.url;
    }
    if (typeof coverUrl !== 'string') {
      const cover = await uploadCover({ file: coverUrl });
      if ('data' in cover) jsonBody.coverUrl = cover.data.url;
    }

    const res = await editProfile({
      id: data?.uid ?? '',
      data: jsonBody,
    });
    if (res) {
      await handleClose();
    }
  };
  return (
    <Formik onSubmit={handleSubmit} enableReinitialize initialValues={getInitialValues(data)}>
      {() => {
        return (
          <Form>
            <section id="top-head" className="flex justify-between mb-10">
              <div className="flex gap-4 items-center rounded-f">
                <button type="button" onClick={handleClose}>
                  <FiX />
                </button>
                <h2 className="text-xl font-bold">Edit Profile</h2>
              </div>
              <Button type="submit" className="w-max">
                Simpan
              </Button>
            </section>
            <Field name="coverUrl" placeholder="Masukan Nama" component={FormikDropzone} />
            <Field
              name="imageUrl"
              placeholder="Masukan Nama"
              containerProps={{
                className: 'h-32 w-32 rounded-full outline-2 -mt-20 border-4 border-white ml-6',
              }}
              previewProps={{
                className: 'object-center h-32 w-32 ',
              }}
              hideRemoveButton
              component={FormikDropzone}
            />

            <Field name="displayName" placeholder="Masukan Nama" component={FormikTextField} />
            <Field name="username" placeholder="Masukan username" component={FormikTextField} />
            <Field
              name="description"
              placeholder="Masukan deskripsi"
              className="rounded-2xl"
              component={FormikTextArea}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
