import React, { Component } from 'react';
import CarManager from '../../modules/CarManager'

class CarCard extends Component {
	state = {
        carUsers: [],
        uniqueUsers: []
    };

    //fetch carUser by carId

	// handleDelete = id => {
	// 	EventsManager.delete(id).then(() => {
	// 		this.props.getData();
	// 	});
    // };
    removeDups = (array) => {
        let unique = {}
        let nameArray =[]
        array.forEach(obj => {
            if (!unique[obj.userId])
            {unique[obj.userId] = obj}
        });
        for (const key in unique) {
            //can I push these as an object? I want the user Id and the name//
            nameArray.push(unique[key].user.name)
        }
        this.setState({uniqueUsers: nameArray})
        console.log("unique", this.state.uniqueUsers)
        console.log("carUsers", this.state.carUsers)

    }

    getCarCardData = () => {
        CarManager.getUserbyCarId(this.props.activeUser).then(data => {
             this.setState({
                 carUsers: data
             });
            // console.log("This is your Car Users by Cars you own", data)
            // console.log("this is the name", data[0].user.name)
        }).then(() => this.removeDups(this.state.carUsers))
         ;
    };

	componentDidMount() {
        this.getCarCardData()
	 }

	render() {

		return (
			<>
            <p>CarCard</p>
            <h2>{this.props.carUser.car.nickName}</h2>
            <p>{this.props.carUser.car.make} {this.props.carUser.car.model} </p>
            <p>Year: {this.props.carUser.car.year}</p>
            <p>Guardians:
                {this.state.carUsers.map(carUser => (
                    carUser.user.name))}</p>
      {/* <button type="button" onClick={this.handleClick}>Order ME</button> */}
            </>
		);
	}
}

export default CarCard;
