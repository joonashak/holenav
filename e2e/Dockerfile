FROM cypress/browsers:node18.12.0-chrome107

WORKDIR /e2e
COPY . .
RUN CI=true npm ci
RUN CI=true ./node_modules/.bin/cypress install

CMD ./node_modules/.bin/cypress run --headless -b chrome
