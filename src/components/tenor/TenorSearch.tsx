import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useDebouncedCallback } from 'use-debounce';

import tenor from '@/services/tenor';
import { TenorSearchResponse } from '@/typings/tenor';

import TextField from '../field/TextField';

const TenorSearch = () => {
  const [result, setResult] = useState<TenorSearchResponse>();
  const handleChange = useDebouncedCallback(async (e: any) => {
    const { data } = await tenor.search({
      params: {
        q: e.target.value,
      },
    });
    setResult(data);
  }, 1000);

  return (
    <div className="px-3 mt-3">
      <TextField className="mb-6" onChange={handleChange} />
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid h-56 overflow-scroll"
        columnClassName="my-masonry-grid_column"
      >
        {result?.results.map((gif) => {
          return (
            <div key={gif.title} className="rounded-xl">
              <img itemType="" id="preview_gif" src={gif.media[0].gif.url} className="rounded-xl" alt="preview_gif" />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};

export default TenorSearch;
