import { IEmojiPickerProps } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import React from 'react';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const EmojiSearch: React.FC<IEmojiPickerProps> = (props) => {
  return <EmojiPicker disableAutoFocus pickerStyle={{ width: '100%' }} {...props} />;
};

export default EmojiSearch;
