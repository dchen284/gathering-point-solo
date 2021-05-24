//external imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//internal imports
import './EventForm.css';
import * as eventsActions from "../../store/events";
// import * as sessionActions from "../../store/session";
// import DemoUserButton from "../DemoUserButton";

function EventForm({ formAction, setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { eventId } = useParams();
  const eventOnDisplay = useSelector( (state) => state.events[eventId]);

  let initialStateForForm = {
    title: '',
    eventBody: '',
    startTime: new Date(),
    endTime: new Date(),
    imgUrl: '',
    organizerName: '',
  };



  if (eventOnDisplay) {
    initialStateForForm = {...eventOnDisplay};
  }

  // console.log('>>> before submit', initialStateForForm);

  const [formTitle, setFormTitle] = useState(initialStateForForm.title);
  const [formEventBody, setFormEventBody] = useState(initialStateForForm.eventBody);
  const [formStartTime, setFormStartTime] = useState(initialStateForForm.startTime);
  const [formEndTime, setFormEndTime] = useState(initialStateForForm.endTime);
  const [formImgUrl, setFormImgUrl] = useState(initialStateForForm.imgUrl);
  const [formOrganizerName, setFormOrganizerName] = useState(initialStateForForm.organizerName);
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

  const handleSubmitForUpdate = async (e) => {
    e.preventDefault();

    console.log('inside update!')
    const updatedEventData = {
      id: initialStateForForm.id,
      title: formTitle,
      eventBody: formEventBody,
      startTime: formStartTime,
      endTime: formEndTime,
      imgUrl: formImgUrl,
      organizerName: formOrganizerName,
      ownerId: sessionUser.id,
    };

    console.log('updatedEventData', updatedEventData);

    let errorsToPrint = [];

    if (errorsToPrint.length === 0) {
      // console.log(newEventData);

      setShowModal(false);

      return dispatch(eventsActions.fetchEventToUpdate(updatedEventData)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
  }


  const handleSubmitForPost = async (e) => {
    e.preventDefault();
    console.log('inside post!')
    const newEventData = {
        title: formTitle,
        eventBody: formEventBody,
        startTime: formStartTime,
        endTime: formEndTime,
        imgUrl: formImgUrl,
        organizerName: formOrganizerName,
        ownerId: sessionUser.id,
    }


    // console.log('>>> after submit', newEventData);
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
      // console.log(newEventData);

      setShowModal(false);

      return dispatch(eventsActions.fetchEventToAdd(newEventData)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }

    return setErrors(['Temporary']);

  };

  let cb;
  if (formAction === 'Update') {cb = handleSubmitForUpdate}
  if (formAction === 'Create') {cb = handleSubmitForPost}

  return (
    <>
      {formAction === 'Update' ?
        <div>Update</div> :
        <div>Create</div>}
      <form onSubmit={cb}>
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
        <button className="pure-button" type="submit">{`${formAction} Event`}</button>
      </form>
    </>
  );
// const dispatch = useDispatch();
// const [credential, setCredential] = useState("");
// const [password, setPassword] = useState("");
// const [errors, setErrors] = useState([]);

// const handleSubmit = (e) => {
//   // e.preventDefault();
//   // setErrors([]);
//   // return dispatch(sessionActions.login({ credential, password })).catch(
//   //   async (res) => {
//   //     const data = await res.json();
//   //     if (data && data.errors) setErrors(data.errors);
//   //   }
//   // );
//   e.preventDefault();
//   setErrors([]);

//   const newEventData = {
//       title: formTitle,
//       eventBody: formEventBody,
//       startTime: formStartTime,
//       endTime: formEndTime,
//       imgUrl: formImgUrl,
//       organizerName: formOrganizerName,
//       ownerId: sessionUser.id,
//   }

//   // alert(newEventData);

//   //validators
//   let errorsToPrint = [];

//   // if (errorsToPrint.length === 0) {
//     // console.log(newEventData);
//     return dispatch(eventsActions.addEvent(newEventData)).catch(
//       async (res) => {
//         const data = await res.json();
//         if (data && data.errors) setErrors(data.errors);
//       }
//     );
//   // }

// };

// return (
//   <form onSubmit={handleSubmit}>
//     <ul>
//       {errors.map((error, idx) => (
//         <li key={idx}>{error}</li>
//       ))}
//     </ul>
//     {/* <label>
//       Username or Email
//       <input
//         type="text"
//         value={credential}
//         onChange={(e) => setCredential(e.target.value)}
//         required
//       />
//     </label>
//     <label>
//       Password
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//     </label> */}

//     <label>
//         Title
//         <input
//           type="text"
//           value={formTitle}
//           onChange={(e) => setFormTitle(e.target.value)}
//           required
//         />
//       </label>
//       <label className="green">
//         Event Description (optional)
//         <textarea
//           value={formEventBody}
//           onChange={(e) => setFormEventBody(e.target.value)}
//         />
//       </label>
//       <label>
//         Start Time:
//         <input
//           type="datetime-local"
//           value={formStartTime}
//           onChange={(e) => setFormStartTime(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         End Time:
//         <input
//           type="datetime-local"
//           value={formEndTime}
//           onChange={(e) => setFormEndTime(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Image URL (optional):
//         <input
//           type="url"
//           value={formImgUrl}
//           onChange={(e) => setFormImgUrl(e.target.value)}
//         />
//       </label>
//       <label>
//         Organizer Name:
//         <input
//           type="text"
//           value={formOrganizerName}
//           onChange={(e) => setFormOrganizerName(e.target.value)}
//         />
//       </label>


//     {/* <button className="pure-button" type="submit">Log In</button> */}
//     <button className="pure-button" type="submit">Create Event</button>
//     {/* <DemoUserButton /> */}
//   </form>

// );
}

export default EventForm;