import React from 'react';
import Main from '../Layouts/Main';
// import Spinner from '../Components/Spinner';

export default function AQRedirect() {

  const requesturl = window.location.pathname;

  return <Main>
    <div className="content-wrapper document-wrapper">
      <React.Fragment>
        <p>I see you're looking for {requesturl.substring(10,)} from Antiquiet.</p>
        <p>Soon I'll build a system that connects old Antiquiet URLs to their corresponding etceteracide documents. But I'll need a little more time, after I finish importing everything. So you'll have to come back later. In the meantime, you can bookmark this URL; eventually it will redirect to the resurrected content.</p>
        <small>Skwerl, 12/9/2024</small>
      </React.Fragment>
    </div>
  </Main>

}