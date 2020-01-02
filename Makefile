install: install-deps

start:
	heroku local

start-backend:
	NODE_ENV=production node dist/bin/slack.js

develop:
	heroku local -f Procfile.dev

develop-backend:
	NODE_ENV=development npx nodemon --exec npx babel-node server/bin/slack.js

develop-frontend:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

.PHONY: test
