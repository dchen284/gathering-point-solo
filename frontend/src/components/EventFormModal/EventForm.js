//external imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

//internal imports
import './EventForm.css';
import * as categoriesActions from "../../store/category";
import * as eventsActions from "../../store/events";
// import * as sessionActions from "../../store/session";
// import DemoUserButton from "../DemoUserButton";

function EventForm({ formAction, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const arrCategories = useSelector((state) => Object.values(state.categories));
  const { eventId } = useParams();
  const eventOnDisplay = useSelector( (state) => state.events[eventId]);

  useEffect( () => {
    if (!arrCategories.length) {dispatch(categoriesActions.fetchGetCategories())}
  }, [dispatch, arrCategories]);

  // console.log('eventOnDisplay', eventOnDisplay)
  //2021-05-06T18:34

  let initialStateForForm = {
    title: '',
    eventBody: '',
    startTime: '',
    endTime: '',
    imgUrl: '',
    location: '',
    organizerName: '',
    categoryId: 1,
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
  const [formLocation, setFormLocation] = useState(initialStateForForm.location);
  const [formOrganizerName, setFormOrganizerName] = useState(initialStateForForm.organizerName);
  const [formCategoryId, setFormCategoryId] = useState(initialStateForForm.categoryId);
  const [errors, setErrors] = useState([]);

  const [errTitle, setErrTitle] = useState("");
  const [errStartTime, setErrStartTime] = useState("");
  const [errEndTime, setErrEndTime] = useState("");
  const [errOrganizerName, setErrOrganizerName] = useState("");
//   if (sessionUser) return <Redirect to="/" />;

  const errorConditions = [
    false, //object keys start at 1, this is here to provide the offset from starting index 0 to starting index 1
    !formTitle,
    (formTitle.length < 3 || formTitle.length > 255),
    !formStartTime,
    !formEndTime,
    ( !!(formStartTime && formEndTime) && (formStartTime > formEndTime)),
    !formOrganizerName,
    (formOrganizerName.length < 3 || formOrganizerName.length > 255),
  ];

  const objFrontendErrors = {
    1:
      {
        condition: errorConditions[1],
        errorCallback: () => setErrTitle('Please provide a title.'),
      },
    2:
      {
        condition: errorConditions[2],
        errorCallback: () => setErrTitle('Please provide a title that is between 3 and 255 letters long.'),
      },
    3:
      {
        condition: errorConditions[3],
        errorCallback: () => setErrStartTime('Please provide a start time.'),
      },
    4:
      {
        condition: errorConditions[4],
        errorCallback: () => setErrEndTime('Please provide a end time.'),
      },
    5:
      {
        condition: errorConditions[5],
        errorCallback: () => setErrEndTime('The event start time is after the event end time.'),
      },
    6:
      {
        condition: errorConditions[6],
        errorCallback: () => setErrOrganizerName('Please provide an organizer name.'),
      },
    7:
      {
        condition: errorConditions[7],
        errorCallback: () => setErrOrganizerName('Please provide an organizer name that is between 3 and 255 letters long.'),
      }
  }

  function doFrontEndValidations() {
    setErrTitle("");
    setErrStartTime("");
    setErrEndTime("");
    setErrOrganizerName("");

    for (let i = 1; i <= Object.keys(objFrontendErrors).length ; i++) {
      if (objFrontendErrors[i].condition) {
        objFrontendErrors[i].errorCallback()
      }
    }
  }

  const handleSubmitForUpdate = async (e) => {
    e.preventDefault();

    // console.log('inside update!')
    const updatedEventData = {
      id: initialStateForForm.id,
      title: formTitle,
      eventBody: formEventBody,
      startTime: formStartTime,
      endTime: formEndTime,
      imgUrl: formImgUrl,
      location: formLocation,
      organizerName: formOrganizerName,
      ownerId: sessionUser.id,
      categoryId: formCategoryId,
    };

    // console.log('updatedEventData', updatedEventData);

    let errorsToPrint = [];
    doFrontEndValidations();

    if (!errorsToPrint.length && errorConditions.every(condition => condition === false)) {
      // console.log(newEventData);

      setShowModal(false);

      dispatch(eventsActions.fetchEventToUpdate(updatedEventData));

      // return dispatch(eventsActions.fetchEventToUpdate(updatedEventData)).catch(
      //   async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) setErrors(data.errors);
      //   }
      // );

    }
  }


  const handleSubmitForPost = async (e) => {

    e.preventDefault();
    // console.log('inside post!')
    const newEventData = {
        title: formTitle,
        eventBody: formEventBody,
        startTime: formStartTime,
        endTime: formEndTime,
        imgUrl: formImgUrl,
        location: formLocation,
        organizerName: formOrganizerName,
        ownerId: sessionUser.id,
        categoryId: formCategoryId,
    }


    // console.log('>>> after submit', newEventData);
    // alert(newEventData);

    //validators

    let errorsToPrint = [];
    doFrontEndValidations();

    if (!errorsToPrint.length && errorConditions.every(condition => condition === false)) {
      const postedEvent = await dispatch(eventsActions.fetchEventToAdd(newEventData)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );

      history.push(`/events/${postedEvent.id}`);
      setShowModal(false);
      return;
    }

    return setErrors(errorsToPrint);

  };

  let cb;
  if (formAction === 'Update') {cb = handleSubmitForUpdate}
  if (formAction === 'Create') {cb = handleSubmitForPost}

  return (
    <>
      <div className="form-container">
        <form className="form-container__inputs" onSubmit={cb}>
          { formAction === 'Create' && <h2>Create Event</h2> }
          { formAction === 'Update' && <h2>Update Event</h2> }
          <ul>
            {errors.map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
          </ul>

          <div className='form-input-container'>
            <div className={errTitle ? 'form-input--error': 'form-input'}>
              <label>
                Title
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  // required
                />
              </label>
            </div>
            <div className='form-frontend-error'>{errTitle}</div>
          </div>

          <div className='form-input'>
            <div className='form-input--select-container'>
              <label>
                Category:
              </label>
              <select
                className='form-input--select'
                value={formCategoryId}
                onChange={(e) => setFormCategoryId(e.target.value)}
              >
                {arrCategories.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className='form-input form-input--textarea'>
            <label>Event Description (optional)</label>
            <textarea
              value={formEventBody}
              onChange={(e) => setFormEventBody(e.target.value)}
            />
          </div>

          <div className='form-input-container'>
            <div className={errStartTime ? 'form-input--error': 'form-input'}>
              <label>
                Start Time:
                <input
                  type="datetime-local"
                  value={formStartTime}
                  onChange={(e) => setFormStartTime(e.target.value)}
                  // required
                />
              </label>
            </div>
            <div className='form-frontend-error'>{errStartTime}</div>
          </div>

          <div className='form-input-container'>
            <div className={errEndTime ? 'form-input--error': 'form-input'}>
              <label>
                End Time:
                <input
                  type="datetime-local"
                  value={formEndTime}
                  onChange={(e) => setFormEndTime(e.target.value)}
                  // required
                />
              </label>
            </div>
            <div className='form-frontend-error'>{errEndTime}</div>
          </div>


          <div className='form-input'>
            <label>
              Image URL (optional):
              <input
                type="text"
                value={formImgUrl}
                onChange={(e) => setFormImgUrl(e.target.value)}
              />
            </label>
          </div>

          <div className='form-input'>
            <label>
              City, State (optional):
              <input
                type="text"
                value={formLocation}
                placeholder="e.g. Houston, TX"
                onChange={(e) => setFormLocation(e.target.value)}
                // required
              />
            </label>
          </div>

          <div className='form-input-container'>
            <div className={errOrganizerName ? 'form-input--error': 'form-input'}>
              <label>
                Organizer Name:
                <input
                  type="text"
                  value={formOrganizerName}
                  onChange={(e) => setFormOrganizerName(e.target.value)}
                  // required
                />
              </label>
            </div>
            <div className='form-frontend-error'>{errOrganizerName}</div>
          </div>


          <button className="btn-primary" type="submit">{`${formAction} Event`}</button>
        </form>

        <div className='form-container__side-section'>
          <div className='form-container__side-X-black' onClick={() => setShowModal(false)}>
            <i className="fas fa-times" />
          </div>
            <img className='form-container__side-image' alt="quill" src="/images/teyo-wots2.jpeg" />
            {/* <div className='form-container__side-image-caption'>
              <p>Tournament Grounds, illustrated by Cristi Balanescu</p>
              <p>From Magic: the Gathering, by Wizards of the Coast</p>
            </div> */}
        </div>

      </div>
    </>
  );

}

export default EventForm;

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
        // required
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

    // if (!formTitle)
    //     {errorsToPrint.push('Please provide a title.')}
    // if (formTitle.length < 3 || formTitle.length > 255)
    //     {errorsToPrint.push('Please provide a title that is between 3 and 255 letters long.')}
    // if (!formStartTime)
    //     {errorsToPrint.push('Please provide a start time.')}
    // if (!formEndTime)
    //     {errorsToPrint.push('Please provide an end time.')}
    // if (formStartTime > formEndTime)
    //     {errorsToPrint.push('The event start time is after the event end time.')}
    // if (!formOrganizerName)
    //     {errorsToPrint.push('Please provide an organizer name.')}
    // if (formOrganizerName.length < 3 || formOrganizerName.length > 255)
    //     {errorsToPrint.push('Please provide an organizer name that is between 3 and 255 letters long.')}
    // if (!formLocation)
    //     {errorsToPrint.push('Please provide a location.')}