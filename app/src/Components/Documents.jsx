import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlNote } from "react-icons/sl";
import { useGetPostsQuery } from '../Redux/Api';
import Spinner from '../Components/Spinner';

export default function Documents(props) {

  const { page } = props;
  const { sessionId: loggedIn } = useSelector((state) => state.tokenReducer);
  const { data: postsData = null, isLoading: postsLoading } = useGetPostsQuery();
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    if (postsData) {
      setSortedPosts([...postsData].sort(function (a, b) {
        return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
      }).reverse());
    }
  }, [postsData]);

  return <React.Fragment>
    {postsLoading
      ? <Spinner />
      : <ul className={`document-list page-${page}`}>
        {!!loggedIn && <li><Link to={`/edit`}><SlNote />{'\u00A0'}New</Link></li>}
        {sortedPosts.map((post, index) => <li key={index}>
          {!!loggedIn &&
            <React.Fragment>
              <Link to={`/edit/${post.id}`}><SlNote /></Link>{'\u00A0'}
            </React.Fragment>}
          <Link to={`/document/${post.id}`}>{post.title}</Link>
        </li>)}
      </ul>
    }
  </React.Fragment>

}