import React, { useState, useEffect } from 'react';
import { useFindLegacyQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';

export default function AQRedirect() {

  const requestpath = window.location.pathname;
  const [urlQuery, setUrlQuery] = useState(null);
  const [foundDocumentId, setFoundDocumentId] = useState(null);
  const { data = null, isLoading } = useFindLegacyQuery(urlQuery, { skip: !!!urlQuery });

  useEffect(() => {
    if (data && data.length > 0 && !!data[0].id) {
      const foundId = data[0].id;
      setFoundDocumentId(foundId);
      setTimeout(() => {
        window.location.replace(`/document/${foundId}`);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (!!requestpath && requestpath.length > 10) {
      setUrlQuery(requestpath.substring(10,).toLowerCase());
    }
  }, [requestpath]);

  return <Main>
    <div className="content-wrapper document-wrapper">

      {isLoading
        ? <Spinner />
        : <React.Fragment>
          {!!foundDocumentId
            ? <span>Found! Redirecting...</span>
            : <span>Sorry, couldn't find that document.</span>
          }
        </React.Fragment>
      }

    </div>
  </Main>

}