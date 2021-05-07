# Dustly server 

Front-end repo: https://github.com/bkronemeijer/clean-client

### Entity relation diagram
![db-diagram](https://github.com/bkronemeijer/clean-server/blob/master/Entity_diagram_dustly.png)

### Setup
Backend is available on https://dustly-backend.herokuapp.com 

#### Set up locally
- clone repository
- in terminal, navigate to cloned repository
- declare the port you would like to run your server on (`4000` is a good option)
- run the nodemon development server with `npm run dev` 

### API routes
- /user
  - GET user/       
  - PATCH user/ `userId`, `name`, `wantsMail` 
  - POST user/delete `userId`
- /task
  - POST task/static `householdId` 
  - POST task/current `householdId`, `recurrence`
  - POST task/delete `taskId`
  - POST task/add `userId`, `householdId`, `deadline`, `title`, `description`
- /household
  - POST /household `householdId`
  - PATCH /household `householdId`, `name`, `startDate`, `recurrence`
- POST /login `email`, `password`
- POST /signup `name`, `email`, `password`, `action`, `householdName`, `startDate`, `recurrence`
- GET /me 
