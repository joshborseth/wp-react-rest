import { useState, useEffect } from "react";
import Loading from "./Loading";

const About = () => {
  const restPath = "https://joshua.borsethdesign.com/mindset/wp-json/wp/v2/pages/19";
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
        <article id={`post-${restData.id}`}>
          <h1>{restData.title.rendered}</h1>
          <p>{restData.acf.address}</p>
          <p>{restData.acf.email}</p>
        </article>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default About;
