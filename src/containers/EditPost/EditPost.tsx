import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosApi from "../../api/fairbase.ts";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    author: "",
    text: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await axiosApi.get(`/posts/${id}.json`);

        if (!response.data) {
          toast.error("Post not found");
          navigate("/");
          return;
        }

        setForm({
          author: response.data.author,
          text: response.data.text,
        });
      } catch {
        toast.error("Error loading post");
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [id, navigate]);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    try {
      await axiosApi.put(`/posts/${id}.json`, form);

      toast.success("Post updated");

      navigate(`/posts/${id}`);
    } catch {
      toast.error("Error updating post");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2 className="mb-4">Edit Post</h2>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>

        <Form.Control
          type="text"
          name="author"
          maxLength={50}
          value={form.author}
          onChange={onChange}
          required
        />
        <Form.Text className="text-muted">
          {form.author.length}/50
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>

        <Form.Control
          maxLength={200}
          as="textarea"
          rows={5}
          name="text"
          value={form.text}
          onChange={onChange}
          required
        />
        <Form.Text className="text-muted">
          {form.text.length}/200
        </Form.Text>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button
          type="submit"
          variant="success"
          disabled={!form.author.trim() || !form.text.trim()}
        >
          Save
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditPost;