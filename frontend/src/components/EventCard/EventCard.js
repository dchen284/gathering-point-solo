
//external imports
import { Link } from "react-router-dom";

//interal imports
import './EventCard.css';
import BookmarkButton from "../BookmarkButton";
import formatTime from '../../utils/format-time';

export default function EventCard({event}) {

    //template: 1998-05-24T23:22:37

    // const strDate = event.startTime.slice(0, 10);
    // const strHour = event.startTime.slice(11, 13);
    // const strMinutes = event.startTime.slice(14, 16);

    // let strStartTime;

    // if (+strHour <= 12) {
    //     strStartTime = `${strDate}, ${strHour}:${strMinutes} AM`;
    // }
    // else if (+strHour >= 13 && +strHour <= 21)
    // {
    //     strStartTime = `${strDate}, 0${+strHour-12}:${strMinutes} PM`;
    // }
    // else {
    //     strStartTime = `${strDate}, ${+strHour-12}:${strMinutes} PM`;
    // }


    return (
        // <Link key={event.id} to={`/events/${event.id}`}>
        <div key={event.id} className="event-card-container">
            <div className="event-card">

                <div>
                    <Link to={`/events/${event.id}`}>
                        <img className="event-card__image" alt="event" src={event.imgUrl ? event.imgUrl : "/images/thb-278-plains.jpeg"} />
                    </Link>
                </div>


                <div className='event-card__bookmark-button-container'>
                    <BookmarkButton borderStyle="grey" eventId={event.id}/>
                </div>

                <div className="event-card__data">
                    <Link to={`/events/${event.id}`}>
                        <p className="event-card__title">{event.title.toUpperCase()}</p>
                        <p className="event-card__start-time">{formatTime(event.startTime)}</p>
                        <p className="event-card__organizer">{event.organizerName} • {event.location}</p>
                    </Link>
                </div>

            </div>
        </div>
        // </Link>

    )
}