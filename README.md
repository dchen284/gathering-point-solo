## Welcome To Gathering Point
**Gathering Point** is an e-ticketing site (clone of Eventbrite), where users can sign up for tournaments for the game, Magic: the Gathering.


## Live Site
https://gathering-point.herokuapp.com/
![Home Page](https://i.imgur.com/b5IlXrn.png)

## Technologies Used
-   PostgreSQL
-   JavaScript
-   Express
-   Sequelize
-   React
-   Redux
-   Node.js
-   Heroku

## Documentation
[Database Schema](https://github.com/dchen284/gathering-point-solo/wiki/Database-Schema)

[Feature List](https://github.com/dchen284/gathering-point-solo/wiki/Feature-List)

[User Stories](https://github.com/dchen284/gathering-point-solo/wiki/User-Stories)

### Database Schema
![Database Structure](https://i.imgur.com/kqfWS50.png)

## Features

#### Events
* Events are divided into Categories (by tournament type).
* Users can click Events to go to individual Event pages for more details on that Event.
* Once logged in, Events can be created using the "Create an event" button on the Navigation bar.
* Once logged in, Events can be updated/deleted by the Event's owner, using buttons on the Event's page.
* Deleting an Event will cascade-delete the connected Tickets and Likes.

#### Registration/Tickets
* On each Event page, there is a Register button for creating a Ticket for the user.
* If a user that is not logged-in clicks the Register button, the log-in modal appears.
* Once logged in, when the user does not have a Ticket, clicking the Register button creates a Ticket.
* Once logged in, when the user does have a Ticket, the Register button becomes a "Registered! (Cancel Ticket)" button, which can be clicked to delete a Ticket.
* Once logged in, a user can view that user's Tickets via buttons on the Navigation bar.

#### Likes
* On each Event page, the home page, and the search page, there is a Like button for creating a Like for the user.
* If a user that is not logged-in clicks the Like button, the log-in modal appears.
* Once logged in, when the user does not have a Like, clicking the Register button creates a Like.
* Once logged in, when the user does have a Like, the Like button is highlighted, which can be clicked to delete a Like.
* Once logged in, a user can view that user's Tickets via buttons on the Navigation bar.

#### Categories
* Events on the home page and search page can be filtered by Category, using the clickable bar.

#### Search
The search bar can be used to search by the Event name and/or Event description.

## Challenges

#### Like Button

## Future Features
* Implementing AWS for uploading images, without the need for an external image hosting service.
* Implementing Google maps for depicting event locations.
