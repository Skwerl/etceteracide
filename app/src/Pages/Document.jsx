import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../Api';
import Main from '../Layouts/Main';

export default function Document() {

  let { id } = useParams();
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id);

  return <Main>
    {!postLoading && <React.Fragment>
      <h2>{postData.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </React.Fragment>}
  </Main>

}