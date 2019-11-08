import React from 'react'
import axios from 'axios'
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Alert} from 'reactstrap';
import Label from "reactstrap/es/Label";
import Col from "reactstrap/es/Col";
import Input from "reactstrap/es/Input";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";

function ModalAlert({ errorsToShow }) {
    const hasErrorsToShow = errorsToShow.length > 0

    if (hasErrorsToShow) {
        return (
            <Alert color="danger">
                {errorsToShow.map(error => <div>{error}</div>)}
            </Alert>
        )
    }
    return <div />
}

class Menus extends React.Component {

    constructor(props) {
        super(props)

        this.providerName = '';
        this.state = {
            menus: [],
            newMenuData: {
                name: '',
                description: '',
                category: '',
                deliveryPrice: '',
                effectiveDateFrom: '',
                effectiveDateTo: 0.0,
                dayNight: '',
                effectiveDeliveryHoursFrom: '',
                effectiveDeliveryHoursTo: '',
                deliveryType: '',
                averageDeliveryTime: '',
                price: '',
                maximumAllowedSells: '',
                minimumAmount: '',
                minimumAmountPrice: '',
                minimumAmount2: '',
                minimumAmount2Price: '',
                providerId: '',
                providerName: '',
                score: []
            },
            editMenuData: {
                name: '',
                description: '',
                category: '',
                deliveryPrice: '',
                effectiveDateFrom: '',
                effectiveDateTo: 0.0,
                dayNight: '',
                effectiveDeliveryHoursFrom: '',
                effectiveDeliveryHoursTo: '',
                deliveryType: '',
                averageDeliveryTime: '',
                price: '',
                maximumAllowedSells: '',
                minimumAmount: '',
                minimumAmountPrice: '',
                minimumAmount2: '',
                minimumAmount2Price: '',
                providerId: '',
                providerName: '',
                score: []
            },
            newMenuModal: false,
            editMenuModal: false,
            errorMessages: []
        }
    }

    //METHODS

    componentDidMount() {
        this._refreshMenus();
    }

    toggleNewMenuModal() {
        this.setState({
            newMenuModal: !this.state.newMenuModal
        })
    }

    addMenu() {
            axios.post('http://localhost:8080/menu', this.state.newMenuData)
                .then((response) => {
                    let {menus} = this.state;
                    menus.push(response.data);
                    this.setState(
                        {
                            menus,
                            newMenuModal: false,
                            newMenuData: {
                                name: '',
                                description: '',
                                category: '',
                                deliveryPrice: '',
                                effectiveDateFrom: '',
                                effectiveDateTo: 0.0,
                                dayNight: '',
                                effectiveDeliveryHoursFrom: '',
                                effectiveDeliveryHoursTo: '',
                                deliveryType: '',
                                averageDeliveryTime: '',
                                price: '',
                                maximumAllowedSells: '',
                                minimumAmount: '',
                                minimumAmountPrice: '',
                                minimumAmount2: '',
                                minimumAmount2Price: '',
                                providerId: '',
                                providerName: '',
                                score: []
                            }
                        });
                    this._refreshMenus();
                })
                .catch((error) => {
                    this.setState({
                        errorMessages: error.response.data.errors
                    })
                })
        }

    deleteMenu(id) {
        axios.delete('http://localhost:8080/menu/' + id)
            .then((response) => {
                this._refreshMenus();
            })
    }

    _refreshMenus() {
        axios.get('http://localhost:8080/menus')
            .then(response => {
                this.setState({
                    menus: response.data
                })
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    getProviderName(id){
        axios.get('http://localhost:8080/providerName/' + id)
            .then(response => {
                this.providerName = response.data;
             })
            .catch(error => {
                //console.log(error)
                this.setState({errorMsg: 'Error retreiving data'})
            })
    }

    buyMenu(menuId) { }

    //RENDER

    updateField = (field) => (ev) => {
        let {newMenuData} = this.state;
        newMenuData[field] = ev.target.value;
        this.setState({newMenuData})
    }

    render() {
        const {menus, errorMsg} = this.state

        return (
            <Container>
                <Row>
                    <Col xs={8}>
                        <h1 className="my-3">Menús</h1>
                    </Col>
                    <Col xs={2} className="my-3">
                        <Button className="my-3" color="primary" onClick={this.toggleNewMenuModal.bind(this)}>
                            Nuevo Menú
                        </Button>
                    </Col>
                </Row>

                {/* ADD MENU MODAL */}

                <Modal isOpen={this.state.newMenuModal} toggle={this.toggleNewMenuModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewMenuModal.bind(this)}>
                        Añadir un nuevo Menú
                    </ModalHeader>
                    <ModalBody>
                        <ModalAlert errorsToShow={this.state.errorMessages} />

                        {/* ADD CLIENT MODAL FORM */}
                        <Form>
                            {/* NAME */}
                            <FormGroup row>
                                <Label for="name" sm={2}>Nombre</Label>
                                <Col sm={10}>
                                    <Input name="name" id="name" placeholder="Escriba el nombre del menú"
                                           value={this.state.newMenuData.name}
                                           onChange={this.updateField('name')}/>
                                </Col>
                            </FormGroup>

                            {/* DESCRIPTION */}
                            <FormGroup row>
                                <Label for="description" sm={2}>Descripción</Label>
                                <Col sm={10}>
                                    <Input name="description" id="description" placeholder="Escriba la descripción del menú"
                                           value={this.state.newMenuData.description}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.state = e.target.value;
                                               this.setState({newMenuData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* CATEGORY */}
                            <FormGroup row>
                                <Label for="category" sm={2}>Categoría</Label>
                                <Col sm={10}>
                                    <Input name="category" id="category" placeholder="Escriba la categoría del menú"
                                           value={this.state.newMenuData.category}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.address = e.target.value;
                                               this.setState({newMenuData})
                                           }}/>
                                </Col>
                            </FormGroup>

                            {/* DELIVERY PRICE */}
                            <FormGroup row>
                                <Label for="deliveryPrice" sm={2}>Precio de delivery</Label>
                                <Col sm={10}>
                                    <Input type="deliveryPrice" name="deliveryPrice" id="deliveryPrice" placeholder="Escriba el precio de delivery"
                                           value={this.state.newMenuData.deliveryPrice}
                                           onChange={(e) => {
                                               let {newMenuData} = this.state;
                                               newMenuData.email = e.target.value;
                                               this.setState({newMenuData})
                                           }}/>
                                </Col>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addMenu.bind(this)}>
                            Agregar Menú
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewMenuModal.bind(this)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* MENU CRUD TABLE */}
                <Row>
                    <Col>
                        <Table hover responsive>
                            <thead>
                            <tr>
                                <th hidden>#</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Proveedor</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            {/* MENU INFO FETCHED FROM SERVER */}
                            <tbody>
                            { menus.map(menu =>
                                <tr key={menu.id}>
                                    <th hidden scope="row">{menu.id}</th>
                                    <td>{menu.name}</td>
                                    <td>{menu.description}</td>
                                    <td>{menu.category}</td>
                                    <td>{menu.price}</td>
                                    <td>{menu.providerName}</td>
                                    <td>
                                        <Button color='warning' size='sm'
                                                onClick={this.buyMenu(menu.id)}>
                                            Comprar
                                        </Button>
                                    </td>
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

export default Menus