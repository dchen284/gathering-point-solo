
//external imports
import { Link } from "react-router-dom";

//interal imports
import './EventCard.css';
import BookmarkButton from "../BookmarkButton";

export default function EventCard({event}) {
    return (
        <Link key={event.id} to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
            <div className="event-card">
                <div>
                    <img className="event-card__image" alt="event" src={event.imgUrl} />
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