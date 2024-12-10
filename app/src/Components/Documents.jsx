import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SlNote } from "react-icons/sl";
import { useGetPostsByPageQuery } from '../Redux/Api';
import Spinner from '../Components/Spinner';

export default function Documents() {

  const [page, setPage] = useState(1);
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const { sessionId: loggedIn } = useSelector((state) => state.tokenReducer);
  const { data: postsData = null, isLoading: postsLoading, error: loadError } = useGetPostsByPageQuery(page);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !postsLoading && !scrolledToEnd) setPage(page + 1);
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [page, postsLoading]);

  useEffect(() => {
    if (postsData) {
      const orderedPosts = [...postsData].sort(function (a, b) {
        return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
      }).reverse();
      const orderedUniquePosts = orderedPosts.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) unique.push(o);
        return unique;
      }, []);
      setSortedPosts(orderedUniquePosts);
    }
  }, [postsData]);

  useEffect(() => {
    if (loadError && loadError.status === 400) setScrolledToEnd(true);
  }, [loadError]);

  return <React.Fragment>
    {postsLoading
      ? <Spinner />
      : <ul className="document-list">
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