import React, { Component } from "react";

export class ProfileGithub extends Component {
  state = {
    clientId: "f92a4fe3b6ebec667326",
    clientSecret: "5b8d15b18f89d751a207f36c17357b0a57257e49",
    count: 5,
    sort: "created: asc",
    repos: []
  };
  componentDidMount() {
    const { githubusername } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                rel="noopener noreferrer"
                target="_blank"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>

            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>

            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest GitHub Repos</h3>
        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;
