import BookmarkButton from "../BookmarkButton";
import { Link } from "react-router-dom";

export default function EventCard() {
    return (
        <Link to={`/signup`}>
            <div className="eventCard">
                <div>
                    <img alt="standard" src="https://developer.mozilla.org/static/img/favicon144.png" />
                </div>
                <BookmarkButton />
                <p>Title: FNM at Card Corner</p>
                <p>Format: Standard</p>
                <p>Organizer: Card Corner</p>
                <p>Start Time: Friday, May 30, 2021, 5 PM</p>
            </div>
        </Link>

    )
}