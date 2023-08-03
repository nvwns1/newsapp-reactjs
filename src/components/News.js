import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: "9",
    category: "general",
  };
  static propTypes = {
    pageSize: PropTypes.string,
    category: PropTypes.string,
    country: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsApp`;
  }

  async updateNews() {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlepreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 });
    this.setState({
      loading: true,
    });
    try {
      const nextPage = this.state.page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
  
      const data = await fetch(url);
      const parsedData = await data.json();
  
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
        page: nextPage,
      }));
    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <>
        <div className="container my-3">
          <h2>
            NewsApp Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            headlines
          </h2>
          {this.state.loading && <Loading />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.urlToImage}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 80)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
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
            >Math.ceil(this.state.totalResults/this.props.pageSize)
            } type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        </div>
      </>
    );
  }
}
