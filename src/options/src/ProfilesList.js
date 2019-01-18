import React, { Component } from "react";
import AppContext from "./AppContext";

import { Link } from "react-router-dom";
import { StorageService } from "./StorageService";
import _ from "lodash";

class ProfilesList extends Component {
  static contextType = AppContext;

  state = {
    profiles: []
  };

  async componentDidMount() {
    const profiles = await StorageService.get("LMI.profiles");

    this.setState({ profiles });
  }

  async deleteProfile(id) {
    const profiles = await StorageService.get("LMI.profiles");
    const index = _.findIndex(profiles, { id });
    profiles.splice(index, 1);
    await StorageService.set("LMI.profiles", profiles);
    this.setState({ profiles });
  }

  async toggleProfile(id) {
    const profiles = (await StorageService.get("LMI.profiles")) || [];
    const index = _.findIndex(profiles, { id });
    const profile = profiles[index];
    profile.isActive = !profile.isActive;
    profiles.splice(index, 1, profile);

    await StorageService.set("LMI.profiles", profiles);
    this.setState({ profiles });
  }
  render() {
    return (
      <section className="section">
        <div
          className="container content is-medium"
          style={{ paddingTop: "10px" }}
        >
          <div className="columns is-gapless">
            <div className="column is-1" />
            <div className="column is-11">
              <h2>Profiles list:</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Title</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                  {this.state.profiles.map((profile, i) => (
                    <tr key={i}>
                      <td>{profile.title}</td>
                      <td>
                        <div className="field">
                          <input
                            id={`switchRoundedInfo[${profile.id}]`}
                            type="checkbox"
                            name={`switchRoundedInfo[${profile.id}]`}
                            className="switch is-rounded is-info"
                            onChange={() => {}}
                            {...(profile.isActive === true
                              ? { defaultChecked: true }
                              : { defaultChecked: false })}
                          />
                          <label
                            style={{ cursor: "pointer" }}
                            htmlFor={`switchRoundedInfo[${profile.id}]`}
                            onClick={() => this.toggleProfile(profile.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <Link to={`/profile/edit/${profile.id}`}>
                          <i className="far fa-edit" /> edit
                        </Link>
                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <a onClick={() => this.deleteProfile(profile.id)}>
                          <i className="fas fa-trash" /> delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </thead>
              </table>
              <div className="level level-item level-right">
                <Link to="/profile/add">
                  <button className="button is-primary">New profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfilesList;
