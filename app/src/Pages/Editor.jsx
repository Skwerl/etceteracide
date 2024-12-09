import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Editor as HTMLEditor } from '@tinymce/tinymce-react';
import shortid from 'shortid';
import { useGetPostQuery, useSavePostMutation, useLazyIndexPostsQuery } from '../Redux/Api';
import Main from '../Layouts/Main';
import './Editor.css';

const { REACT_APP_TINYMCE_KEY } = process.env;

export default function Editor() {

  let { id } = useParams();
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const [editId, setEditId] = useState(undefined);
  const [postDate, setPostDate] = useState(undefined);
  const [postTitle, setPostTitle] = useState(undefined);
  const [existingContent, setExistingContent] = useState(undefined);
  const { user } = useSelector((state) => state.tokenReducer);
  const { data: postData = null, isLoading: postLoading } = useGetPostQuery(id, { skip: !!!id });
  const [indexPosts] = useLazyIndexPostsQuery();
  const [savePost] = useSavePostMutation();

  useEffect(() => {
    if (!editId) setEditId(shortid());
    if (!postDate) setPostDate(new Date().toISOString());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (postData && titleRef) {
      if (postData.id) setEditId(postData.id);
      if (postData.date) setPostDate(postData.date);
      if (postData.title) setPostTitle(postData.title);
      if (postData.content) setExistingContent(postData.content);
      if (postData.title && titleRef.current) titleRef.current.value = postData.title;
    }
  }, [postData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (postTitle && titleRef.current) titleRef.current.value = postTitle;
  }, [postTitle, titleRef]);

  const save = async () => {
    if (editorRef.current) {
      const postObject = {
        id: editId,
        date: postDate,
        author: !!user.name ? user.name : "Unknown Author",
        title: !!titleRef.current.value ? titleRef.current.value : "Untitled",
        content: editorRef.current.getContent()
      };
      await savePost(postObject)
        .then(() => console.log("Saved!"))
        .catch((err) => console.error(err));
      indexPosts();
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