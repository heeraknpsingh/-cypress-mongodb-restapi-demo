# cypress-mongodb-restapi-demo
This repository is creating rest API for mongodb and validate API ends with cypress

npm run testing

kill -9 `lsof -i TCP:3000 | awk '/LISTEN/{print $2}'`
