import logo from './logo.svg';
import { Joystick } from 'react-joystick-component';
import io from "socket.io-client";
import {useEffect} from "react";
import './App.css';

const socket = io("192.168.1.16:3000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("conectou");
    });

    socket.on("disconnect", () => {
      console.log("desconectou");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <Joystick
        size={150}
        sticky={false}
        baseColor="#C0C0C0"
        stickColor="#404040"
        throttle={100}
        move={(ev) => {
          console.log(ev);
          socket.emit("controle", {x:ev.x, y:ev.y});
        }}
        stop={(ev) => {}}>          
        </Joystick>
      <button 
        onClick={() => {
          console.log("botao");
          socket.emit("bomba");
        }}><img width={100} height={100} src={require("./images\\extintor2.png")}></img></button>
      </header>
    </div>
  );
}

export default App;
