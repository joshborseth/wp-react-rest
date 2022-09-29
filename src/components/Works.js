import { useState, useEffect } from "react";
import Loading from "./Loading";

const Works = ({ featuredImage }) => {
  const restPath = "https://joshua.borsethdesign.com/mindset/wp-json/wp/v2/fwd-work?_embed&orderby=title&order=asc";
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
        <>
          <h1>Works</h1>
          {restData.map((work) => (
            <article key={work.id} id={`work-${work.id}`}>
              <h2>{work.title.rendered}</h2>
              {work._embedded["wp:featuredmedia"] && (
                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(work._embedded["wp:featuredmedia"][0])}></figure>
              )}
              {work._embedded["wp:featuredmedia"] && (
                <div className="entry-content" style={{ wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: work.content.rendered }}></div>
              )}
              <div>
                <h3>Category: </h3>
                <ul>
                  {work._embedded["wp:term"].map((term, i) => {
                    if (!term[0]) return "";
                    return <li key={term[0]?.id}>{term[0]?.name}</li>;
                  })}
                </ul>
              </div>
            </article>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Works;
