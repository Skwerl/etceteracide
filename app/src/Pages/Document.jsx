import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function Document() {

  let { id } = useParams();
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id);

  return <Main>
    <div className="document-wrapper">
      {postLoading
        ? <Spinner />
        : <React.Fragment>
          <h2>{postData.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </React.Fragment>
      }
    </div>
  </Main>

}