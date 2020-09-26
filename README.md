<div style="text-align: center">
  <img src="https://www.harvestprofit.com/logo.png" alt="Harvest Profit"></img>
</div>

This project consists of two separate apps, [the backend](./backend) and [the frontend](./frontend).

The API is a rails API-only application, responsible for handling everything the database is serving, and the App is for our react based application.

## Getting Started

### Prerequisites
Please install the following:
- [Geos](https://trac.osgeo.org/geos/)
- [Ruby](https://www.ruby-lang.org/en/downloads/)
  - Feel free to use [RVM](https://rvm.io/) or [Rbenv (recommended)](https://github.com/rbenv/rbenv) for version management
- [NodeJS](https://nodejs.org/en/)
  - Feel free to use [NVM](https://github.com/creationix/nvm) or [Nodenv (recommended)](https://github.com/nodenv/nodenv) for version management
- [Postgres.app](https://postgresapp.com/)

In order to run the project in development, you'll need to install the
required RubyGems, NPM modules, and set up your Postgres database:

```bash
# Install Geos
brew install geos
# Install JS and Ruby dependencies
yarn install
# Setup the database
yarn db:setup
```

### Running in Development

A foreman command is included to start up both the front and back end:

```bash
yarn start
```

# License
This project is [MIT Licensed](./LICENSE.md)
