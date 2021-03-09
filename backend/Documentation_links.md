# User management
https://docs.google.com/spreadsheets/d/1Y7STJ8kbzmTzO1fx2vjHh8Z3RHo2Ehh_cZQkcjovj2k/edit?usp=sharing

ENV: dbURL='mongodb://localhost:27017/lead_management'
JWT_SECRET_KEY='lead_management'



**Backend code setup steps:-**

1. clone the backend code
2. go to the project directory
3. create enivironment variables and congigure the following things
  a) dbURL='mongodb://localhost:27017/lead_management'  // change the ip and port based on your configuration.
  b) JWT_SECRET_KEY='lead_management'  //Secrete key for authentication  and you can change by your wish.
  c) PORT='3000' // Setup port which server is listining and you can also change by your configuration
5. run npm install in the terminal  //to instal the depencencies.
6. rum npm start // To start the Node server

Now the server is running on **http://yourip:port**
