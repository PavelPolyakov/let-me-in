import React, { Component } from "react";
import AppContext from "./AppContext";

import { StorageService } from "./StorageService";
import _ from "lodash";

class Default extends Component {
  static contextType = AppContext;

  state = {
    profiles: [],
    switchRoundedInfo: {}
  };

  async componentDidMount() {
    const profiles = await StorageService.get("LMI.profiles");

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
        {this.state.profiles.length === 0 ? (
          <article class="message is-info">
            <div class="message-body">
              Please, add profiles first. You can do this on the extension's
              options page.
            </div>
          </article>
        ) : null}
        {this.state.profiles.map((profile, i) => (
          <div className="level is-mobile" key={i}>
            <div>{profile.title}</div>
            <div>
              <div className="field">
                <input
                  id={`switchRoundedInfo[${profile.id}]`}
                  type="checkbox"
                  name={`switchRoundedInfo[${profile.id}]`}
                  className="switch is-rounded is-info"
                  onChange={() => {}}
                  {...(profile.isActive
                    ? { defaultChecked: true }
                    : { defaultChecked: false })}
                />
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor={`switchRoundedInfo[${profile.id}]`}
                  onClick={() => this.toggleProfile(profile.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default Default;
