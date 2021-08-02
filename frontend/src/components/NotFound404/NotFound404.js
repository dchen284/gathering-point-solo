import './NotFound404.css';

export default function NotFound404() {
    return (
        <div className='not-found-container'>
            <p className='not-found--icon'><i class="fas fa-exclamation"></i></p>
            <p className='not-found--whoops'>
                Whoops, the page or event you are looking for was not found.
            </p>
            <p className='not-found--directions'>
                If you feel this message is in error, please let us know.
            </p>
            
        </div>
    )
}