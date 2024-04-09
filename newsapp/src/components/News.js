import React, { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) =>{
  const capitilizeFn = (str) => {
    const modStr = str[0].toUpperCase() + str.slice(1);
    return modStr;
  };
  const [articles,setArticles]= useState([]);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults]=useState(0)

  useEffect(()=>{
    document.title = `${capitilizeFn(props.category)}-NewsMonkey`
    updateNews();
  },[])
  
  
  const updateNews = () => {
    console.log("Component Updated");
  
    fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&apiKey=d4a175c44e22458ebfa953975ff54216&page=1&pageSize=${props.pageSize}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setArticles(data.articles)
        setTotalResults(data.totalResults)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchMoreData = () => {
    props.setProgress(20);
    setPage(page + 1)
    props.setProgress(50);
    let data = fetch(
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&page=1&apiKey=d4a175c44e22458ebfa953975ff54216&pageSize=${props.pageSize}`
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        props.setProgress(100);
      });
  };
  
    return (
      <div className="bg-dark">
        <h1 className="d-flex justify-content-center text-light">
          NewsMonkey - Top {capitilizeFn(props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container my-3 ">
          <div className="row">
            {articles.map((el) => {    
              return (
                <div className="col-md-3 m-4">
                  <NewsItem
                    title={el.title ? (el.title.slice(0, 30) || "") : ""}
                    description={
                      el.description ? el.description.slice(0, 30) : ""
                    }
                    urlToImage={
                      el.urlToImage
                        ? el.urlToImage
                        : "https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg"
                    }
                    url={el.url}
                    author={el.author}
                    date={el.publishedAt}
                    source={el.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        </InfiniteScroll>
      </div>
    );
}

export default News;
