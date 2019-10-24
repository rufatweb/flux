import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const ContactsActions = {
    readContacts: function(){
        Dispatcher.dispatch({
            actionType: 'read_contacts_started'
        });
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios.get(`${proxyurl}https://dmvwebapp.azurewebsites.net/api/Contact/All`)
        .then(res => {
            console.log(res.data)
            Dispatcher.dispatch({
                actionType: 'read_contacts_successful',
                data:  res.data
            });    
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_contacts_failure'
            });
        });
    }
}

module.exports = ContactsActions;