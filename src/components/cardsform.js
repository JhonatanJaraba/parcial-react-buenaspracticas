import React, {useState, useEffect} from "react";
import {firebase} from '../firebase';

const CardsForm = (props) =>{

   const initialStateValues = {
    url: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    email: '',
    description: ''
   }

   const [values, setValues] = useState(initialStateValues);

   const handleInputChange = e =>{
       const {name, value} = e.target;
       setValues({...values, [name]: value});
   }

    const handleSubmit = e =>{
        e.preventDefault();
        
        props.addOrEdit(values);
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) => {
        const db = firebase.firestore();
        const doc = await db.collection('user').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialStateValues});
        }else{
            getLinkById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons">insert_link</i>
                </div>
                <input 
                type="text"
                className="form-control" 
                placeholder="https://Likedin.com"
                name="url"
                onChange={handleInputChange}
                value={values.url}/>
            </div>
                <br/>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons">assignment_ind</i>
                </div>
                <input 
                type="text"
                className="form-control" 
                placeholder="Ingrese el nombre"
                name="nombre"
                onChange={handleInputChange}
                value={values.nombre}/>
            </div>
                <br/>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons">create</i>
                </div>
                <input 
                type="text"
                className="form-control" 
                placeholder="Ingrese el apellido"
                name="apellido"
                onChange={handleInputChange}
                value={values.apellido}/>
            </div>
            <br/>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons">call_end</i>
                </div>
                <input 
                type="text"
                className="form-control" 
                placeholder="Ingrese el telefono"
                name="telefono"
                onChange={handleInputChange}
                value={values.telefono}/>
            </div>
            <br/>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons">keyboard_return</i>
                </div>
                <input 
                type="text"
                className="form-control" 
                placeholder="Ingrese la direccion"
                name="direccion"
                onChange={handleInputChange}
                value={values.direccion}/>
            </div>
            <br/>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons">email</i>
                </div>
                <input 
                type="email"
                className="form-control" 
                placeholder="Ingrese correo electronico"
                name="email"
                onChange={handleInputChange}
                value={values.email}/>
            </div>
            <br/>
            <div className="form-group">
                <textarea name="description" rows="3" className="form-control"
                placeholder="Write a description" onChange={handleInputChange}
                value={values.description}>
                </textarea>
            </div>
            <br/>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save':'Update'}
            </button>
        </form>
    )
}

export default CardsForm;