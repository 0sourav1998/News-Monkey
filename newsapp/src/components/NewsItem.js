import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, urlToImage, url, author, date, source } =
      this.props;
    return (
      <div className="card" style={{ width: "17rem", height: "32rem" }}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img
          src={urlToImage}
          className="card-img-top p-3"
          alt="..."
          style={{ height: "270px", width: "270px" }}
        />
        <div className="card-body bg-light">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a target="blank" href={url} className="btn btn-primary pb-2">
            Read More
          </a>
          <p className="card-text">
            <small className="text-body-secondary my-2">
              By {!author ? "Unknown" : author} On{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default NewsItem;
