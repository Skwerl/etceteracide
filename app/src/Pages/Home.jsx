import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlNote } from "react-icons/sl";
import { useGetPostsQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function Home() {

  const { sessionId: loggedIn } = useSelector((state) => state.tokenReducer);
  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();

  return <Main>
    {postsLoading
      ? <Spinner />
      : <ul className="document-list">
        {!!loggedIn && <li><Link to={`/edit`}><SlNote />{'\u00A0'}New</Link></li>}
        {postsData.map((post, index) => <li key={index}>
          {!!loggedIn &&
            <React.Fragment>
              <Link to={`/edit/${post.id}`}><SlNote /></Link>{'\u00A0'}
            </React.Fragment>}
          <Link to={`/document/${post.id}`}>{post.title}</Link>
        </li>)}
      </ul>
    }
  </Main>

}