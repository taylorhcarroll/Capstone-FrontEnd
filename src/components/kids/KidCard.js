import React, { Component } from 'react'
import KidManager from '../../modules/KidManager'
import KidGuardianSearch from './KidGuardianSearch'
import KidEditForm from './KidEditForm'

class KidCard extends Component {
    state = {
        kidGuardians: [],
        // uniqueUsers: []
    };

    //fetch carUser by carId

    handleDelete = id => {
        KidManager.deleteKid(id).then(() => {
            this.props.getData();
        });
    };
    handleDeleteGuardian = id => {
        KidManager.deleteGuardian(id).then(() => {
            this.getKidCardData();
        });
    };

    getKidCardData = () => {
        KidManager.getUserbyKidId(this.props.activeUser).then(data => {
            console.log("here are your KidCard results", data)
            this.setState({
                kidGuardians: data
            });
            // console.log("This is your Car Users by Cars you own", data)
            // console.log("this is the name", data[0].user.name)
        })
    };

    componentDidMount() {
        this.getKidCardData()
    }

    render() {
        console.log("Guardians here", this.props.kidGuardian)
        return (
            <>
                <div id={`kidCardId--${this.props.kidGuardian.kid.id}`}>
                    <h2>{this.props.kidGuardian.kid.nickName}</h2>
                    <p>Name: {this.props.kidGuardian.kid.name}</p>
                    <p>Age: {this.props.kidGuardian.kid.age}</p>
                    <p>Pic: {this.props.kidGuardian.kid.picURL}</p>
                    <p>Guardians:</p>
                    <KidGuardianSearch
                        {...this.props}

                        kidGuardian={this.props.kidGuardian}
                        getData={this.props.getData}
                        getKidCardData={this.getKidCardData}
                        addGuardian={this.props.addGuardian} />
                    {this.state.kidGuardians.map(singleKidGuardian => {
                        return singleKidGuardian.kidId === this.props.kidGuardian.kid.id ?
                                <div key={singleKidGuardian.id}>
                                    <p>{singleKidGuardian.user.name}  </p>
                                    <button
                                        className='addItemBtn'
                                        type='primary'
                                        shape='round'
                                        icon='delete'
                                        size='small'
                                        onClick={() => this.handleDeleteGuardian(singleKidGuardian.id)}
                                    >
                                        Remove Guardian
                        </button> </div>
                            : ""
                    })
                    }
                    <KidEditForm
                        {...this.props.kidGuardian}
                        getData={this.props.getData}
                    />
                    <button
                        className='addItemBtn'
                        type='primary'
                        shape='round'
                        icon='delete'
                        size='small'
                        onClick={() => this.handleDelete(this.props.kidGuardian.kid.id)}
                    >
                        Delete Kid
							</button>

                </div>
            </>
        );
    }
}

export default KidCard;
