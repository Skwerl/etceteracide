import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function Document() {

  let { id } = useParams();
  const [dateString, setDateString] = useState('Date Unknown');
  const [authorName, setAuthorName] = useState('Unknown Author');
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id);

  useEffect(() => {
    if (postData && postData.author) setAuthorName(postData.author);
    if (postData && postData.date) {
      setDateString(new Date(postData.date).toLocaleDateString('en-US'));
    }
  }, [postData]);

  return <Main>
    <div className="document-wrapper">
      {postLoading
        ? <Spinner />
        : <React.Fragment>

          {postData.antiquiet
            ? <React.Fragment>
              <div className="header antiquiet">
                <h2 className="title">{postData.title}</h2>
                <strong>{`Originally published on Antiquiet.com by ${authorName}, ${dateString}`}</strong>
              </div>
            </React.Fragment>
            : <React.Fragment>
              <div className="header">
                <h2 className="title">{postData.title}</h2>
              </div>
            </React.Fragment>}

          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          <small>{`${authorName}, ${dateString}`}</small>

        </React.Fragment>
      }
    </div>
  </Main>

}