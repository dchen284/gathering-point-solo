//external imports
import React, { useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import * as eventsActions from '../../store/events';
import formatTime from '../../utils/format-time';

export default function BookmarksDisplay() {

    const dispatch = useDispatch();
    const sessionUser = useSelector( (state) => state.session.user );
    let arrBookmarks;
    if (sessionUser) {arrBookmarks = Object.values(sessionUser.UserBookmarks)}
    // const arrBookmarks = useSelector( (state) => Object.values(state.session.user.UserBookmarks) );
    const objEvents = useSelector((state) => state.events );
    const { userId } = useParams();

    //useEffects
    useEffect( () => {
        arrBookmarks.forEach(bookmark => {
            if(!objEvents[bookmark.eventId]) {
                dispatch(eventsActions.fetchEventById(bookmark.eventId));
            }
        });

    }, [dispatch, arrBookmarks, objEvents])


    //JSX

    //if the user is not logged in, redirect to home page
    if (!sessionUser) {
        return (
            <Redirect to="/"/>
        );
    }
    //if the user attempts to access another user's page, provide a 404 message
    else if (+userId !== sessionUser.id) {
        return (
            <div>404: Not Found</div>
        )
    }
    else {
        return (
            <>
                <h2>My Bookmarks</h2>
                <table className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            {/* <th>Ticket ID#</th> */}
                            <th>Event ID#</th>
                            <th>Event Title</th>
                            <th>Event Start Time</th>
                            <th>Cancel Bookmark</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        arrBookmarks.map( (bookmark) => {
                            if (objEvents[bookmark.eventId]) {
                                return (
                                    <tr key={`${objEvents[bookmark.eventId].id}`}>
                                        <td>{objEvents[bookmark.eventId].id}</td>
                                        <td>
                                            <Link to={`/events/${objEvents[bookmark.eventId].id}`}>
                                                {objEvents[bookmark.eventId].title}
                                            </Link>
                                        </td>
                                        <td>{formatTime(objEvents[bookmark.eventId].startTime)}</td>
                                        {/* <td>
                                            <bookmarkButton
                                                eventId={bookmark.eventId}
                                            />
                                        </td> */}
                                    </tr>
                                )
                            }
                            else {
                                return null;
                            }

                        })
                    }
                    </tbody>
                </table>

            </>
        );
    }

}