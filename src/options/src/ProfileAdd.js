import React, { Component } from "react";
import AppContext from "./AppContext";

import { Link } from "react-router-dom";

import { ProfileForm } from "./components/ProfileForm";
import { StorageService } from "./StorageService";
import nanoid from "nanoid";

class ProfileAdd extends Component {
  static contextType = AppContext;
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
              <h2>Add profile:</h2>
              <ProfileForm
                onSubmit={async (values, formikBag) => {
                  const profiles =
                    (await StorageService.get("LMI.profiles")) || [];
                  values.id = nanoid();
                  values.isActive = true;
                  profiles.push(values);

                  await StorageService.set("LMI.profiles", profiles);
                  setTimeout(() => formikBag.setSubmitting(false), 500);
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileAdd;
