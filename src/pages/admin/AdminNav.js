import React from 'react'
import { Link} from 'react-router-dom'
const AdminNav = () => (
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/admin-products" className="nav-link" >Produkty</Link>
            </li>
            
            <li className="nav-item">
                <Link to="/admin-users" className="nav-link">Użytkownicy</Link>
            </li>
        </ul>
    </nav>
)

export default AdminNav
