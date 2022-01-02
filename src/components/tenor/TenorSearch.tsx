import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { useDispatch } from 'react-redux';

import { useKeyPressEnter } from '@/hooks/useKeyPress';
import { setImgType, setImgUrl } from '@/redux/slices/postMessageSlice';
import tenor from '@/services/tenor';
import { Result, TenorSearchResponse } from '@/typings/tenor';

import TextField from '../field/TextField';

const TenorSearch = () => {
  const [result, setResult] = useState<TenorSearchResponse>();
  const [query, setQuery] = useState('');

  const handleSearch = useKeyPressEnter(async () => {
    const { data } = await tenor.search({
      params: {
        q: query,
      },
    });
    setResult(data);
  });

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <div className="px-3 mt-3">
      <TextField className="mb-6" onChange={handleChange} onKeyPress={handleSearch} />
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid h-56 overflow-scroll"
        columnClassName="my-masonry-grid_column"
      >
        {result?.results.map((gif) => {
          return (
            <div className="rounded-xl" key={gif.title}>
              <GifImage key={gif.title} gif={gif} />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};

const GifImage: React.FC<{ gif: Result }> = ({ gif }) => {
  const dispatch = useDispatch();

  const onKeyPress = useKeyPressEnter(() => handleClickGif());

  const handleClickGif = () => {
    dispatch(setImgUrl(gif.media[0].gif.url));
    dispatch(setImgType('gif'));
  };

  return (
    <div role="button" onClick={handleClickGif} tabIndex={0} onKeyPress={onKeyPress}>
      <img id="preview_gif" src={gif.media[0].gif.url} className="rounded-xl" alt="preview_gif" />
    </div>
  );
};

export default TenorSearch;
