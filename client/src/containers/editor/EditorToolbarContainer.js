import React, { useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import EditorToolbar from "components/editor/EditorToolbar";
import { useSelector, useDispatch } from "react-redux";
import { getPost, onChange } from "store/modules/editor";
import { writePost, editPost } from "store/modules/post";
import { writePostInSeries } from "store/modules/series";
import axios from "axios";
import queryString from "query-string";

const EditorToolbarContainer = ({ history, location }) => {
  const title = useSelector(state => state.editor.get("title"), []);
  const markdown = useSelector(state => state.editor.get("markdown"), []);
  const tags = useSelector(state => state.editor.get("tags"), []);
  const dispatch = useDispatch();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(async () => {
    const { postId, series } = queryString.parse(location.search);

    if (postId) {
      await dispatch(
        editPost(postId, {
          title,
          body: markdown,
          tags: tags
            ? tags
                .trim()
                .split(",")
                .map(tag => tag.trim())
            : []
        })
      );
      history.push(`/post/${postId}`);
      return;
    }

    if (series) {
      await dispatch(
        writePostInSeries(series, {
          title,
          body: markdown,
          tags: tags
            ? tags
                .trim()
                .split(",")
                .map(tag => tag.trim())
            : []
        })
      );
      history.push(`/series/${series}`);
      return;
    }

    await dispatch(
      writePost({
        title,
        body: markdown,
        tags: tags
          ? tags
              .trim()
              .split(",")
              .map(tag => tag.trim())
          : []
      })
    ).then(response => {
      history.push(`/post/${response.data.data._id}`);
    });
  }, [dispatch, history, location, title, markdown, tags]);

  const handleUpload = useCallback(
    async file => {
      let formData = new FormData();
      formData.append("imgUploader", file);

      await axios({
        method: "POST",
        url: "/api/upload",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      }).then(response => {
        dispatch(
          onChange({
            name: "markdown",
            value: markdown + "\n![](" + response.data + ")\n"
          })
        );
      });
    },
    [dispatch, markdown]
  );

  useEffect(() => {
    const { postId } = queryString.parse(location.search);

    postId && dispatch(getPost(postId));
  }, [location, dispatch]);

  return (
    <EditorToolbar
      onGoBack={handleGoBack}
      onSubmit={handleSubmit}
      onUpload={handleUpload}
    />
  );
};

export default withRouter(EditorToolbarContainer);
