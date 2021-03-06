import React from 'react'
import axios from 'axios'
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Alert,
    CustomInput
} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

function ModalAlert({ errorsToShow }) {
    const hasErrorsToShow = errorsToShow.length > 0;

    if (hasErrorsToShow) {
        return (
            <Alert color="danger">
                {errorsToShow.map(error => <div>{error}</div>)}
            </Alert>
        )
    }
    return <div />
}

const username = (props) => {
    return props.content
}

class Providers extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            newUserData: {
                name: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
                logo: '',
                latitude: '',
                longitude: '',
                description: '',
                website: '',
                officeHoursFrom: '',
                officeHoursTo: '',
                officeDaysFrom: '',
                officeDaysTo: '',
                menus: [],
                delivery: false
            },
            editUserData: {
                name: '',
                state: '',
                address: '',
                email: '',
                phone: '',
                accountCredit: 0.0,
                logo: '',
                latitude: '',
                longitude: '',
                description: '',
                website: '',
                officeHoursFrom: '',
                officeHoursTo: '',
                officeDaysFrom: '',
                officeDaysTo: '',
                menus: [],
                delivery: false
            },
            newUserModal: false,
            editUserModal: false,
            accountCreditModal: false,
            errorMessages: []
        }
    }

    //METHODS

    componentDidMount() {
        this._refreshUsers();
    }

    toggleNewUserModal() {
        this.setState({
            newUserModal: !this.state.newUserModal
        })
    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        })
    }

    toggleAccountCreditModal() {
        this.setState({
            accountCreditModal: !this.state.accountCreditModal
        })
    }

    addProvider() {
        axios.post('http://localhost:8080/provider', this.state.newUserData)
            .then((response) => {
                let {users} = this.state;
                users.push(response.data);
                this.setState(
                    {
                        users,
                        newUserModal: false,
                        newUserData: {
                            name: '',
                            state: '',
                            address: '',
                            email: '',
                            phone: '',
                            accountCredit: 0.0,
                            logo: '',
                            latitude: '',
                            longitude: '',
                            description: '',
                            website: '',
                            officeHoursFrom: '',
                            officeHoursTo: '',
                            officeDaysFrom: '',
                            officeDaysTo: '',
                            menus: [],
                            delivery: false
                        }
                    });
                this._refreshUsers();
            })
            .catch((error) => {
                this.setState({
                    errorMessages: error.response.data.errors
                })
            })
    }

    editUser(id, name, state, address, email, phone,
             logo, latitude, longitude, description, website,
             officeHoursFrom, officeHoursTo, officeDaysFrom,
             officeDaysTo, accountCredit, delivery) {
        this.setState({
            editUserData: {id, name, state, address, email, phone,
                            logo, latitude, longitude, description, website,
                            officeHoursFrom, officeHoursTo, officeDaysFrom,
                            officeDaysTo, accountCredit, delivery},
            editUserModal: !this.state.editUserModal
        })
    }

    editAccountCredit(id, name, state, address, email, phone,
                      logo, latitude, longitude, description, website,
                      officeHoursFrom, officeHoursTo, officeDaysFrom,
                      officeDaysTo, accountCredit, delivery) {
        this.setState({
            editUserData: {id, name, state, address, email, phone,
                logo, latitude, longitude, description, website,
                officeHoursFrom, officeHoursTo, officeDaysFrom,
                officeDaysTo, accountCredit, delivery},
            accountCreditModal: !this.state.accountCreditModal
        })
    }

    updateProvider() {
        let {name, state, address, email, phone, accountCredit, logo, latitude, longitude,
            description, website, officeHoursFrom, officeHoursTo, officeDaysFrom, officeDaysTo, menus, delivery
        } = this.state.editUserData;

        axios.put('http://localhost:8080/provider/' + this.state.editUserData.id, {
            name, state, address, email, phone, accountCredit, logo, latitude, longitude,
            description, website, officeHoursFrom, officeHoursTo, officeDaysFrom, officeDaysTo, menus, delivery
        })
            .then((response) => {
                this._refreshUsers();
                this.setState({
                    editUserModal: false,
                    accountCreditModal: false,
                    editUserData: {
                        name: '',
                        state: '',
                        address: '',
                        email: '',
                        phone: '',
                        accountCredit: 0.0,
                        logo: '',
                        latitude: '',
                        longitude: '',
                        description: '',
                        website: '',
                        officeHoursFrom: '',
                        officeHoursTo: '',
                        officeDaysFrom: '',
                        officeDaysTo: '',
                        menus: [],
                        delivery: false
                    }
                })
            })
    }

    deleteProvider(id) {
        axios.delete('http://localhost:8080/user/' + id)
            .then((response) => {
                this._refreshUsers();
            })
    }


    _refreshUsers() {
        //TODO: CHANGE THIS WITH THE HEROKU URL
        // axios.get('http://viandas-ya.herokuapp.com/users')
        axios.get('http://localhost:8080/providers')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    //TODO: Depending on the user role (client, provider) you see the table with all
    //      users, or your profile (with the according fields for each role).
    //      The admin role sees a Users option.
    //      SEE HOW TO DETERMINE WHICH PAGE YOU SEE DEPENDING ON YOUR ROLE PERMISSION
    //      Maybe a flag userType in the json?

    updateNewUserField = (field) => (ev) => {
        let {newUserData} = this.state;
        newUserData[field] = ev.target.value;
        this.setState({newUserData})
    }

    updateEditUserField = (field) => (ev) => {
        let {editUserData} = this.state;
        editUserData[field] = ev.target.value;
        this.setState({editUserData})
    }

    seeProviderMenus(id) {
        this.props.history.push('/providerMenus/' + id)
    }

    //RENDER

    render() {
        const {users, errorMsg} = this.state;

        const placeholderTranslations = counterpart;

        const username = this.state.editUserData.name;

        return (
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className="my-3">
                            <Translate content='providerTitle'/>
                        </h1>
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button className="my-3" color="primary" onClick={this.toggleNewUserModal.bind(this)}>
                            <Translate content='buttons.newProviderButton'/>
                        </Button>
                    </Col>
                </Row>

                {/* ADD USER MODAL */}

                <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>
                        <Translate content='newProviderModalTitle'/>
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* ADD CLIENT MODAL FORM */}
                        <Form>
                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={2}>
                                    <Translate content='labels.nameLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="name"
                                           id="name"
                                           placeholder={placeholderTranslations.translate('placeholders.providerNamePlaceholder')}
                                           value={this.state.newUserData.name}
                                           onChange={this.updateNewUserField('name')}/>
                                </Col>
                            </FormGroup>

                            {/* STATE */}
                            <FormGroup row>
                                <Label for="state" sm={2}>
                                    <Translate content='labels.stateLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="state"
                                           id="state"
                                           placeholder={placeholderTranslations.translate('placeholders.statePlaceholder')}
                                           value={this.state.newUserData.state}
                                           onChange={this.updateNewUserField('state')}/>
                                </Col>
                            </FormGroup>

                            {/* ADDRESS */}
                            <FormGroup row>
                                <Label for="address" sm={2}>
                                    <Translate content='labels.addressLabel' />
                                </Label>
                                <Col sm={10}>
                                    <Input name="address" id="address"
                                           placeholder={placeholderTranslations.translate('placeholders.addressPlaceholder')}
                                           value={this.state.newUserData.address}
                                           onChange={this.updateNewUserField('address')}/>
                                </Col>
                            </FormGroup>

                            {/* EMAIL */}
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email"
                                           placeholder={placeholderTranslations.translate('placeholders.emailPlaceholder')}
                                           value={this.state.newUserData.email}
                                           onChange={this.updateNewUserField('email')}/>
                                </Col>
                            </FormGroup>

                            {/* PHONE */}
                            <FormGroup row>
                                <Label for="phone" sm={2}>
                                    <Translate content='labels.phoneLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="phone" id="phone"
                                           placeholder={placeholderTranslations.translate('placeholders.phonePlaceholder')}
                                           value={this.state.newUserData.phone}
                                           onChange={this.updateNewUserField('phone')}/>
                                </Col>
                            </FormGroup>

                            {/* LOGO */}
                            <FormGroup row>
                                <Label for="logo" sm={2}>Logo</Label>
                                <Col sm={10}>
                                    <Input name="logo" id="logo"
                                           placeholder={placeholderTranslations.translate('placeholders.logoPlaceholder')}
                                           value={this.state.newUserData.logo}
                                           onChange={this.updateNewUserField('logo')}/>
                                </Col>
                            </FormGroup>

                            {/* LATITUDE */}
                            <FormGroup row>
                                <Label for="latitude" sm={2}>
                                    <Translate content='labels.latitudeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="latitude" id="latitude"
                                           placeholder={placeholderTranslations.translate('placeholders.latitudePlaceholder')}
                                           value={this.state.newUserData.latitude}
                                           onChange={this.updateNewUserField('latitude')}/>
                                </Col>
                            </FormGroup>

                            {/* LONGITUDE -- TODO: LAT Y LONG = REEMPLAZAR POR PUNTO EN EL MAPA */}
                            <FormGroup row>
                                <Label for="longitude" sm={2}>
                                    <Translate content='labels.longitudeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="longitude" id="longitude"
                                           placeholder={placeholderTranslations.translate('placeholders.longitudePlaceholder')}
                                           value={this.state.newUserData.longitude}
                                           onChange={this.updateNewUserField('longitude')}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={2}>
                                    <Translate content='labels.descriptionLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description"
                                           placeholder={placeholderTranslations.translate('placeholders.descriptionPlaceholder')}
                                           value={this.state.newUserData.description}
                                           onChange={this.updateNewUserField('description')}/>
                                </Col>
                            </FormGroup>

                            {/* WEBSITE */}
                            <FormGroup row>
                                <Label for="website" sm={2}>
                                    <Translate content='labels.websiteLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="website" id="website"
                                           placeholder={placeholderTranslations.translate('placeholders.websitePlaceholder')}
                                           value={this.state.newUserData.website}
                                           onChange={this.updateNewUserField('website')}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS FROM */}
                            <FormGroup row>
                                <Label for="officeHoursFrom" sm={2}>
                                    <Translate content='labels.hoursFromLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursFrom" id="officeHoursFrom"
                                           value={this.state.newUserData.officeHoursFrom}
                                           onChange={this.updateNewUserField('officeHoursFrom')}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS TO */}
                            <FormGroup row>
                                <Label for="officeHoursTo" sm={2}>
                                    <Translate content='labels.hoursToLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursTo" id="officeHoursTo"
                                           value={this.state.newUserData.officeHoursTo}
                                           onChange={this.updateNewUserField('officeHoursTo')}/>
                                </Col>
                            </FormGroup>

                            {/* DAYS FROM */}
                            <FormGroup row>
                                <Label for="officeDaysFrom" sm={2}>
                                    <Translate content='labels.officeDaysFromLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="officeDaysFrom" id="officeDaysFrom"
                                           value={this.state.newUserData.officeDaysFrom}
                                           onChange={this.updateNewUserField('officeDaysFrom')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADayLabel')}
                                        </option>
                                        <option>MONDAY</option>
                                        <option>TUESDAY</option>
                                        <option>WEDNESDAY</option>
                                        <option>THURSDAY</option>
                                        <option>FRIDAY</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                            {/* DAYS TO */}
                            <FormGroup row>
                                <Label for="officeDaysTo" sm={2}>
                                    <Translate content='labels.officeDaysToLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="officeDaysTo" id="officeDaysTo"
                                           value={this.state.newUserData.officeDaysTo}
                                           onChange={this.updateNewUserField('officeDaysTo')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADayLabel')}
                                        </option>
                                        <option>MONDAY</option>
                                        <option>TUESDAY</option>
                                        <option>WEDNESDAY</option>
                                        <option>THURSDAY</option>
                                        <option>FRIDAY</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                            {/* DELIVERY */}
                            {/*<FormGroup check>*/}
                            {/*    <Label check>*/}
                            {/*        <Input type="checkbox" name="delivery" id="delivery"*/}
                            {/*        value={this.state.newUserData.delivery}*/}
                            {/*        onChange={this.updateNewUserField('delivery')}/>*/}
                            {/*        Hace delivery*/}
                            {/*    </Label>*/}
                            {/*</FormGroup>*/}

                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addProvider.bind(this)}>
                            <Translate content='buttons.confirmButton'/>
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>
                </Modal>


                {/* EDIT USER */}

                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>
                        <Translate content='editProviderModalTitle'/>
                    </ModalHeader>
                    <ModalBody>
                        <Form>

                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={2}>
                                    <Translate content='labels.nameLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="name" id="name"
                                           placeholder={placeholderTranslations.translate('placeholders.providerNamePlaceholder')}
                                           value={this.state.editUserData.name}
                                           onChange={this.updateEditUserField('name')}/>
                                </Col>
                            </FormGroup>

                            {/* STATE */}
                            <FormGroup row>
                                <Label for="state" sm={2}>
                                    <Translate content='labels.stateLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="state" id="state"
                                           placeholder={placeholderTranslations.translate('placeholders.statePlaceholder')}
                                           value={this.state.editUserData.state}
                                           onChange={this.updateEditUserField('state')}/>
                                </Col>
                            </FormGroup>

                            {/* ADDRESS */}
                            <FormGroup row>
                                <Label for="address" sm={2}>
                                    <Translate content='labels.addressLabel' />
                                </Label>
                                <Col sm={10}>
                                    <Input name="address" id="address"
                                           placeholder={placeholderTranslations.translate('placeholders.addressPlaceholder')}
                                           value={this.state.editUserData.address}
                                           onChange={this.updateEditUserField('address')}/>
                                </Col>
                            </FormGroup>

                            {/* EMAIL */}
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input type="email" name="email" id="email"
                                           placeholder={placeholderTranslations.translate('placeholders.emailPlaceholder')}
                                           value={this.state.editUserData.email}
                                           onChange={this.updateEditUserField('email')}/>
                                </Col>
                            </FormGroup>

                            {/* PHONE */}
                            <FormGroup row>
                                <Label for="phone" sm={2}>
                                    <Translate content='labels.phoneLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="phone" id="phone"
                                           placeholder={placeholderTranslations.translate('placeholders.phonePlaceholder')}
                                           value={this.state.editUserData.phone}
                                           onChange={this.updateEditUserField('phone')}/>
                                </Col>
                            </FormGroup>

                            {/* LOGO */}
                            <FormGroup row>
                                <Label for="logo" sm={2}>Logo</Label>
                                <Col sm={10}>
                                    <Input name="logo" id="logo"
                                           placeholder={placeholderTranslations.translate('placeholders.logoPlaceholder')}
                                           value={this.state.editUserData.logo}
                                           onChange={this.updateEditUserField('logo')}/>
                                </Col>
                            </FormGroup>

                            {/* LATITUDE */}
                            <FormGroup row>
                                <Label for="latitude" sm={2}>
                                    <Translate content='labels.latitudeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="latitude" id="latitude"
                                           placeholder={placeholderTranslations.translate('placeholders.latitudePlaceholder')}
                                           value={this.state.editUserData.latitude}
                                           onChange={this.updateEditUserField('latitude')}/>
                                </Col>
                            </FormGroup>

                            {/* LONGITUDE -- TODO: LAT Y LONG = REEMPLAZAR POR PUNTO EN EL MAPA */}
                            <FormGroup row>
                                <Label for="longitude" sm={2}>
                                    <Translate content='labels.longitudeLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="longitude" id="longitude"
                                           placeholder={placeholderTranslations.translate('placeholders.longitudePlaceholder')}
                                           value={this.state.editUserData.longitude}
                                           onChange={this.updateEditUserField('longitude')}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={2}>
                                    <Translate content='labels.descriptionLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="textarea" name="description" id="description"
                                           placeholder={placeholderTranslations.translate('placeholders.descriptionPlaceholder')}
                                           value={this.state.editUserData.description}
                                           onChange={this.updateEditUserField('description')}/>
                                </Col>
                            </FormGroup>

                            {/* WEBSITE */}
                            <FormGroup row>
                                <Label for="website" sm={2}>
                                    <Translate content='labels.websiteLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="website" id="website"
                                           placeholder={placeholderTranslations.translate('placeholders.websitePlaceholder')}
                                           value={this.state.editUserData.website}
                                           onChange={this.updateEditUserField('website')}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS FROM */}
                            <FormGroup row>
                                <Label for="officeHoursFrom" sm={2}>
                                    <Translate content='labels.hoursFromLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursFrom"
                                           id="officeHoursFrom"
                                           value={this.state.editUserData.officeHoursFrom}
                                           onChange={this.updateEditUserField('officeHoursFrom')}/>
                                </Col>
                            </FormGroup>

                            {/* HOURS TO */}
                            <FormGroup row>
                                <Label for="officeHoursTo" sm={2}>
                                    <Translate content='labels.hoursToLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input type="time" name="officeHoursTo" id="officeHoursTo"
                                           value={this.state.editUserData.officeHoursTo}
                                           onChange={this.updateEditUserField('officeHoursTo')}/>
                                </Col>
                            </FormGroup>

                            {/* DAYS FROM */}
                            <FormGroup row>
                                <Label for="officeDaysFrom" sm={2}>
                                    <Translate content='labels.officeDaysFromLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="officeDaysFrom" id="officeDaysFrom"
                                           value={this.state.editUserData.officeDaysFrom}
                                           onChange={this.updateEditUserField('officeDaysFrom')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADayLabel')}
                                        </option>
                                        <option>MONDAY</option>
                                        <option>TUESDAY</option>
                                        <option>WEDNESDAY</option>
                                        <option>THURSDAY</option>
                                        <option>FRIDAY</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>

                            {/* DAYS TO */}
                            <FormGroup row>
                                <Label for="officeDaysTo" sm={2}>
                                    <Translate content='labels.officeDaysToLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <CustomInput type="select" name="officeDaysTo" id="officeDaysTo"
                                           value={this.state.editUserData.officeDaysTo}
                                           onChange={this.updateEditUserField('officeDaysTo')}>
                                        <option value="">
                                            {counterpart.translate('labels.chooseADayLabel')}
                                        </option>
                                        <option>MONDAY</option>
                                        <option>TUESDAY</option>
                                        <option>WEDNESDAY</option>
                                        <option>THURSDAY</option>
                                        <option>FRIDAY</option>
                                    </CustomInput>
                                </Col>
                            </FormGroup>


                            {/* DELIVERY */}
                            {/*<FormGroup check>*/}
                            {/*    <Label check>*/}
                            {/*        <Input type="checkbox" name="delivery" id="delivery"*/}
                            {/*               value={this.state.editUserData.delivery}*/}
                            {/*               onChange={this.updateEditUserField('delivery')}/>*/}
                            {/*        Hace delivery*/}
                            {/*    </Label>*/}
                            {/*</FormGroup>*/}

                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.updateProvider.bind(this)}>
                            <Translate content='buttons.confirmButton'/>
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>

                </Modal>


                {/* EDIT ACCOUNT CREDIT */}

                <Modal isOpen={this.state.accountCreditModal} toggle={this.toggleAccountCreditModal.bind(this)}>
                    <ModalHeader toggle={this.toggleAccountCreditModal.bind(this)}>
                        <Translate content='accountCreditModalTitle' with={{username}}/>
                    </ModalHeader>
                    <ModalBody>

                        <Form>

                            {/* ACCOUNT CREDIT */}

                            <FormGroup row>
                                <Label for="accountCredit" sm={2}>
                                    <Translate content='labels.accountCreditLabel'/>
                                </Label>
                                <Col sm={10}>
                                    <Input name="accountCredit" id="accountCredit"
                                           placeholder={placeholderTranslations.translate('placeholders.accountCreditPlaceholder')}
                                           value={this.state.editUserData.accountCredit}
                                           onChange={this.updateEditUserField('accountCredit')}/>
                                </Col>
                            </FormGroup>

                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.updateProvider.bind(this)}>
                            <Translate content='buttons.confirmButton'/>
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleAccountCreditModal.bind(this)}>
                            <Translate content='buttons.cancelButton'/>
                        </Button>
                    </ModalFooter>

                </Modal>

                {/* USER CRUD TABLE */}
                <Row>
                    <Col>
                        <Table hover responsive>
                            <thead>
                            <tr>
                                <th hidden>#</th>
                                <th><Translate content='labels.nameLabel'/></th>
                                <th><Translate content='labels.stateLabel'/></th>
                                <th><Translate content='labels.addressLabel'/></th>
                                <th>E-Mail</th>
                                <th><Translate content='labels.phoneLabel'/></th>
                                {/*<th>Logo</th> TODO: ver como la imagen del logo que elijas*/}
                                <th><Translate content='labels.descriptionLabel'/></th>
                                <th><Translate content='labels.websiteLabel'/></th>
                                <th><Translate content='labels.hoursFromLabel'/></th>
                                <th><Translate content='labels.hoursToLabel'/></th>
                                <th><Translate content='labels.officeDaysFromLabel'/></th>
                                <th><Translate content='labels.officeDaysToLabel'/></th>
                                {/*<th>Hace Delivery</th>*/}
                                <th><Translate content='labels.accountCreditLabel'/></th>
                                <th><Translate content='labels.actionsLabel'/></th>
                            </tr>
                            </thead>

                            {/* USER INFO FETCHED FROM SERVER */}
                            <tbody>
                            {users.map(user =>
                                <tr key={user.id}>
                                    <th hidden scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.state}</td>
                                    <td>{user.address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    {/*<td>{user.logo}</td> TODO: Fetch image*/}
                                    <td>{user.description}</td>
                                    <td>{user.website}</td>
                                    <td>{user.officeHoursFrom}</td>
                                    <td>{user.officeHoursTo}</td>
                                    <td>{user.officeDaysFrom}</td>
                                    <td>{user.officeDaysTo}</td>
                                    {/*<td>{user.delivery ? "Si" : "No"}</td>*/}
                                    <td>{user.accountCredit}</td>

                                    <td>
                                        <Button color='warning' size='sm'
                                                 onClick={this.seeProviderMenus.bind(this, user.id)}>
                                             Ver menús
                                         </Button>
                                        <Button color='success' size='sm' className='mr-2'
                                                onClick={this.editUser.bind(this, user.id, user.name,
                                                    user.state, user.address, user.email, user.phone,
                                                    user.logo, user.latitude, user.longitude,
                                                    user.description, user.website, user.officeHoursFrom,
                                                    user.officeHoursTo, user.officeDaysFrom, user.officeDaysTo,
                                                    user.accountCredit, user.delivery)}>
                                            <Translate content='buttons.editButton'/>
                                        </Button>

                                        <Button color='primary' size='sm' className='mr-2'
                                                onClick={this.editAccountCredit.bind(this, user.id, user.name,
                                                    user.state, user.address, user.email, user.phone,
                                                    user.logo, user.latitude, user.longitude,
                                                    user.description, user.website, user.officeHoursFrom,
                                                    user.officeHoursTo, user.officeDaysFrom, user.officeDaysTo,
                                                    user.accountCredit, user.delivery)}>
                                            <Translate content='buttons.accountCreditButton'/>
                                        </Button>

                                        <Button color='danger' size='sm'
                                                onClick={this.deleteProvider.bind(this, user.id)}>
                                            <Translate content='buttons.deleteButton'/>
                                        </Button>
                                    </td>
                                    {errorMsg ? <div>{errorMsg}</div> : null}
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Providers