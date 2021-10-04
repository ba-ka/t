import { Link } from 'react-router-dom';
import { Prop } from '../interface/component/header';

export function Header() {
    return (
        <ul className="menu">
            <li>
                <Link to="/">home</Link>
            </li>
            <li>
                <Link to="/login">login</Link>
            </li>
            <li>
                <Link to="/register">register</Link>
            </li>
        </ul>
    );
}

export function HeaderLoggedIn(prop: Prop) {
    return (
        <ul className="menu">
            <li>
                <Link to="/">home</Link>
            </li>
            <li>
                <Link to="/kanban">kanban</Link>
            </li>
            <li>
                <Link to="#" onClick={prop.logoutButton}>logout</Link>
            </li>
        </ul>
    );
}