FROM cypress/browsers:node16.17.1-chrome105-ff104-edge

WORKDIR /e2e
COPY . .
RUN CI=true npm ci
RUN CI=true ./node_modules/.bin/cypress install

CMD ./node_modules/.bin/cypress run --headless -b chrome
