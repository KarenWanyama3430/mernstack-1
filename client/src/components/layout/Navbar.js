import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { clearCurrentProfile } from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

export class Navbar extends Component {
  // componentDidMount() {
  //   if (this.handleLogoutClick) {
  //     this.props.history.push("/login");
  //   }
  // }
  handleLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/feed">
            Post Feed
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" onClick={this.handleLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/register">
            Sign Up
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark mb-4 ">
        <div className="container">
          <Link className="navbar-brand" to="#/">
            GeekHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/profiles">
                  {" "}
                  Developers
                </a>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  withRouter(Navbar)
);
