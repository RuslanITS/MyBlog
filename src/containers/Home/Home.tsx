import Posts from "../../components/PostItem/PostItem.tsx";
import PageTitle from "../../components/PageTitle/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle title="Home" />
      <Posts />
    </>
  );
};

export default Home;