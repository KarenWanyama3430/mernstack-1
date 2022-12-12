import React, { Component } from "react";
import CommentItem from "./CommentItem";

export class CommentFeed extends Component {
  render() {
    const { postID, comments } = this.props;
    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postID={postID} />
    ));
  }
}

export default CommentFeed;
