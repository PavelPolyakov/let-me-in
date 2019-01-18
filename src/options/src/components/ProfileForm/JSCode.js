import React from "react";
import AceEditor from "react-ace";
import { Field } from "formik";
import "brace/mode/javascript";
import "brace/theme/solarized_light";

const JSCode = ({ onLoad, onChange, value, errors, touched }) => {
  return (
    <Field name="JSCode">
      {({ field }) => (
        <React.Fragment>
          <label className="label">js code</label>
          <div className="field">
            <p className="control">
              <AceEditor
                mode="javascript"
                theme="solarized_light"
                onChange={onChange}
                tabSize={2}
                editorProps={{ $blockScrolling: true }}
                value={value}
                height="400px"
                width="100%"
              />
              <input type="hidden" {...field} />
              {errors && touched ? (
                <article
                  className="message is-danger"
                  style={{ marginTop: "10px" }}
                >
                  <div className="message-body">{errors}</div>
                </article>
              ) : null}
            </p>
          </div>
        </React.Fragment>
      )}
    </Field>
  );
};

export { JSCode };
