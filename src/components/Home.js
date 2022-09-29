import { useState, useEffect } from "react";
import Loading from "./Loading";

const Home = () => {
  const restPath = "https://joshua.borsethdesign.com/mindset/wp-json/wp/v2/pages/6";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <>
      {isLoaded ? (
        <article>
          <h1>{restData.title.rendered}</h1>
          <div className="entry-content">
            <section>
              <h2>{restData.acf.left_section_title}</h2>
              <p>{restData.acf.left_section_text}</p>
            </section>
            <section>
              <h2>{restData.acf.right_section_title}</h2>
              <p>{restData.acf.right_section_text}</p>
            </section>
          </div>
        </article>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
