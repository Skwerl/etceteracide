import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function Document() {

  let { id } = useParams();
  const [dateString, setDateString] = useState(null);
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id);

  useEffect(() => {
    if (postData && postData.date) {
      setDateString(new Date(postData.date).toLocaleDateString('en-US'));
    }
  }, [postData]);

  return <Main>
    <div className="document-wrapper">
      {postLoading
        ? <Spinner />
        : <React.Fragment>
          <h2>{postData.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          <small>{dateString
            ? `Skwerl, ${dateString}`
            : `Skwerl`
          }</small>
        </React.Fragment>
      }
    </div>
  </Main>

}