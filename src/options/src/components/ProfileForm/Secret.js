import React from "react";
import { Field } from "formik";

const Secret = ({ errors, touched }) => {
  return (
    <React.Fragment>
      <Field name="secret">
        {({ field }) => (
          <React.Fragment>
            <label className="label">Secret</label>
            <div className="field">
              <div className="control">
                <textarea
                  rows="5"
                  className={[
                    "textarea",
                    errors ? "is-danger" : undefined
                  ].join(" ")}
                  placeholder="Secret"
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

export { Secret };
