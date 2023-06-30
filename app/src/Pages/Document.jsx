import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../Api';
import Main from '../Layouts/Main';

export default function Document() {

  let { id } = useParams();
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id);

  return <Main>
    {!postLoading && <React.Fragment>
      <pre>{JSON.stringify(postData, null, 4)}</pre>
    </React.Fragment>}
  </Main>

}