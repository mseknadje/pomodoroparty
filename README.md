## Project details

#### Project name

#####Pomodoro Party

#### Project description

###### We build a pomodoro timer app that you can share with friends and track your TODO list. The app has a login system, a dashboard, and lets the user select how long they'd like to work for. 

## Design choices

###### Our App class is the main high-level class of the program. From there, we have several classes which represent different pages in our program, for example, the login page, the register page, the dashboard page, and the party page. The party page is where the majority of our functionality is, and it contains our pomdoro timer and todo list, which each have their own classes. 

###### We didn't use any particular data structures since the majority of our project is on the frontend. We used a realtime database and an authetication database in firebase though to handle our backend and store/update user data. 

#### Noteworthy Design Decisions

###### We set up a realtime database in firebase that keeps track of the current user sessions and allows other users to join someone's session. We also use a firebase database to store our user's login and account information. 


#### Build and run your program

###### In your terminal navigate to the src directory and run the following command: npm start
