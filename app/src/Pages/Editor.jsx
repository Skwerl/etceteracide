import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor as HTMLEditor } from '@tinymce/tinymce-react';
import shortid from 'shortid';
import { useGetPostQuery, useSavePostMutation } from '../Redux/Api';
import Main from '../Layouts/Main';
import './Editor.css';

const { REACT_APP_TINYMCE_KEY } = process.env;

export default function Editor() {

  let { id } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const [editId, setEditId] = useState(undefined);
  const [existingContent, setExistingContent] = useState(undefined);
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id, { skip: !!!id });
  const [savePost] = useSavePostMutation();
  useEffect(() => { if (!editId) setEditId(shortid()) }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (postData) {
      if (postData.id) setEditId(postData.id);
      if (postData.content) setExistingContent(postData.content);
      if (postData.title) titleRef.current.value = postData.title;
    }
  }, [postData]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async () => {
    if (editorRef.current) {
      const postObject = {
        id: editId,
        title: !!titleRef.current.value ? titleRef.current.value : "Untitled",
        content: editorRef.current.getContent()
      };
      await savePost(postObject)
        .then(() => console.log("Saved!"))
        .catch((err) => console.error(err));
    }
  };

  return <Main auth={true}>
    <div style={{ marginBottom: "20px" }}>
      <form className="editorForm">
        <input type="text" id="title" ref={titleRef} />
      </form>
    </div>
    <HTMLEditor
      apiKey={REACT_APP_TINYMCE_KEY}
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue={existingContent}
      disabled={postLoading}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | bold italic | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }'
      }}
    />
    <div style={{ marginTop: "20px" }}>
      <button onClick={save}>S A V E</button>
    </div>
  </Main>

}