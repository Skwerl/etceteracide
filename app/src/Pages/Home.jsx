import React, { useState, useEffect } from 'react';
import Main from '../Layouts/Main';
import Filter from '../Components/Filter';
import Documents from '../Components/Documents';

export default function Home() {

  const [allDocuments, setAllDocuments] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsFilters, setPostsFilters] = useState({});

  useEffect(() => {
    const filteredDocs = allDocuments.filter(doc => {
      let ret = true;
      for (const key in postsFilters) {
        if (postsFilters.hasOwnProperty(key)) {
          if (!(!!doc[key] &&
            doc[key].toLowerCase().includes(postsFilters[key].toLowerCase())
          )) ret = false;
        }
      }
      return ret;
    });
    setTotalDocuments(allDocuments.length);
    setTotalFiltered(filteredDocs.length);
    setFilteredPosts(filteredDocs);
  }, [allDocuments, postsFilters]);

  return <Main>
    <div className="content-wrapper">
      <React.Fragment>
        <Filter
          loaded={totalDocuments}
          filtered={totalFiltered}
          handleUpdate={setPostsFilters}
        />
        <Documents
          filteredPosts={filteredPosts}
          handleUpdate={setAllDocuments}
        />
      </React.Fragment>
    </div>
  </Main>

}