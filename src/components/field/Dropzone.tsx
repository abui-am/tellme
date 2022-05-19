import clsx from 'clsx';
import { FieldProps } from 'formik';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiCamera, FiX } from 'react-icons/fi';

type DropzoneProps = {
  onDrop: (file: any[]) => any;
};

type Props = FieldProps &
  DropzoneProps & {
    withOfflinePreview: boolean;
    previewProps: Record<string, any>;
    backdropProps: Record<string, any>;
    containerProps: Record<string, any>;
  };

const Dropzone: React.FC<DropzoneProps & { value: any; onRemove: () => void; hideRemoveButton?: boolean }> = ({
  onDrop,
  value,
  onRemove,
  hideRemoveButton,
}) => {
  const onFileDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      onDrop(acceptedFiles);
    },
    [onDrop]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onFileDrop });

  return !value ? (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="flex h-16 w-16 rounded-full bg-gray-900 opacity-70 justify-center items-center hover:opacity-80 cursor-pointer">
        <FiCamera className="text-white text-2xl" />
      </div>
    </div>
  ) : (
    <div className="flex gap-4">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex h-16 w-16 rounded-full bg-gray-900 opacity-70 justify-center items-center hover:opacity-80 cursor-pointer">
          <FiCamera className="text-white text-2xl" />
        </div>
      </div>
      {!hideRemoveButton && (
        <button
          className="flex h-16 w-16 rounded-full bg-gray-900 opacity-70 justify-center items-center hover:opacity-80 cursor-pointer"
          onClick={onRemove}
          type="button"
        >
          <FiX className="text-white text-2xl" />
        </button>
      )}
    </div>
  );
};

export const FormikDropzone: React.FC<Props> = ({
  form: _,
  field,
  previewProps: { className: clsPreview, ...previewProps } = {},
  backdropProps: { className: clsBackdrop, ...backdropProps } = {},
  containerProps: { className: clsContainer, ...containerProps } = {},
  ...props
}) => {
  const getPreview = (preview: string | Blob | MediaSource) => {
    console.log(preview);
    if (typeof preview === 'string') {
      return preview;
    }
    const urlName = URL.createObjectURL(preview);
    return urlName;
  };

  const handleChange = async (acceptedFiles: any[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;
      _.setFieldValue(field.name, file);
    } catch (error) {
      console.log(error);
    }
  };
  const preview = getPreview(field.value);
  return (
    <div className={clsx('mb-4 relative overflow-hidden  bg-white', clsContainer)} {...containerProps}>
      {preview ? (
        <img
          src={preview}
          alt="cover"
          width="100%"
          className={clsx('h-72 object-cover object-top  bg-white', clsPreview)}
          {...previewProps}
        />
      ) : (
        <div className={clsx('h-72 object-cover object-top bg-white', clsPreview)} {...previewProps} />
      )}
      <div
        id="backdrop"
        className={clsx(
          'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-900 opacity-30',
          clsBackdrop
        )}
        {...backdropProps}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <Dropzone
          {...props}
          {...field}
          onDrop={handleChange}
          value={field.value}
          onRemove={() => {
            _.setFieldValue(field.name, '');
          }}
        />
      </div>
    </div>
  );
};

export default Dropzone;
