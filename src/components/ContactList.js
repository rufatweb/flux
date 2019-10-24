"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import ContactsActions from '../actions/contactActions';

export class ContactList extends React.Component{

    createContactRow(contact, index){
      
        console.log(contact, index)
        return (
            
            <tr key={index}>
                <td> {contact.firstname} </td>
                <td> {contact.lastname} </td>
            </tr>
        );
    }

    componentDidMount(){
        ContactsActions.readContacts();
    }

    render() {
       
        let content = '';
        
        if(this.props.contact.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        

        if(this.props.contact.readState.success){
           
            content = 
                (<table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {this.props.contact.contactList.map(this.createContactRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.contact.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading contacts!
                </div>
            )
        }

        return(
            <div>
                <h1>Contacts</h1>
                {content}
            </div>
        );
    }
}

ContactList.propTypes = {
    contact: PropTypes.object.isRequired
};


