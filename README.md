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
![Imgur](https://i.imgur.com/Zh1bUTf.png)
* Events are divided into Categories (by tournament type).
* Users can click Events to go to individual Event pages for more details on that Event.
* Once logged in, Events can be created using the "Create an event" button on the Navigation bar.
* Once logged in, Events can be updated/deleted by the Event's owner, using buttons on the Event's page.
* Deleting an Event will cascade-delete the connected Tickets and Likes.

#### Registration/Tickets
![Imgur](https://i.imgur.com/veJ9QtZ.gif)
* On each Event page, there is a Register button for creating a Ticket for the user.
* If a user that is not logged-in clicks the Register button, the log-in modal appears.
* Once logged in, when the user does not have a Ticket, clicking the Register button creates a Ticket.
* Once logged in, when the user does have a Ticket, the Register button becomes a "Registered! (Cancel Ticket)" button, which can be clicked to delete a Ticket.
* Once logged in, a user can view that user's Tickets via buttons on the Navigation bar.

#### Likes
![Imgur](https://i.imgur.com/jX79tzJ.gif)
* On each Event page, the home page, and the search page, there is a Like button for creating a Like for the user.
* If a user that is not logged-in clicks the Like button, the log-in modal appears.
* Once logged in, when the user does not have a Like, clicking the Register button creates a Like.
* Once logged in, when the user does have a Like, the Like button is highlighted, which can be clicked to delete a Like.
* Once logged in, a user can view that user's Likes via buttons on the Navigation bar.

#### Categories
![Imgur](https://i.imgur.com/0KsXebN.gif)
* Events on the home page and search page can be filtered by Category, using the clickable bar.

#### Search
![Imgur](https://i.imgur.com/VF5QiRR.png)
* The search bar can be used to search by the Event name and/or Event description.

## Challenges

#### Like Button
The Like button for this website handles a number of cases:
1) If there is no user logged in, clicking the button opens the log-in modal with a message.
2) Upon login, the button is highlighted if the user has an existing Like, or not highlighted if the user does not have an existing Like.
3) When logged in, clicking the button toggles if there is an existing Like.  This button state needs to appear on the home page and the Event page.
4) Upon logout, all buttons need to be not highlighted.
5) If the button is on the Event card on the home/search page, have a bordered circle.  If the button is on the Event page, do not have a bordered circle.

Cases are addressed as follows:
1) Take login status from the Redux store, use if statements to open the modal with a message if there is no user logged in.
2) Use React's useEffect hook to check for changes in Like status, such as when logging in.
3) Use React's useEffect hook and Redux store to check for changes in Like status, such as when clicking the button.
4) Use React's useEffect hook to check for changes in Like status, such as when logging out.
5) Pass in a prop for the BookmarkButton React component, which can set the border property.

Code snippet of the BookmarkButton React component:

```js
export default function BookmarkButton({ borderStyle, eventId }) { 
// 5) borderStyle prop to control border color

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [hasBookmark, setHasBookmark] = useState(false);
    const sessionUser = useSelector( (state) => state.session.user );
    
    // 2), 3) and 4) useEffect triggers on changes in logged-in status and bookmark status
    useEffect(()=>{
        if (!sessionUser) {setHasBookmark(false)}
        else {
            if (sessionUser?.UserBookmarks[eventId]) {setHasBookmark(true)}
        }
    },[eventId, sessionUser])

    //1) Opens login modal if no one is logged in, and 3) Store Like status in Redux store
    function clickBookmarkButton() {
        if (sessionUser) {
            if (!hasBookmark) {dispatch(sessionActions.fetchAddBookmark(eventId, sessionUser.id))}
            else {dispatch(sessionActions.fetchRemoveBookmark(eventId, sessionUser.id))}
            setHasBookmark((prevHasBookmark) => !prevHasBookmark);
        }
        else {
            setShowModal(true); 
            // 1) No user logged in, so open modal.
        }
    }

    return (
        <>
            <div
            className={borderStyle === "grey" ? "bookmark-button border-grey" : "bookmark-button"}
            onClick={clickBookmarkButton}
            >
                <i className={hasBookmark ? "fas fa-heart" : "far fa-heart"}></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm
                    setShowModal={setShowModal}
                    loginWarning='Please Log In to save Likes.' 
                    // 1) Message if button is clicked without being logged in
                    />
                </Modal>
            )}
        </>
    );
}
```

## Future Features
* Implementing AWS for uploading images, without the need for an external image hosting service.
* Implementing Google maps for depicting event locations.
