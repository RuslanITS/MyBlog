import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { FPosts, Post } from "../../type";
import axiosApi from "../../api/fairbase";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await axiosApi.get<FPosts>("/posts.json");

        if (!response.data) {
          setPosts([]);
          return;
        }

        const postsArray: Post[] = Object.keys(response.data).map((id) => ({
          id,
          author: response.data[id].author,
          text: response.data[id].text,
        }));

        setPosts(postsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (posts.length === 0) {
    return (
      <Card className="text-center p-5 shadow-sm">
        <Card.Body>
          <h3>No posts yet</h3>

          <p className="text-muted mb-4">
            Create your first post and start sharing your thoughts.
          </p>

          <Link to="/add">
            <Button variant="primary">
              Create First Post
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Card className="mb-3" key={post.id}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              Author: {post.author}
            </Card.Subtitle>

            <Card.Text>
              {post.text}
            </Card.Text>

            <Link to={`/posts/${post.id}`}>
              <Button>
                Read More
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default Posts;