import React, { Component } from 'react';
import AdminManager from '../../modules/AdminManager';
import moment from 'moment'
import RideManager from '../../modules/RideManager';
import Button from '@material-ui/core/Button';
import Done from '@material-ui/icons/Done'

class AdminDash extends Component {
	state = {
		currentDate: '',
		kidsArray: [],
		availableKids: [],
		completedKids: [],
		currentRides: []
	};

	componentDidMount() {
		let newState = {}
		newState.currentDate = moment(new Date()).format("MMM Do YY")
		AdminManager.getAllKids().then((response) => {
			newState.kidsArray = response
			newState.availableKids = this.getIncompleteList(response, newState.currentDate)
			console.log("Admin Dash New State 2", newState)
			newState.completedKids = this.getCompletedList(response, newState.currentDate)
			console.log("Admin Dash New State 3", newState)
		}).then(() => {
			console.log("newState.currentDate", newState)
			this.getCurrentRides(newState.currentDate)
				.then((response) => {
					newState.currentRides = response
					this.setState(newState)
				})
		})
	}
	refreshQueues = () => {
		let newState = {}
		newState.currentDate = moment(new Date()).format("MMM Do YY")
		AdminManager.getAllKids().then((response) => {
			newState.kidsArray = response
			newState.availableKids = this.getIncompleteList(response, newState.currentDate)
			// console.log("Admin Dash New State", newState)
			newState.completedKids = this.getCompletedList(response, newState.currentDate)
		}).then(() => {
			console.log("newState.currentDate", newState.currentDate)
			this.getCurrentRides(newState.currentDate)
				.then((response) => {
					console.log("refresh queue", response)
					// if (response !== null)
					this.setState({
						currentDate: newState.currentDate,
						availableKids: newState.availableKids,
						completedKids: newState.completedKids,
						currentRides: response
					})
				})
		})
	}

	getKidsList = () => {
		AdminManager.getAllKids()
			.then((response) => {
				console.log("kids list for admin DASH", response)
				// this.setState({
				// 	kidsArray: response,
				// })
			})
	}
	getIncompleteList = (kidsArray, currentDate) => {
		//console.log("getSomeKidsBruh KidsArray", kidsArray, "currentDate", currentDate)
		let availableKids = kidsArray.filter(kid => {
			return kid.rides.every(ride => {
				return ride.date === !currentDate
			});
		})
		console.log("availableKids from getSomeKidsBruh", availableKids)
		return availableKids
	}
	getCurrentRides = (currentDate) => {
		// getRidesbyDate(currentDate).then((response) => {
		// 	if (response.length === 0) {
		// 		return 
		// })
		return RideManager.getAllCurrentRides(currentDate)
		// .then((response) => {
		// 	console.log("Test Current rides calls", response)
		// })
	}
	completeRide = (id) => {
		const editedRide = {
			id: id,
			PickedUp: true
		};

		RideManager.updateRide(editedRide).then(() => {
			(this.refreshQueues());
		});
	};
	// getIncompleteList = (kidsArray, currentDate) => {
	// 	return kidsArray.map(kid => {
	// 		console.log("kid", kid)
	// 		kid.rides.filter(ride => {
	// 			console.log("ride", ride)
	// 			let todayRide = false
	// 			console.log("ride date and current date", (ride.date === currentDate))
	// 			// ride.forEach(rideEvent => {
	// 			if (ride.date == currentDate) {
	// 				todayRide = true
	// 			}
	// 			//return todayRide
	// 			// });
	// 			return todayRide
	// 		})
	// 	})
	// }
	getCompletedList = (kidsArray, currentDate) => {
		//console.log("getSomeKidsBruh KidsArray", kidsArray, "currentDate", currentDate)
		let completedKids = kidsArray.filter(kid => {
			return kid.rides.some(ride => {
				return ride.date === currentDate && ride.PickedUp
			});
		})
		console.log("completedKids from getSomeKidsBruh", completedKids)
		return completedKids
	}

