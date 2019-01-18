import React from "react";
import { Field } from "formik";
const RunAt = ({ value, errors, touched }) => {
  return (
    <React.Fragment>
      <Field name="runAt">
        {({ field }) => (
          <React.Fragment>
            <label className="label">Run at</label>
            <div className="field">
              <p className="control">
                <div className="select is-fullwidth">
                  <select
                    className={["input", errors ? "is-danger" : undefined].join(
                      " "
                    )}
                    placeholder="Run at"
                    {...field}
                  >
                    <option value="document_start">Document start</option>
                    <option value="document_end">Document end</option>
                    <option value="document_idle">Document idle</option>
                  </select>
                </div>
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

export { RunAt };
