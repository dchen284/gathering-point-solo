import './Footer.css';

export default function Footer() {
    return (
        <div className='footer'>
                <div className='footer--title'>Connect with Danny Chen</div>
                <a href={'https://www.linkedin.com/in/danny-chen-b2963110b'}>
                    <i className="fab fa-linkedin" /> LinkedIn
                </a>
                <a href={'https://www.github.com/dchen284'}>
                    <i className="fab fa-github-square" /> GitHub
                </a>
                <a href={'mailto:dchen284@gmail.com'}>
                    <i className="fas fa-envelope-square" /> Email
                </a>
        </div>
    )
}