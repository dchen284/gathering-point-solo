
//external imports
import { Link } from "react-router-dom";

//interal imports
import './EventCard.css';
import BookmarkButton from "../BookmarkButton";

export default function EventCard({event}) {
    return (
        <Link key={event.id} to={`/events/${event.id}`}>
            <div className="eventCard">
                <div>
                    <img alt="standard" src="https://developer.mozilla.org/static/img/favicon144.png" />
                </div>
                <BookmarkButton className='bookmark-button' key={event.id}/>
                <p>ID: {event.id}</p>
                <p>Title: {event.title}</p>
                <p>Organizer: {event.organizerName}</p>
                <p>Start Time: {event.startTime}</p>
            </div>
        </Link>

    )
}