import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import AuthManager from '../../modules/AuthManager';


class NavBar extends Component {
    state = {
		userName: ''
	};

	handleLogout = () => {
		this.props.clearUser();
		this.props.history.push('/Login');
	};

	componentDidMount() {
		AuthManager.getUserById(this.props.activeUser).then(data => {
			this.setState({
				userName: data.name
			});
		});
	}

    render() {
        return (
            <nav id="navBar">
                <ul className="nav nav-pills nav-fill">
                {this.props.admin === "true" ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/AdminDash">Admin Portal</Link>
                    </li>: ""}
                    <li className="nav-item">
                        <Link className="nav-link" to="/UserDash">Dashboard</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/AdminDash">Admin Dashboard</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/Children">Children</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Cars">Cars</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/RideHistory">Ride History</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/Locations">Locations</Link>
                    </li> */}
                    <li className='nav-item'>
                    <Link className="nav-link" onClick={this.handleLogout}>Logout</Link>
						</li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar)
