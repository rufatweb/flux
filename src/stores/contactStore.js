import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _contactStore = {
    contact:{
        contactList: [],
        readState:{
            pending:false,
            success:false,
            failure:false
        },
        error: ''
    }
};

class ContactStoreClass extends EventEmitter{

    addChangeListener(cb){
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }


    getAllContacts(){
        return _contactStore.contact;
    }

    resetReadState(){
        _contactStore.contact.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

const ContactStore = new ContactStoreClass();

Dispatcher.register( (action) => {

    switch (action.actionType){
        case 'read_contacts_successful':
            ContactStore.resetReadState();
            _contactStore.contact.contactList = action.data;
            _contactStore.contact.readState.success = true;
            ContactStore.emitChange();
            break;
        case 'read_contacts_failure':
            ContactStore.resetReadState();
            _contactStore.contact.readState.failure = true;
            ContactStore.emitChange();
            break;
        case 'read_contacts_started':
            ContactStore.resetReadState();
            _contactStore.contact.readState.pending = true;
            ContactStore.emitChange();
            break;
        default:
            return;
    }
} );

export default ContactStore;