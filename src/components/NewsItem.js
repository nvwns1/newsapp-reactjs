import React, { Component } from "react";

export default class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newUrl, author,date} = this.props;
    return (
      <div>
        <div className="card">
          <img src={imageUrl} className="card-img-top" height={'200px'} width={'200px'} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title?title:''}</h5>
            <p className="card-text">
             {description? description:''}
            </p>
            <p className="card-text">
              <small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small>
            </p>
            <a href={newUrl? newUrl:''} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
