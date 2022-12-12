import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";

export class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={profile.user.avatar}
              alt={profile.user.name}
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>{isEmpty(profile.location) ? null : profile.location}</p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>

          <div style={{ marginTop: "10px" }} className="col-md-3 d-md-block">
            <h4 style={{ textAlign: "center" }}>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
