//external imports
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//internal imports
import TicketsButton from '../TicketsButton';

export default function TicketsDisplay() {

    //hooks
    const sessionUser = useSelector( (state) => state.session.user );

    if (!sessionUser) {
        return (
            <Redirect to="/"/>
        );
    }
    else {
        return (
            <>
                <div>TicketsDisplay {sessionUser.id}</div>
                <TicketsButton />
            </>
        );
    }

}