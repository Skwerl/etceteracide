import React, { useState } from 'react';
import Main from '../Layouts/Main';
import Documents from '../Components/Documents';

export default function Home() {

  const [loadPages] = useState([1]);

  return <Main>
    {loadPages.map((pageToLoad, i) => <React.Fragment key={i}>
      <Documents page={pageToLoad} />
    </React.Fragment>)}
  </Main>

}