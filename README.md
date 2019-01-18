# Let me in!

## About
`Let me in!` is a Google Chrome extension, which helps you to be automatically logged in, if your website uses JWT for authorisation/authentication.

This approach can be used by developers, when you need to develop a component which depends on the auth, but the service which can sign you JWT token is not available for some reason. For example - during the local development.

## Configuration
To enable login, you need to create a profile.
Each profile consists from the next configuration options:
* `Title` - name of the profile
* `Websites list` - list of the regular expressions. If any of them matches the url of the tab - profile is considered as matching and auth attempt will be performed.
* `Secret` - secret or private key, which is used to sign the `JWT`
* `Algorithm` - algorithm which is used to sign `JWT`
* `JWT tempalte` - `JSON` object, which is used as base for the `JWT` token
* `Run at` - when the auth `javascript` should be run
* `js code` - the actual code, which should auth you into the application. In that javascript code you can use two placeholders:
  * `%JWT%` - will be substituted with the real token
  * `%JWT_PAYLOAD%` - will be substituted with an object which holds `JWT` payload