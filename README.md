# Movie List React Challenge

This is a basic movie listing app, using the MERN stack.

_This is a challenge for an interview._
<br><br>

## Dependencies

- NPM

## Setup

### **Repository**

To setup this application, let's first clone the repository using the following command:

`git clone https://github.com/macmartins/movie-list.git`

### **Server**

After we have a local copy, let's handle the server setup:

1. Open a CLI window, navigate to the server folder using: `cd server`
2. Then, install the server dependencies using: `npm install`
3. Then, copy the `.env.local` file as `.env` so the environment variables are setup
4. Then to run the server do: `npm start`

After a few seconds, you should see something like this:

![Server running in a CLI](/assets/images/serverCLI.png)

Nice! The server is working! You should be able to access the server in the localhost using the default port, for example: <a href="http:localhost:3001/api/movies" target="_blank">http:localhost:3001/api/movies</a>

**Note**: At this point, you can also access <a href="http:localhost:3001" target="_blank">http:localhost:3001</a> to go to the application.<br>
This is because the server is hosting the latest build of the app.<br>
It was done with the intent to deploy publicly. You can see access it <a href="https://movie-list-challenge.onrender.com" target="_blank">here</a>

### **Client**
**Note**: This section can be skipped if you don't want a seperate CLI for the client, however whenever you change something it won't update it since the hosted application is the most recent build (Static).<br>
I recommend having 2 CLI's for the server and client, guaranteeing you're running at runtime.<br><br>
Last but not least, let's handle the client setup:

1. Open another CLI window, navigate to the client folder using: `cd client`
2. Then, install the app dependencies using: `npm install`
3. Then, copy the `.env.local` file as `.env` so the environment variables are setup
4. Lastly, run the client app using: `npm start`

After a few seconds, you should see something like this:

![Client running in a CLI](/assets/images/clientCLI.png)

Great! The application is up and running!
Just click/paste the URL and start using the application!
