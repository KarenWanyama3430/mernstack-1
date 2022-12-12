import React, { Component } from "react";
import { addComment } from "../../actions/PostAction";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

export class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postID } = this.props;
    const newComment = {
      user: user.name,
      avatar: user.avatar,
      text: this.state.text
    };
    this.props.addComment(postID, newComment);
    this.setState({
      text: ""
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add a Comment...</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(PostForm);
