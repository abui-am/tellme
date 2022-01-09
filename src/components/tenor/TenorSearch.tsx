import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import { useDispatch } from 'react-redux';

import { useKeyPressEnter } from '@/hooks/useKeyPress';
import { setImgType, setImgUrl } from '@/redux/slices/postMessageSlice';
import { useCategoriesQuery, useSearchMutation } from '@/services/tenorApi';
import { Result, Tag } from '@/typings/tenor';

import TextField from '../field/TextField';

const TenorSearch = () => {
  const [query, setQuery] = useState('');

  const [search, { data }] = useSearchMutation();
  const { data: dataCat } = useCategoriesQuery('');

  const handleSearch = useKeyPressEnter(async () => {
    search({ q: query });
  });

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <div className="px-3 mt-3">
      <TextField
        className="mb-6"
        value={query}
        placeholder="Masukan kata kunci..."
        onChange={handleChange}
        onKeyPress={handleSearch}
      />
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid h-56 overflow-scroll"
        columnClassName="my-masonry-grid_column"
      >
        {data?.results.length === 0 ||
          !!data ||
          dataCat?.tags.map((tag) => {
            return (
              <CategoryItem
                key={tag.name}
                tag={tag}
                onClick={(tag) => {
                  setQuery(tag);
                  search({ q: tag });
                }}
              />
            );
          })}
        {data?.results.map((gif) => {
          return (
            <div className="rounded-xl" key={gif.id}>
              <GifImage gif={gif} />
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

const CategoryItem: React.FC<{ onClick: (searchTerm: string) => void; tag: Tag }> = ({ onClick, tag }) => {
  const handleKeyPress = useKeyPressEnter(() => {
    onClick(tag.searchterm);
  });
  const handleClickCategory = () => {
    onClick(tag.searchterm);
  };
  return (
    <div
      role="button"
      className="relative rounded-xl overflow-hidden"
      onKeyPress={handleKeyPress}
      key={tag.name}
      tabIndex={0}
      onClick={handleClickCategory}
    >
      <div className="backdrop-brightness-50 absolute w-full bottom-0 top-0 lef-0 right-0 flex justify-center items-center">
        <span className="font-bold text-white">{tag.searchterm}</span>
      </div>
      <img id="preview_gif" src={tag.image} alt="preview_gif" />
    </div>
  );
};

export default TenorSearch;
