import React from 'react';
import { useGetPostsQuery } from '../Api';
import Main from '../Layouts/Main';

export default function Home() {

  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();

  return <Main>
    {!postsLoading && <React.Fragment>
      <pre>{JSON.stringify(postsData, null, 4)}</pre>
    </React.Fragment>}
  </Main>

}