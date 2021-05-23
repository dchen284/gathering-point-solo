import BookmarkButton from "../BookmarkButton";
import { Link } from "react-router-dom";

export default function EventCard({event}) {
    return (
        <Link key={event.id} to={`/events/${event.id}`}>
            <div className="eventCard">
                <div>
                    <img alt="standard" src="https://developer.mozilla.org/static/img/favicon144.png" />
                </div>
                <BookmarkButton key={event.id}/>
                <p>Title: {event.title}</p>
                <p>Organizer: {event.organizerName}</p>
                <p>Start Time: {event.startTime}</p>
            </div>
        </Link>

    )
}