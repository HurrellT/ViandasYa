import {ModalHeader} from "reactstrap";
import React from "react";

export default {
    loading: 'Cargando...',
    language: 'Idioma',
    map:'Mapa',
    account:'Cuenta',
    myAccount:'Mi cuenta',

    providerTitle:'Proveedores',
    newProviderModalTitle:'Agregar nuevo proveedor',

    editProviderModalTitle:'Editar proveedor',

    accountCreditModalTitle: 'Depositar / Retirar credito para %(username)s',

    buttons: {
        newProviderButton:'Agregar proveedor',
        navbarProviderButton: 'Proveedores',
        accountCreditButton: 'Depositar/Retirar credito',
        confirmButton: 'Confirmar',
        cancelButton: 'Cancelar',
        editButton: 'Editar',
        deleteButton: 'Borrar',
        loginButton: 'Iniciar sesion',
        logoutButton: 'Cerrar sesion'
    },

    labels: {
        nameLabel: 'Nombre',
        stateLabel: 'Ciudad',
        addressLabel: 'Direccion',
        phoneLabel: 'Telefono',
        latitudeLabel: 'Latitud',
        longitudeLabel: 'Longitud',
        descriptionLabel: 'Descripcion',
        websiteLabel: 'Pagina web',
        hoursFromLabel: 'Hora de inicio de servicio',
        hoursToLabel: 'Hora de finalizacion de servicio',
        officeDaysFromLabel: 'Servicio empezando los',
        officeDaysToLabel: 'Servicio finalizando los',
        accountCreditLabel: 'Credito',
        actionsLabel: 'Acciones',
        chooseADayLabel: 'Elija un dia'
    },

    placeholders: {
        providerNamePlaceholder: 'Escriba el nombre de Proveedor',
        statePlaceholder: 'Escriba la localidad donde se encuentra',
        addressPlaceholder: 'Escriba su direccion',
        emailPlaceholder: 'Escriba su direccion de correo electronico',
        phonePlaceholder: 'Escriba su telefono',
        logoPlaceholder: 'Escriba la URL logo',
        latitudePlaceholder: 'Escriba su latitud',
        longitudePlaceholder: 'Escriba su longitud',
        descriptionPlaceholder: 'Escriba una descripcion',
        websitePlaceholder: 'Escriba la URL de su pagina web',
        accountCreditPlaceholder: 'Escriba una cantidad'
    }
}