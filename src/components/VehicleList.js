"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import VehiclesActions from '../actions/vehicleActions';

export class VehicleList extends React.Component{

    createVehicleRow(vehicle){
        return (
            <tr>
                <td> {vehicle.vin} </td>
                <td> {vehicle.make} </td>
                <td> {vehicle.model} </td>
                <td> {vehicle.year} </td>
            </tr>
        );
    }

    componentDidMount(){
        VehiclesActions.readVehicles();
    }

    render() {
        
        let content = '';
        
        if(this.props.vehicle.readState.pending){
           
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        

        if(this.props.vehicle.readState.success){
        console.log(this.props.vehicle.vehicleList)
            content = 
                (<table className="table">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {this.props.vehicle.vehicleList.map(this.createVehicleRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.vehicle.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
        }

        return(
            <div>
                <h1>Vehicles</h1>
                {content}
            </div>
        );
    }
}

VehicleList.propTypes = {
    vehicle: PropTypes.object.isRequired
};
