import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Editor as HTMLEditor } from '@tinymce/tinymce-react';
import { useGetPostQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
// import Spinner from '../Components/Spinner';

const { REACT_APP_TINYMCE_KEY } = process.env;

export default function Editor() {

  let { id } = useParams();
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id, { skip: !!!id });
  useEffect(() => { if (postData && postData.content) setEditorContent(postData.content); }, [postData]);

  const save = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.getContent());
    }
  };

  return <Main auth={true}>
    <HTMLEditor
      apiKey={REACT_APP_TINYMCE_KEY}
      onInit={(evt, editor) => editorRef.current = editor}
      value={editorContent}
      disabled={postLoading}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
    <div style={{ marginTop: "20px" }}>
      <button onClick={save}>S A V E</button>
    </div>
  </Main>

}