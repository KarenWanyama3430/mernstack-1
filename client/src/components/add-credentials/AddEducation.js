import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileAction";

export class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleCheck = e => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field Of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.handleChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.handleChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    id="current"
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    value={this.state.current}
                    className="form-check-input"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Date
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
