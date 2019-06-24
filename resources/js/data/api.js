import axios from "axios";
import {getToken} from "../data/localStorage";
import store from '../store/index';

export function fetchLogin() {
    let state = store.state.login;
    return post('/api/v1/login', {
        username: state.username,
        password: state.password
    });
}

export function fetchSignUp() {
    let state = store.state.login;
    return post('/api/v1/sign-up', {
        username: state.username,
        password: state.password
    });
}

export function fetchReadContacts() {
    return post('/api/v1/read-contacts');
}

export function fetchCreateContact() {
    let state = store.state.phoneBook;
    return post('/api/v1/create-contact', {
        name: state.selectedItem.name,
        phone_number: state.selectedItem.phone_number
    });
}


export function fetchUpdateContact() {
    let state = store.state.phoneBook;
    return post('/api/v1/update-contact', {
        id: state.selectedItem.id,
        name: state.selectedItem.name,
        phone_number: state.selectedItem.phone_number
    });
}


export function fetchDeleteContact() {
    let state = store.state.phoneBook;
    return post('/api/v1/delete-contact', {
        id: state.selectedItem.id
    });
}



export function post(url,creds) {
    return axios.post(url, creds, {
            headers: {
                Authorization: getToken()
            }
        }
    );

}

export function get(url) {
    return axios.get(url, {
            headers: {
                Authorization: getToken()
            }
        }
    );
}
