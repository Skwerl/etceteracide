import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../Redux/Api';
import Embed from 'react-embed';
import Main from '../Layouts/Main';
import Spinner from '../Components/Spinner';
import { isUrl, aqReplacements } from '../Helpers';
import './Document.scss';

export default function Document() {

  let { id } = useParams();
  const [documentParagraphs, setDocumentParagraphs] = useState(null);
  const [documentAuthor, setDocumentAuthor] = useState('Unknown Author');
  const [documentDate, setDocumentDate] = useState('Date Unknown');
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id);

  useEffect(() => {
    if (postData && postData.content) setDocumentParagraphs(postData.content.split("\n\n"));
    if (postData && postData.author) setDocumentAuthor(postData.author);
    if (postData && postData.date) setDocumentDate(new Date(postData.date).toLocaleDateString('en-US'));
  }, [postData]);

  return <Main pagetitle={postData && postData.title}>
    <div className="content-wrapper document-wrapper">
      {postLoading
        ? <Spinner />
        : <React.Fragment>
          {(!!postData && !!postData.content)

            ? <React.Fragment>

              {!!postData.antiquiet
                ? <React.Fragment>
                  <div className="header antiquiet">
                    <h2 className="title">{postData.title}</h2>
                    <strong>{`Originally published on Antiquiet.com by ${documentAuthor}, ${documentDate}`}</strong>
                  </div>
                </React.Fragment>
                : <React.Fragment>
                  <div className="header">
                    <h2 className="title">{postData.title}</h2>
                  </div>
                </React.Fragment>
              }

              {!!postData.tags && <div className="document-tags">
                <ul>{postData.tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
              </div>}

              <div className="document-body">
                {!!documentParagraphs && documentParagraphs.map((paragraph, index) => {
                  const rawHTML = aqReplacements(paragraph);
                  const domElement = document.createElement("div");
                  domElement.innerHTML = rawHTML;
                  const content = domElement.firstChild.innerHTML;
                  if (isUrl(content)) return <div key={index} className="embed"><Embed url={content} /></div>
                  else return <div key={index} dangerouslySetInnerHTML={{ __html: domElement.innerHTML }} />
                })}
              </div>

              <small>{`${documentAuthor}, ${documentDate}`}</small>

            </React.Fragment>

            : <React.Fragment>
              No content found here!
            </React.Fragment>

          }
        </React.Fragment>
      }
    </div>
  </Main>

}