import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPostsQuery } from '../Api';
import Main from '../Layouts/Main';

export default function Home() {

  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();

  return <Main>
    {!postsLoading && <React.Fragment>
      <ul>
        {postsData.map((post, index) => <li key={index}>
          <Link to={`/document/${post.id}`}>{post.title}</Link>
        </li>)}
      </ul>
    </React.Fragment>}

  </Main>

}