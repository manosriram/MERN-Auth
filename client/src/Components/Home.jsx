import React, { useEffect, useState } from "react";
import "../Styles/Home.scss";
import Key from "../Key";
import Navbar from "./Navbar";

const Home = props => {
  const [news, addNews] = useState([]);
  const [isSpinning, setSpinning] = useState(true);

  const fetchNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${Key.key}`
    );
    const newsData = await response.json();
    setSpinning(false);
    return newsData;
  };

  useEffect(() => {
    fetchNews().then(res => addNews(res.articles));
    return () => console.log("Cleaned Up !");
  }, []);

  if (isSpinning) {
    return (
      <div className="spinner-border" role="status" id="spinner">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <>
        <Navbar props={props} />
        <br />
        {news.map((N, NI) => {
          return (
            <div key={NI}>
              <div className="newContent" key={NI}>
                <h4 id="author" key={NI + 3}>
                  {N.title}
                </h4>
                <p key={NI}>Source - {N.source.name}</p>
                <img src={N.urlToImage} alt="" />
                <h6 id="content" key={NI + 2}>
                  {N.content}
                </h6>
                <a href={N.url}>{N.author}</a>
              </div>
              <br />
            </div>
          );
        })}
        <br />
      </>
    );
  }
};
export default Home;
