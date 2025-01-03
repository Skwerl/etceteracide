import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlNote } from "react-icons/sl";
import { useGetPostsByPageQuery } from '../Redux/Api';
import Spinner from '../Components/Spinner';

export default function Documents(props) {

  const { handleUpdate, filteredPosts } = props;

  const [page, setPage] = useState(1);
  const [gotAllPosts, setGotAllPosts] = useState(false);
  const { sessionId: loggedIn } = useSelector((state) => state.tokenReducer);
  const { data: postsData = null, isLoading: postsLoading, error: loadError } = useGetPostsByPageQuery(page);

  useEffect(() => {
    if (postsData) {
      const orderedPosts = [...postsData].sort(function (a, b) {
        return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
      }).reverse();
      const orderedUniquePosts = orderedPosts.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) unique.push(o);
        return unique;
      }, []);
      handleUpdate(orderedUniquePosts);
    }
  }, [postsData]);

  useEffect(() => {
    if (loadError && loadError.status === 400) setGotAllPosts(true);
  }, [loadError]);

  return <React.Fragment>
    {postsLoading
      ? <Spinner />
      : <div className="documents-wrapper">
        <ul className="document-list">
          {!!loggedIn && <li><Link to={`/edit`}><SlNote />{'\u00A0'}New</Link></li>}
          {filteredPosts.map((post, index) => <li className="fade-in-fast" key={index}>
            {!!loggedIn &&
              <React.Fragment>
                <Link to={`/edit/${post.id}`}><SlNote /></Link>{'\u00A0'}
              </React.Fragment>}
            <Link to={`/document/${post.id}`} target="_blank" rel="noopener noreferrer">
              {!!post.title ? post.title : 'No Title'}
            </Link>
          </li>)}
        </ul>
      </div>
    }
    {!postsLoading &&
      <div style={{ marginTop: "40px" }} className={gotAllPosts ? 'fade-out' : 'fade-in'}>
        <button onClick={() => setPage(page + 1)}>M O R E</button>
      </div>}
  </React.Fragment>

}