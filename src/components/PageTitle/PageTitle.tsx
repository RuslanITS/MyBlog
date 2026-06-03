import { Breadcrumb } from "react-bootstrap";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <h1>{title}</h1>
    </>
  );
};

export default PageTitle;