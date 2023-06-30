import React from 'react';
import { useGetPostsQuery } from '../Api';

export default function Home() {

  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();

  return <div>
    {!postsLoading && <React.Fragment>

      <pre>{JSON.stringify(postsData, null, 4)}</pre>

    </React.Fragment>}

  </div>

}