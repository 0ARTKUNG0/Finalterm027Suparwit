import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const MenuItem = [
        { name: "Add Books", url: "/add-books" },
        { name: "Add Comics", url: "/add-comics" },
        { name: "Add Journals", url: "/add-journals" },
    ];

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {MenuItem.map((item, index) => (
                <li key={index}>
                    <Link to={item.url}>
                        {item.name}
                    </Link>
                </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          Libery
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        <Link to="/add-books" className="btn btn-outline btn-primary">
          Add Book
        </Link>
        <Link to="/add-comics" className="btn btn-outline btn-accent">
          Add Comics
        </Link>
        <Link to="/add-journals" className="btn btn-outline btn-info">
          Add Journals
        </Link>
      </div>
    </div>
  )
}

export default Navbar