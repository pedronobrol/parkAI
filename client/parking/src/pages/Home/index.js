import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';


var carData = {isParked: false, "image":"","license":"xxx","state":"Libre", floor: 1, number: 22, area: 'A'}



export default function Home(){
    const [data, setData] = useState([]);

    const getData = async () => {
    const { data } = await axios.get(`http://10.7.135.155:5000/spots`);
    
    setData(data);
    };

    useEffect(()=> {
    getData();
    }, [])

    console.log(data)

    Object.entries(data).forEach(([key, value]) => {
        if (value.state == 'Ocupado' && value.license == "0674KPD") {
            carData.isParked = true;
            carData.license = value.license;
            carData.image = value.image;
        }
     })

    return(
    <Container><h2>Hola Pedro Nobre</h2>
        <br></br>
        
        {carData.isParked && (
        <>
        <h5>Aquí tiene la información sobre su coche:</h5>  
        
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={`data/${carData.image.replace('-', '%2D')}`} />
            <Card.Body>
                <Card.Title>Coche aparcado</Card.Title>
                <Card.Text>
                Su coche se encuentra aparcado en nuestro parking. Le proporcionamos una imagen actualizada cada 15 minutos y los datos de su ubicación.
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><strong>Matrícula:</strong> {carData.license} </ListGroupItem>
                <ListGroupItem><strong>Bloque:</strong> A</ListGroupItem>
                <ListGroupItem><strong>Planta:</strong> 2</ListGroupItem>
                <ListGroupItem><strong>Número:</strong> 3</ListGroupItem>
            </ListGroup>
        </Card>
        </>
        )}

        {!carData.isParked && (
            <>
            <h5>No hemos encontrado su coche. </h5>
            </>
        )}
    </Container>


    );
}