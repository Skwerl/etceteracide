import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAttachmentQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function AQFile() {

  let { id } = useParams();
  const { data: postData = null, isLoading: postLoading } = useGetAttachmentQuery(id);

  return <Main>
    <div className="document-wrapper">
      {postLoading
        ? <Spinner />
        : <React.Fragment>

          <pre>{JSON.stringify(postData, null, 4)}</pre>

          {postData && postData.file && <img src={postData.file} />}

        </React.Fragment>
      }
    </div>
  </Main>

}