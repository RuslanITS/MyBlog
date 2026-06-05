import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import axiosApi from "../../api/fairbase";

type AboutData = {
  title: string;
  text: string;
};

const About = () => {
  const [about, setAbout] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axiosApi.get("/about.json");

        setAbout(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchAbout();
  }, []);

  if (!about) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="shadow-sm mt-4">
      <Card.Body>
        <Card.Title className="display-6">
          {about.title}
        </Card.Title>

        <hr />

        <Card.Text className="fs-5">
          {about.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default About;