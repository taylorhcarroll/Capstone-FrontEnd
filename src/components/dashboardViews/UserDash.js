import React, { Component } from 'react';
import CarManager from '../../modules/CarManager'
import KidManager from '../../modules/KidManager'
import RideManager from '../../modules/RideManager'

class UserDash extends Component {
	state = {
		ride: "",
		arrayCars: [],
		arrayKids: [],
		passengers: []
	};

	// handleDelete = id => {
	// 	EventsManager.delete(id).then(() => {
	// 		this.props.getData();
	// 	});
	// };
	setPassenger = () => {
		//push into the passengers array the kidId
	}

	startRide = () => {
		//create the ride and take the passengers array and forEach over each to create the relationships
	}

	componentDidMount() {
		const newState = {}
		CarManager.getCarsbyUser(this.props.activeUser).then(cars => {
			newState.arrayCars = cars
		})
		.then(() => KidManager.getKidsbyUser(this.props.activeUser).then(kids => {
			newState.arrayKids = kids
		}))
		.then(() => {
			this.setState(newState)
		})
		console.log("newState", newState)
		//console.log("the set state", this.state)
	}

	render() {
		return (
			<>
				<p>Hello this is the User Dashboard</p>
				<p>This is where the Car Card should go</p>
				<select>
				{this.state.arrayCars.map(arrayCar =>
					<option key={arrayCar.car.id} value={arrayCar.car.id}>{arrayCar.car.nickName}</option>
					)}
				</select>
				<p>This is where a kid Card you will map over will go</p>
				<p>This is where the button will go to generate a Ride</p>
			</>
		);
	}
}

export default UserDash;
