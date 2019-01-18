import React, { Component } from "react";
import { Formik, Form } from "formik";

import { Title } from "./Title";
import { Id } from "./Id";
import { Algorithm } from "./Algorithm";
import { Secret } from "./Secret";
import { WebsitesList } from "./WebsitesList";
import { JWTTemplate } from "./JWTTemplate";
import { JSCode } from "./JSCode";
import { RunAt } from "./RunAt";

import { StorageService } from "../../StorageService";
import _ from "lodash";

class ProfileForm extends Component {
  state = {
    id: "",
    title: "",
    websitesList: "",
    secret: "",
    algorithm: "RS256",
    JWTTemplate: "",
    runAt: "document_start",
    JSCode: ""
  };

  constructor() {
    super();
  }

  async componentDidMount() {
    const profiles = await StorageService.get("LMI.profiles");
    const values = _.find(profiles, { id: this.props.id });

    if (!_.isEmpty(values)) {
      this.form.setFieldValue("id", values.id);
      this.form.setFieldValue("title", values.title);
      this.form.setFieldValue("websitesList", values.websitesList);
      this.form.setFieldValue("secret", values.secret);
      this.form.setFieldValue("algorithm", values.algorithm);
      this.setJWTTemplateContent(values.JWTTemplate);
      this.form.setFieldValue("runAt", values.runAt);
      this.setJSCodeContent(values.JSCode);
    }
  }

  setJWTTemplateContent(value) {
    this.setState({ JWTTemplate: value });
    this.form.setFieldValue("JWTTemplate", value);
    this.form.setTouched({ JWTTemplate: true });
  }

  setJSCodeContent(value) {
    this.setState({ JSCode: value });
    this.form.setFieldValue("JSCode", value);
    this.form.setTouched({ JSCode: true });
  }
  render() {
    const { onSubmit } = this.props;
    const initialValues = {
      title: this.state.title,
      id: this.state.id,
      websitesList: this.state.websitesList,
      secret: this.state.secret,
      algorithm: this.state.algorithm,
      JWTTemplate: this.state.JWTTemplate,
      runAt: this.state.runAt,
      JSCode: this.state.JSCode
    };

    return (
      <Formik
        initialValues={initialValues}
        isInitialValid={(() => {
          return _.findKey(initialValues, r => !_.isUndefined(r))
            ? true
            : false;
        })()}
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};
          return errors;
        }}
      >
        {({
          isValid,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
          setTouched,
          values,
          validateForm
        }) => {
          this.form = {
            setFieldValue,
            setTouched,
            values,
            validateForm,
            isValid,
            isSubmitting
          };
          return (
            <Form>
              <Title errors={errors.title} touched={touched.title} />
              <Id errors={errors.id} touched={touched.id} />
              <WebsitesList
                errors={errors.websitesList}
                touched={touched.websitesList}
              />
              <Secret errors={errors.secret} touched={touched.secret} />
              <Algorithm
                errors={errors.algorithm}
                touched={touched.algorithm}
              />
              <JWTTemplate
                onChange={value => {
                  this.setJWTTemplateContent(value);
                }}
                errors={errors.JWTTemplate}
                touched={touched.JWTTemplate}
                value={values.JWTTemplate}
              />
              <RunAt
                value={values.runAt}
                errors={errors.runAt}
                touched={touched.runAt}
              />
              <JSCode
                onChange={value => {
                  this.setJSCodeContent(value);
                }}
                errors={errors.JSCode}
                touched={touched.JSCode}
                value={values.JSCode}
              />
              <div className="level">
                <div className="level-item level-right">
                  <button
                    className={[
                      "button is-primary is-pulled-right",
                      isSubmitting ? "is-loading" : ""
                    ].join(" ")}
                    style={{ marginTop: "10px" }}
                    type="submit"
                    {...(!isValid || isSubmitting ? { disabled: true } : null)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export { ProfileForm };
