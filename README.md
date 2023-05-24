### Create new database

```bash
mongosh

# authentication source in admin database, default is admin
use admin
# Login with your credentials
db.auth('<username>', '<password>')

db.createUser({
  user: 'themartec_user',
  pwd: 'themartec_password',
  roles: [
    { role: 'dbOwner', db: 'themartec_db' },
  ],
})

use themartec_db
```

### Usage instructions

#### Frontend

```bash
cd frontend 
npm install
npm run start
```

Tech lib uses in frontend:

- React
- Redux
- Redux-thunk (To make the process of asynchronous data flow easier)
- React-router-dom
- Axios
- Material-ui

#### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Tech lib uses in backend:

- Laradock (docker for development, mostly I use for database mongodb in this assignment)
- nvm (node version management) => require node version 18
- Nodejs
- Express
- Mongoose
- Joi (for validation input data)
- Passport
- Bcryptjs (Hash & salt)
- Jsonwebtoken
- Nodemon (develop process)
- Mongoose-paginate-v2 (paginate data)

### Setup

- Firstly need to create a Facebook App (Type bussiness)
- Need to get your page ID [Here](https://www.facebook.com/help/android-app/1503421039731588)

### Mainly ideas

- Step 1: Create a new user on our system (aka a local user)
- Step 2: Login with the new user
- Step 3: Login to social network (Facebook, LinkedIn)
- Step 4: Get access token from sdk returned from Frontend side

- Step 5: Post new article to Backend side to save and post to social networks
(In this request should contain access token to aallow backend post new article to social networks)
(To optimize I think should save access token to database first, then use it to post new article later)

- I got a situation here, I found that can not post to my own wall with facebook restriction since (2018)
- So I will have to create a facebook page then post though that

- Step 6: After get access token from FE, now I have to exchange that token to page token to allow interact with page [Reference here](https://developers.facebook.com/docs/pages/access-tokens/)
