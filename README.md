# Todo App von Fabian Kostadinov

## How to start the application
After cloning into your local Git repository, first install the required Node packages. Then you can use `npm start` command to start the ExpressJS server.

## Client-side code
Client-side code can be found in folder /public.

/public/assets: Contains CSS, Favicon and Font Awesome
/public/js: Contains own Javascript classes.
   |
   \controllers: Contains main client controller
   \services: Contains services for communication with server plus some factory classes for creating model instances


## Server-side code
Server-side code can be found everywhere other than /public folder.
   |
   \package.json & package-lock.json: Node files for 
   \index.js: Main server-side entry point for ExpressJS 
   \routes: Contains server-side routes for ExpressJS server
   \services: Contains server-side code for accessing and storing items in the DB
   \data: A dynamically created folder containing the .db file for NEDB