import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function Home() {

  const { sessionId: loggedIn } = useSelector((state) => state.tokenReducer);
  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();

  return <Main>
    {postsLoading
      ? <Spinner />
      : <ul>
        {postsData.map((post, index) => <li key={index}>
          <Link to={`/document/${post.id}`}>{post.title}</Link>
          {!!loggedIn &&
            <React.Fragment>
              {'\u00A0'}<Link to={`/edit/${post.id}`}>Edit</Link>
            </React.Fragment>}
        </li>)}
      </ul>
    }
  </Main>

}