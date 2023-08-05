import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews= async() =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults) 
    setLoading(false)
  }
useEffect(() => {
    document.title = `${capitalizeFirstLetter(
    props.category
  )} - NewsApp`;
  updateNews();
}, [])


  const handleNextClick = async () => {
    setPage(page+1)
    updateNews();
  };
  const handlepreviousClick = async () => {
    setPage(page-1)
    updateNews();
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
  
    try {
      let data = await fetch(url);
      let parsedData = await data.json();  
      setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };
  

  return (
      <>
        <div className="container my-3">
          <h2 style={{marginTop:'90px'}}>
            NewsApp Top {capitalizeFirstLetter(props.category)}{" "}
            headlines
          </h2>
          {loading && <Loading />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Loading />}
          >
            <div className="container">
              <div className="row">
                {articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element?.urlToImage}>
                      <NewsItem
                        title={element?.title ? element.title.slice(0, 45) : ""}
                        description={
                          element?.description
                            ? element.description.slice(0, 80)
                            : ""
                        }
                        imageUrl={element?.urlToImage}
                        newUrl={element?.url}
                        author={element?.author}
                        date={element?.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlepreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1
            >Math.ceil(this.state.totalResults/props.pageSize)
            } type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        </div>
      </>
    );
  
}



News.defaultProps = {
  country: "us",
  pageSize: "9",
  category: "general",
};
News.propTypes = {
  pageSize: PropTypes.string,
  category: PropTypes.string,
  country: PropTypes.string,
};

export default News;