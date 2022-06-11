# Development Environment

## System Requirements

TBA.

## Configuration

The development environment can be used with Docker without configuration. (However, SSO login will not be available.)

### EVE SSO Configuration for Development

If you want to use EVE SSO for authentication, you need to create application credentials on [EVE's developer site](https://developers.eveonline.com/applications). Add them as environment variables in `./env.development` (project root):

| Variable Name      | Description                       |
| ------------------ | --------------------------------- |
| `SSO_CALLBACK_URL` | EVE SSO application callback URL. |
| `SSO_CLIENT_ID`    | EVE SSO application client ID.    |
| `SSO_SECRET_KEY`   | EVE SSO application secret key.   |

:::danger
Make sure not to commit your environment variable files to source control!
:::

## Usage

TBA.
