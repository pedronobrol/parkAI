import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';


var dataMapper = [{id: '1', license: 'xxx-xxx', area: 'A', floor: '2', number: '32',  state: 'Libre'}, 
        {id: '2', license: 'xxx-xxx', area: 'B', floor: '1', number: '2',  state: 'Libre'},
        {id: '3', license: 'xxx-xxx', area: 'A', floor: '2', number: '42', state: 'Libre'}];
        
function Row(props){
    return (
    <tr>
    <td>{props.data.id}</td>
    <td>{props.data.license}</td>
    <td>{props.data.area}</td>
    <td>{props.data.floor}</td>
    <td>{props.data.number}</td>
    <td>{props.data.state}</td>
    <td><a href={props.data.image}>Ver imagen</a></td>
    </tr>
    )
}

export default function Admin(){
    const [data, setData] = useState([]);

    const getData = async () => {
    const { data } = await axios.get(`http://10.7.135.155:5000/spots`);
    
    setData(data);
    };

    useEffect(()=> {
    getData();
    }, [])

    console.log(dataMapper)
    console.log(data)


    Object.entries(data).forEach(([key, value]) => {
        var newIndex = Number(key) - 1 
        console.log(key)
        console.log(typeof(key))
        dataMapper[newIndex].license = value.license
        dataMapper[newIndex].image = `data/${value.image.replace('-', '%2D')}`
        if (value.state == 'Libre') {
            dataMapper[newIndex].license = ""
            dataMapper[newIndex].image = `favicon.ico`
        }
        dataMapper[newIndex].state = value.state
     })

    return(
    <Container><h2>Hola Pedro Nobre</h2>
       <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Matricula</th>
                <th>Bloque</th>
                <th>Planta </th>
                <th>Número</th>
                <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            {dataMapper.map(d => <Row  data = {d}/>)}
            </tbody>
    </Table>
    </Container>


    );
}