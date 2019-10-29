import React, { Component } from 'react';

class KidCard extends Component {
	state = {
		rides: ''
	};

	componentDidMount() {
        this.getData()
     }

     getData = () => {
        RideManager.getRidesbyUser(this.props.activeUser).then(rides => {
            this.setState({
                rides: rides
            });
        });
     }

	render() {
		return (
			<>
            <p>Hello this is a RideCard</p>
            </>
		);
	}
}

export default KidCard;
