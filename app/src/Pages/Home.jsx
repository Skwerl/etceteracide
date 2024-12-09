import React from 'react';
import Main from '../Layouts/Main';
import Documents from '../Components/Documents';

export default function Home() {

  return <Main>
    <div className="content-wrapper">
      <React.Fragment>
        <Documents />
      </React.Fragment>
    </div>
  </Main>

}