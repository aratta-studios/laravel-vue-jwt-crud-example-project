<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-layout align-center justify-center column>
            <v-card
                    title="Simple Table"
                    text="Here is a subtitle for this table"
                    class="scroll-y"
                    width="1000px"
                    height="500px"
                    align-center
                    justify-center
            >
                <v-data-table
                        :headers="headers"
                        :items="contacts"
                        hide-actions
                >
                    <template
                            slot="headerCell"
                            slot-scope="{ header }"
                    >
        <span class="subheading font-weight-light text-success text--darken-3"
              v-text="header.text"
        ></span>
                    </template>
                    <template
                            slot="items"
                            slot-scope="{ item }"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.phone_number }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                    small
                                    @click="deleteItem(item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                </v-data-table>

            </v-card>

            <v-btn color="primary" dark class="mt-2" @click="addItem">New Contact</v-btn>

        </v-layout>
        <v-dialog
            v-model="dataDialog"
            width="500"
    >
        <v-card>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                            <v-text-field @change="setName" v-model="selectedItem.name" label="Name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-text-field @change="setPhoneNumber" v-model="selectedItem.phone_number" label="Phone Number"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="hideDataDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="addOrEdit">
                    <v-progress-circular v-show="this.pending === true" indeterminate
                                         color="white"></v-progress-circular>
                    <div v-show="this.pending === false">Save</div>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        <v-dialog
                v-model="deleteDialog"
                width="500"
        >

            <v-card>
                <v-card-text>
                    Are you sure that you want delete this contact?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="hideDeleteDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="deleteContact">
                        <v-progress-circular v-show="this.pending === true" indeterminate
                                             color="white"></v-progress-circular>
                        <div v-show="this.pending === false">Delete</div>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>


<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        name: "phoneBook",
        methods: {
            ...mapMutations({
                setName: 'phoneBook/setName',
                setPhoneNumber: 'phoneBook/setPhoneNumber',
                setContacts: 'phoneBook/setContacts',
                setSelectedItem: 'phoneBook/setSelectedItem',
                setEditMode: 'phoneBook/setEditMode',
                setPending: 'phoneBook/setPending',
                hideDeleteDialog: 'phoneBook/hideDeleteDialog',
                showDeleteDialog: 'phoneBook/showDeleteDialog',
                hideDataDialog: 'phoneBook/hideDataDialog',
                showDataDialog: 'phoneBook/showDataDialog'

            }),
            ...mapActions({
                readContacts: 'phoneBook/readContacts',
                addOrEdit: 'phoneBook/addOrEdit',
                deleteContact: 'phoneBook/deleteContact'
            }),
            editItem (item) {
                this.setSelectedItem(item);
                this.setEditMode(true);
                this.showDataDialog();
            },
            addItem () {
                this.setSelectedItem ({name: '',phone_number: ''}) ;
                this.setEditMode(false);
                this.showDataDialog();
            },
            deleteItem (item) {
                this.setSelectedItem(item);
                this.showDeleteDialog()
            },
        },
        mounted: function () {
            this.readContacts();
        },
        data(){
            return {
                headers: [
                    {
                        text: 'Name',
                        align: 'center',
                        value: 'name'
                    },
                    {text: 'Phone Number', value: 'phone_number',align: 'center'}
                ],
            }
        },
        computed: {
            ...mapState({
                contacts: state => state.phoneBook.contacts,
                pending: state => state.phoneBook.pending,
                selectedItem: state => state.phoneBook.selectedItem,
                isEditMode: state => state.phoneBook.isEditMode,
                dataDialog: state => state.phoneBook.dataDialog,
                deleteDialog: state => state.phoneBook.deleteDialog
            })

        }
    }
</script>
