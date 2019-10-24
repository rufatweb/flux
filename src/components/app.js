"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {ContactList} from '../components/ContactList';
import ContactStore from '../stores/contactStore';


export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            contact:{
                contactList: [],
                readState:{
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            },
            vehicle:{
                vehicleList: [],
                readState: {
                    pending:false,
                    success:false,
                    failure:false
                },
                error: ''
            }
        }
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/contacts' render={(props) => (<ContactList {...props} contact={this.state.contact} />)}/>
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        ContactStore.addChangeListener(this._onContactChange.bind(this));
        VehicleStore.addChangeListener(this._onVehicleChange.bind(this));
    }

    componentWillUnmount(){
        ContactStore.removeChangeListener(this._onContactChange.bind(this));
        VehicleStore.removeChangeListener(this._onContactChange.bind(this));
    }

    _onContactChange(){
        this.setState({contact: ContactStore.getAllContacts()});
    }

    _onVehicleChange(){
        this.setState({vehicle: VehicleStore.getAllVehicles()});
    }
}