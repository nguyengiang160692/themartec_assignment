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
- need to create Configuaration with permissions
  email
  pages_manage_posts
  pages_show_list
  pages_read_engagement
  pages_manage_engagement
  pages_read_user_content
- Need to get your page ID [Here](https://www.facebook.com/help/android-app/1503421039731588)


### How to use (Basic flow)
- Step 1: Create a new user on our system (aka a local user)
- Step 2: Login with the new user

### Mainly ideas (For facebook)
- I got a situation here, I found that can not post to my own wall with facebook restriction since (2018)
- So I will have to create a facebook page then post though that

- Step 3: Login to social network
  - On frontend side the SDK will handle login process with given configuration (Facebook configuration scope), then facebook return to us short-live token, then send that token to backend side to exchange to long-live token (Because is require app_secret_key so we do on backend) and also exchange for page-token (to post on page) [Reference here](https://developers.facebook.com/docs/pages/access-tokens/)
  
- Step 4: Post new article to Backend side to save and post to social networks (we have long live token & page token on previous step), after success posted there is returned post_id, so we can continue to fetch likes share comments count on cronjob schedule

### Mainly ideas (For Linkedin)

Because linkedin dont have sdk so We have to handle Oauth 2 process manually [Reference here](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS1)

- Step 1: On frontend we have to redirect user browser to linkedin login page with some params
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID^&redirect_uri=YOUR_REDIRECT_URI^&state=YOUR_STATE^&scope=YOUR_SCOPE
  - after user successfully approved, linkedin will redirect to your redirect_uri with code and state params

- Step 2: 