	// getCompletedList = (kidsArray, currentDate) => {
	// 	//console.log("getSomeKidsBruh KidsArray", kidsArray, "currentDate", currentDate)
	// 	let completedKids = kidsArray.filter(kid => {
	// 		return kid.rides.some(ride => {
	// 			return ride.date === currentDate && ride.PickedUp
	// 		});
	// 	})
	// 	console.log("completedKids from getSomeKidsBruh", completedKids)
	// 	return completedKids
	// }

	// getInProgressList = (currentDate) => {
	// 	RideManager.getAllCurrentRides(currentDate)
	// 		.then((currentRides) => {
	// 		console.log("getInProgressList", currentRides)
	// 		return currentRides

	// 	})
	// }
	render() {
		console.log("current rides list", this.state.currentRides)
		return (
			<>
				<div class="admin-Container">
					<div class="admin-Queue" >
						<h5>Students who have not been Picked Up</h5>
						{this.state.availableKids.map(availableKid => (
							<li>{availableKid.nickName}</li>))}
					</div>
					<div class="admin-Queue-Main">
						<h4>Current Rides</h4>
						{this.state.currentRides.map(currentRide => (
							<>
								{currentRide.PickedUp === true ? '' :
									<>
										<div class="flip-card">
											<div class="flip-card-inner">
												<div class="flip-card-front">
													<div class="flip-card-content">
														{/* <p>HEY THIS IS A THING</p> */}
														{currentRide.user.picURL === '' ? null :
															<div>
																<img class="userPic-Admin-Dash" src={currentRide.user.picURL} />
															</div>
														}
														{currentRide.car.picURL === '' ? null :
															<div>
																<img class="userPic-Admin-Dash" src={currentRide.car.picURL} />
															</div>
														}
													</div>
												</div>
												<div class="flip-card-back">
													<p>Arrived: {currentRide.timeStamp}</p>
													<p>Driver: {currentRide.user.name}</p>
													<p>Car Desc: {currentRide.car.color} {currentRide.car.make} {currentRide.car.model}</p>
													<div class="admin-Queue-Main-Passengers">
														{/* <div> */}
														Passengers: {currentRide.kids.map(kid => (
															<li>{kid.nickName}</li>
														))}
														{/* </div> */}
													</div>
												</div>
											</div>
										</div>
										<div class="admin-Queue-Main-Ride">
											<div class="admin-Queue-Main-Driver">
												{/* {currentRide.user.picURL === '' ? null :
											<div>
												<img class="userPic-Admin-Dash" src={currentRide.user.picURL} />
											</div>
										}
										<p>Driver: {currentRide.user.name}</p> */}
											</div>
											<div class="admin-Queue-Main-Car">
												{/* {currentRide.car.picURL === '' ? null :
											<div>
												<img class="userPic-Admin-Dash" src={currentRide.car.picURL} />
											</div>
										}
										<p>Car Desc: {currentRide.car.color} {currentRide.car.make} {currentRide.car.model}</p> */}
											</div>
											<div class="admin-Queue-Main-Passengers">
												{/* <div>Passengers: {currentRide.kids.map(kid => (
											<p>{kid.nickName}</p>
										))}
										</div> */}
											</div>
											<Button
												onClick={() => this.completeRide(currentRide.id)}>
												<Done />Complete Ride
							 </Button>
										</div>
									</>
								}
							</>
						))}
					</div>
					<div class="admin-Queue" >
						<h5>Students who have been Picked Up</h5>
						{this.state.completedKids.map(completedKid => (
							<li>{completedKid.nickName}</li>))}
					</div>
					{/* <div class="admin-queue">
					<h5>This is where a list of kids who have been picked up will go.</h5>
						{this.state.completedKids.map(completedKid => (
							<p>{completedKid.nickName}</p>))}
					</div> */}
				</div>
			</>
		);
	}
}
export default AdminDash;


//
// list 1
// All kids who have not had a ride generated with today's timestamp
// meaning: where the fuck are their parents at?
// if the !kids.ride === currentDate

// this list would have all kids who do not have a ride that has the current date.
// if it does, put it on the current list

// list2
// current rides not completed

// list3
// list of kids who have been picked up don't worry about them noe