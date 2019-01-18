import React from "react";
import { Field } from "formik";

const WebsitesList = ({ errors, touched }) => {
  return (
    <React.Fragment>
      <Field name="websitesList">
        {({ field }) => (
          <React.Fragment>
            <label className="label">Websites list</label>
            <div className="field">
              <div className="control">
                <textarea
                  rows="5"
                  className={[
                    "textarea",
                    errors ? "is-danger" : undefined
                  ].join(" ")}
                  placeholder="Websites list"
                  {...field}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </Field>
      {errors && touched ? (
        <article className="message is-danger" style={{ marginTop: "10px" }}>
          <div className="message-body">{errors}</div>
        </article>
      ) : null}
    </React.Fragment>
  );
};

export { WebsitesList };
