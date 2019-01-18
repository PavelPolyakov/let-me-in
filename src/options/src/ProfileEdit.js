import React, { Component } from "react";
import AppContext from "./AppContext";

import { Link } from "react-router-dom";

import { ProfileForm } from "./components/ProfileForm";
import { StorageService } from "./StorageService";
import _ from "lodash";

class ProfileEdit extends Component {
  static contextType = AppContext;

  state = {
    id: undefined
  };

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.setState({ id });
  }
  render() {
    return (
      <section className="section">
        <div
          className="container content is-medium"
          style={{ paddingTop: "10px" }}
        >
          <div className="columns is-gapless">
            <div class="column is-1">
              <h2>
                <Link to="/">&larr;</Link>
              </h2>
            </div>
            <div class="column is-11">
              <h2>Edit profile:</h2>
              <ProfileForm
                onSubmit={async (values, formikBag) => {
                  const profiles =
                    (await StorageService.get("LMI.profiles")) || [];
                  const index = _.findIndex(profiles, { id: values.id });
                  const profile = profiles[index];
                  values.isActive = profile.isActive;
                  profiles.splice(index, 1, values);

                  await StorageService.set("LMI.profiles", profiles);
                  setTimeout(() => formikBag.setSubmitting(false), 300);
                }}
                id={this.state.id}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileEdit;
