# The Martec Assignment

# Table of contents

1. [Introduction](#0000)
1. [Stack and libraries](#0001)
1. [Setup app](#0002)
1. [Setup Social applications](#0003)
    1. [Facebook App](#0004)
    1. [Linkedin App](#0005)
1. [TODO](#0006)

## Introduction <a name="0000"></a>

<p>
  Basically, I have to create a web application that allows users to post articles to social networks (Facebook, Linkedin) and fetch likes, shares, comments count of that post.
</p>

---

## Stack & libraries <a name="0001"></a>

### Frontend

- React
- Redux
- Redux-thunk (To make the process of asynchronous data flow easier)
- React-router-dom
- Axios
- Material-UI

### Backend

- Laradock (docker for development, mostly I use for database mongodb in this assignment)
- nvm (node version management) => require node version 18
- Nodejs
- Express
- Mongoose
- Joi (for validation input data)
- Passport
- Bcryptjs (Hash & salt)
- Jsonwebtoken
- mocha (for unit test)
- supertest (for unit test)

### Initial setup <a name="0002"></a>

```bash
cd frontend 
cp .env.example .env
yarn

cd backend
cp .env.example .env
yarn
```

### Create new database using mongosh (Or you can create any way you want)

```bash
mongosh --authenticationDatabase <your_auth_source_db> -u <username> -p <password>

use '<your_auth_source_db>'

db.createUser({
  user: 'themartec_user',
  pwd: 'themartec_password',
  roles: [
    { role: 'dbOwner', db: 'themartec_db' },
  ],
})
```

Please set .env variable (/src/backend/.env)
<ul>
  <li>MONGO_HOST=your_db_host</li>
  <li>MONGO_PORT=27017</li>
  <li>MONGO_SOURCE=themartec_db</li>
  <li>MONGO_USERNAME=themartec_user</li>
  <li>MONGO_PASSWORD=themartec_password</li>
</ul>

## Setup Social applications <a name="0003"></a>

### Facebook App <a name="0004"></a>

  <ol>
    <li>
      Create new Facebook App (Type bussiness)
      <ul>
        <li>
          Create new product "Facebook Login For Bussiness"
          <ul>
          <li>
              Create Configuration for that product contains follow permissions
              <ul>
                  <li>email</li>
                  <li>pages_manage_posts</li>
                  <li>pages_show_list</li>
                  <li>pages_read_engagement</li>
                  <li>pages_manage_engagement</li>
                  <li>pages_read_user_content</li>
              </ul>
          </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      After created app, set permissions, please set .env variable at <b>/src/backend/.env</b>
      <ul>
        <li>FACEBOOK_APP_ID=your_app_id</li>
        <li>FACEBOOK_APP_SECRET=your_app_secret</li>
      </ul>
    </li>
    <li>
      Set .env variable at <b>/src/frontent/.env</b>
      <ul>
        <li>
          REACT_APP_FACEBOOK_CLIENT_ID=your_app_id
        </li>
        <li>REACT_APP_LOGIN_CONFIGURATION_ID=your_configuration_id</li>
      </ul>
    </li>
    <li>
      Setup the page you want to post .env variable at <b>/src/backend/.env</b>
      <ul>
        <li>FACEBOOK_PAGE_ID=your_page_id</li>
        <li>
        Need to get your page ID, please referer <a href="https://www.facebook.com/help/android-app/1503421039731588">here</a>
        </li>
      </ul>
    </li>
  </ol>

### Linkedin App <a name="0005"></a>

  <ol>
    <li>
    Create new Linkedin App & Company
      <ul>
        <li>
          Add products
          <ul>
            <li>Share on Linkedin</li>
            <li>Sign In with Linkedin</li>
          </ul>
        </li>
        <li>
          Setup "Authorized redirect URLs for your app" for get access_token after successfully login by user
            <ul>
              <li>http://localhost:3005/api/auth/linkedin/callback (our backend side)</li>
            </ul>
        </li>
      </ul>  
    </li>
    <li>
      After add products, set permissions, please set .env variable at <b>/src/backend/.env</b>
      <ul>
        <li>
          LINKEDIN_CLIENT_ID=app_client_id
        </li>
        <li>
          LINKEDIN_CLIENT_SECRET=app_client_secret
        </li>
        <li>
          LINKEDIN_REDIRECT_URI=http://localhost:3005/api/auth/linkedin/callback
        </li>
      </ul>  
    </li>
     <li>
      After add products, set permissions, please set .env variable at <b>/src/backend/.env</b>
      <ul>
        <li>
          REACT_APP_LINKEDIN_CLIENT_ID=app_client_id
        </li>
        <li>
           REACT_APP_LINKEDIN_REDIRECT_URI=http://localhost:3005/api/auth/linkedin/callback
        </li>
      </ul>  
    </li>
  </ol>

### Mainly ideas (For facebook)

### Mainly ideas (For Linkedin)

### Thing to do

- Remove all config in .env.example (FE, BE), I will give the reviewer my .env file
- Remove lauch.json in .vscode folder or remove enviroment variables only
- Prepare a  access_token in .env for Facebook and Linkedin (Because the reviewer may not have permission to post)
- Write unit test for backend
