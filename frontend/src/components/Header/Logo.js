import { Link } from 'react-router-dom';

const logoPath = process.env.PUBLIC_URL + '/travellinManUno.png';

export default function Logo() {
    return (
        <Link exact="true" to="/" style={{ textDecoration: 'none' }} className="leftHeader">
            <img height="32px" src=""/>
            <img height="32px" src={logoPath} alt="YosBnb Logo"/>
            <span id="logo">YosBnb</span>
        </Link>
    )
}
