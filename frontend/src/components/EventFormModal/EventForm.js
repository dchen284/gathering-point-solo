//external imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal imports
import './EventForm.css';
import * as eventsActions from "../../store/events";
import * as sessionActions from "../../store/session";


function EventForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [formTitle, setFormTitle] = useState('');
  const [formEventBody, setFormEventBody] = useState('');
  const [formStartTime, setFormStartTime] = useState(new Date());
  const [formEndTime, setFormEndTime] = useState(new Date());
  const [formImgUrl, setFormImgUrl] = useState('');
  const [formOrganizerName, setFormOrganizerName] = useState('');
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEventData = {
        title: formTitle,
        eventBody: formEventBody,
        startTime: formStartTime,
        endTime: formEndTime,
        imgUrl: formImgUrl,
        organizerName: formOrganizerName,
        ownerId: sessionUser.id,
    }

    // alert(newEventData);

    //validators
    let errorsToPrint = [];

    if (!formTitle)
        {errorsToPrint.push('Please provide a title.')}
    if (formTitle.length < 3 || formTitle.length > 255)
        {errorsToPrint.push('Please provide a title that is between 3 and 255 letters long.')}
    if (!formStartTime)
        {errorsToPrint.push('Please provide a start time.')}
    if (!formEndTime)
        {errorsToPrint.push('Please provide an end time.')}
    if (!formOrganizerName)
        {errorsToPrint.push('Please provide an organizer name.')}
    if (formOrganizerName.length < 3 || formOrganizerName.length > 255)
        {errorsToPrint.push('Please provide an organizer name that is between 3 and 255 letters long.')}

    if (errorsToPrint.length === 0) {
      console.log(newEventData);
      const createdEvent = await dispatch(eventsActions.addEvent(newEventData));
    }

    // if (password === confirmPassword) {
    //   setErrors([]);
    //   return dispatch(sessionActions.signup({ email, username, password }))
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Title
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          required
        />
      </label>
      <label className="green">
        Event Description (optional)
        <textarea
          value={formEventBody}
          onChange={(e) => setFormEventBody(e.target.value)}
        />
      </label>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={formStartTime}
          onChange={(e) => setFormStartTime(e.target.value)}
          required
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          value={formEndTime}
          onChange={(e) => setFormEndTime(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL (optional):
        <input
          type="url"
          value={formImgUrl}
          onChange={(e) => setFormImgUrl(e.target.value)}
        />
      </label>
      <label>
        Organizer Name:
        <input
          type="text"
          value={formOrganizerName}
          onChange={(e) => setFormOrganizerName(e.target.value)}
        />
      </label>
      <button className="pure-button" type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;