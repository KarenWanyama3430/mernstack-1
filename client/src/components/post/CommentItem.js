import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/PostAction";

export class CommentItem extends Component {
  handleDeleteClick = (postID, commentID) => {
    this.props.deleteComment(postID, commentID);
  };
  render() {
    const { auth, comment, postID } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />

            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={() => this.handleDeleteClick(postID, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                Delete Comment
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
