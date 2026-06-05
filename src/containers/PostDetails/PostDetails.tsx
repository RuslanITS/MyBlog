import { Link,useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosApi from "../../api/fairbase.ts";
import type { Post } from "../../type";

const PostDetails = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const deletePost = async () => {
    if (!id) return;

    try {
      await axiosApi.delete(`/posts/${id}.json`);
      toast.success('Post deleted')
      navigate("/");
    } catch{
      toast.error('Error')
    }
  };

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
        setPost({
          id,
          ...response.data,
        });
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPost();
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  }

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <Card.Title className="fs-2 mb-3">
          {post.author}
        </Card.Title>

        <Card.Text className="fs-5">
          {post.text}
        </Card.Text>

        <div className="d-flex gap-2 mt-4">
          <Link  to={`/posts/${post.id}/edit`}>
            <Button
              variant="warning"
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="danger"
            onClick={deletePost}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostDetails;