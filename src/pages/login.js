import React, {useEffect, useState} from "react";
import { Input, Form, ContainerAll } from "./loginStyle";
import { useNavigate    } from "react-router-dom";
import {db}  from "../firebase";
import {collection, onSnapshot, query} from 'firebase/firestore';

function Login(){
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    function Logar(){
        const q = query(collection(db, 'usuarios'));

        onSnapshot(q,(querySnapshot) => {
          let users = []
          users = querySnapshot.docs.map((doc) => ({
                user: doc.data()    
          }))

          let userLogin = [];

          userLogin = users.filter((e) => String(e.user.usuario) == String(login.trim()) && String(e.user.senha) == String(pass.trim()))
          if(userLogin.length > 0){
            navigate('/Home')
          }else{
            alert("Usuário ou senha incorretos.");
          }
      })
    }

    return (
        <>
            <head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Login JS</title>
            </head>
            <body>
                <ContainerAll>
                <Form>

                    <h3>Login</h3>
                    <Input type="text" placeholder="Login" id="login" onChange={(e) => setLogin(e.target.value)}/>
                    <Input type="password" placeholder="-Senha" id="senha" onChange={(e) => setPass(e.target.value)}/>
                    <Input type="submit" onClick={() => Logar()}/>
                    

                </Form>
                </ContainerAll>
            
            </body>

        </>
    )
}

export default Login;