FROM cypress/browsers:node14.17.0-chrome88-ff89

WORKDIR /e2e
COPY . .
RUN CI=true npm ci
RUN CI=true ./node_modules/.bin/cypress install

CMD ./node_modules/.bin/cypress run --headless -b chrome
