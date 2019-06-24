import {fetchCreateContact, fetchDeleteContact, fetchReadContacts, fetchUpdateContact} from "../data/api";

const state = {
    contacts: [],
    pending: false,
    selectedItem: {name: null, phone_number: null},
    isEditMode: false,
    dataDialog: false,
    deleteDialog: false
};

// getters
const getters = {};

// actions
const actions = {
    readContacts({commit}) {
        commit('fetchingContacts');
        fetchReadContacts().then(jsonResponse => {
            commit('setContacts', jsonResponse.data.data)
        });
    },
    addOrEdit({state, commit, dispatch}) {
        if(state.isEditMode === true) {
            dispatch('edit');
        } else {
            dispatch('add');
        }
    },
    deleteContact({commit,dispatch}) {
        commit('setPending',true);
        fetchDeleteContact().then(()=> {
            commit('setPending',false);
            commit('hideDeleteDialog');
            dispatch('readContacts');
        })
    },
    add({commit,dispatch}) {
        commit('setPending',true);
        fetchCreateContact().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readContacts');
        })
    },
    edit({commit,dispatch}) {
        commit('setPending',true);
        fetchUpdateContact().then(()=> {
            commit('setPending',false);
            commit('hideDataDialog');
            dispatch('readContacts');
        })
    }
};

// mutations
const mutations = {
    ['fetchingContacts'](state) {
        state.pending = true;
    },
    ['setContacts'](state, contacts) {
        state.pending = false;
        state.contacts = contacts;
    },
    ['setSelectedItem'](state, selectedItem) {
        state.selectedItem = selectedItem;
    },
    ['setPhoneNumber'](state, phone_number) {
        state.selectedItem.phone_number = phone_number;
    },
    ['setName'](state, name) {
        state.selectedItem.name = name;
    },
    ['setEditMode'](state, editMode) {
        state.isEditMode = editMode;
    },
    ['setPending'](state, pending) {
        state.pending = pending;
    },
    ['hideDeleteDialog'](state) {
        state.deleteDialog = false
    },
    ['showDeleteDialog'](state) {
        state.deleteDialog = true
    },
    ['hideDataDialog'](state) {
        state.dataDialog = false
    },
    ['showDataDialog'](state) {
        state.dataDialog = true
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
