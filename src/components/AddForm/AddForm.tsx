import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosApi from "../../api/fairbase.ts";

interface PostForm {
  author: string;
  text: string;
}

const AddForm = () => {

  const [state, setState] = useState<PostForm>({
    author: "",
    text: "",
  });

  const changeHandler = ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitHandler = async  (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.author.trim() || !state.text.trim()) {
      toast.error('Please fill all fields!');
      return;
    }

    try{
      await axiosApi.post('/posts.json', state);
      toast.success('Post created successfully!');
      setState({
        author: "",
        text: "",
      });
    }catch (error) {
      console.error(error);
      toast.error('Failed to create post!');
    }

  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          name="author"
          onChange={changeHandler}
          type="text"
          value={state.author}
          placeholder="Enter your name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Post text</Form.Label>
        <Form.Control
          name="text"
          onChange={changeHandler}
          as="textarea"
          rows={5}
          value={state.text}
          placeholder="Enter post text"
        />
      </Form.Group>

      <Button type="submit">Create Post</Button>
    </Form>
  );
};

export default AddForm;