import React from "react";
import { Field } from "formik";

const Algorithm = ({ errors, touched }) => {
  return (
    <React.Fragment>
      <Field name="algorithm">
        {({ field }) => (
          <React.Fragment>
            <label className="label">Algorithm</label>
            <div className="field">
              <p className="control">
                <div className="select is-fullwidth">
                  <select
                    className={["input", errors ? "is-danger" : undefined].join(
                      " "
                    )}
                    placeholder="Algorithm"
                    {...field}
                  >
                    {/* <option value="HS256">HS256</option>
                    <option value="HS384">HS384</option>
                    <option value="HS512">HS512</option> */}
                    <option value="RS256">RS256</option>
                    {/* <option value="RS384">RS384</option>
                    <option value="RS512">RS512</option>
                    <option value="ES256">ES256</option>
                    <option value="ES384">ES384</option>
                    <option value="ES512">ES512</option>
                    <option value="PS256">PS256</option>
                    <option value="PS384">PS384</option> */}
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

export { Algorithm };
