import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPostsQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function Home() {

  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();

  return <Main>
    {postsLoading
      ? <Spinner />
      : <ul>
        {postsData.map((post, index) => <li key={index}>
          <Link to={`/document/${post.id}`}>{post.title}</Link>
        </li>)}
      </ul>
    }
  </Main>

}