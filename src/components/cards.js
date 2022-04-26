import React, {useEffect, useState} from "react";
import CardsForm from "./cardsform";
import {firebase} from '../firebase';
import { toast } from 'react-toastify';

const Cards = () =>{

    const [user, setUser] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEdit = async (Object) =>{
       const db = firebase.firestore()
       if(currentId === ''){
        await db.collection('user').add(Object);
        toast('Se agrego un nuevo usuario', {
            type: 'success'
        });
       }else{
          await db.collection('user').doc(currentId).update(Object);
          toast('Se actualizo un usuario', {
            type: 'info'
        });
        setCurrentId('');
       }
    };

    const getUser = async () => {
        
        const db1 = firebase.firestore()
          db1.collection('user').onSnapshot((querySnapshot) => {
              const docs = [];
            querySnapshot.forEach(element => {
                docs.push({...element.data(), id:element.id});
            });  
            console.log(docs);
            setUser(docs);
        });
    };

    const onDeleteUser = async (id) => {
        
        const db2 = firebase.firestore()
        if(window.confirm('are you sure you want to delete this user?')) {
         await db2.collection('user').doc(id).delete();
         toast('Se elimino un usuario', {
            type: 'error'
        });
        }
    };

    useEffect(() => {
      getUser();
    }, []);

    return (
    <div>
        <div className="col-md-5 p-2">
            <CardsForm {...{addOrEdit, currentId, user}}/>
        </div>
        <div className="card" style={{width: "18rem", display: "-webkit-box"}}>
                        {user.map(users => ( 
                        <div key={users.id} className="card" >
                              <img src="https://picsum.photos/200/300?random=1"/>
                            <div className="card-body">
                            <div className="d-flex justify-content-evenly">
                              <h5 className="card-title">{users.nombre} </h5>
                              <i className="material-icons text-danger" onClick={() => onDeleteUser(users.id)}>
                                    close
                                </i>
                                <i className="material-icons text-warning" onClick={() => setCurrentId(users.id)}>
                                    create
                                </i>
                            </div>
                              <p className="card-text">{users.description}</p>
                              <p>{users.email}</p>
                              <a href={users.url} className="btn btn-primary">Ir a Likedin</a>
                            </div>
                          </div>
                        ))}
                </div>
    </div>);
};

export default Cards;