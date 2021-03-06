import {ModalHeader} from "reactstrap";
import React from "react";

export default {
    loading: 'Loading...',
    language: 'Language',
    map:'Map',
    account:'Account',
    myAccount:'My account',

    providerTitle:'Providers',
    newProviderModalTitle:'Add new provider',

    editProviderModalTitle:'Edit provider',

    accountCreditModalTitle: 'Deposit / Withdraw credit for %(username)s',

    buttons: {
        newProviderButton:'Add provider',
        navbarProviderButton: 'Providers',
        accountCreditButton: 'Deposit/Withdraw credit',
        confirmButton: 'Confirm',
        cancelButton: 'Cancel',
        editButton: 'Edit',
        deleteButton: 'Delete',
        loginButton: 'Log in',
        logoutButton: 'Log out'
    },

    labels: {
        nameLabel: 'Name',
        stateLabel: 'State',
        addressLabel: 'Adress',
        phoneLabel: 'Phone number',
        latitudeLabel: 'Latitude',
        longitudeLabel: 'Longitude',
        descriptionLabel: 'Description',
        websiteLabel: 'Website',
        hoursFromLabel: 'Service starting at',
        hoursToLabel: 'Service finishing at',
        officeDaysFromLabel: 'Service starting on',
        officeDaysToLabel: 'Service finishing on',
        accountCreditLabel: 'Credit',
        actionsLabel: 'Actions',
        chooseADayLabel: 'Choose a day'
    },

    placeholders: {
        providerNamePlaceholder: 'Type your provider name',
        statePlaceholder: 'Type the state where you are located',
        addressPlaceholder: 'Type your address',
        emailPlaceholder: 'Type your email address',
        phonePlaceholder: 'Type your phone number',
        logoPlaceholder: 'Type your logo URL',
        latitudePlaceholder: 'Type your latitude',
        longitudePlaceholder: 'Type your longitude',
        descriptionPlaceholder: 'Type a description',
        websitePlaceholder: 'Type the URL of your website',
        accountCreditPlaceholder: 'Type an amount'
    }
}