import React from "react";
import { Field } from "formik";

const Id = ({ errors, touched }) => {
  return (
    <React.Fragment>
      <Field name="id">
        {({ field }) => (
          <div className="field">
            <p className="control">
              <input
                type="hidden"
                {...field}
              />
            </p>
          </div>
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

export { Id };
