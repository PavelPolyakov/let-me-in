import React from "react";
import { Field } from "formik";

const Title = ({ errors, touched }) => {
  return (
    <React.Fragment>
      <Field name="title">
        {({ field }) => (
          <React.Fragment>
            <label className="label" for="title">Title</label>
            <div className="field">
              <p className="control">
                <input
                  className={["input", errors ? "is-danger" : undefined].join(
                    " "
                  )}
                  placeholder="Title"
                  {...field}
                />
              </p>
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

export { Title };
