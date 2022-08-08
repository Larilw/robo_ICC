import logo from './logo.svg';
import { Joystick } from 'react-joystick-component';
import io from "socket.io-client";
import {useEffect} from "react";
import './App.css';

const socket = io("192.168.4.1:3000");
var waterOn = false;

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
      <nav class="navbar is-dark">
          <div class="container">
              <div class="navbar-brand">
                  <span class="navbar-item">
                      Plataforma de Controle - Protótipo de robô extintor
                  </span>
              </div>
          </div>
      </nav>
      <section class="section">
        <div class="column is-8 is-offset-2">
            <div class="card">
              <strong>Câmera</strong>
                <div class="card-content has-text-centered">
                    <div class="media is-inline-block">
                        <video controls muted>
                          <source src = "https://192.168.4.1:8888/" type = "video/mp4; codecs=avc1.42E01E, mp4a.40.2"></source>
                        </video>
                    </div>
                </div>
            </div>
            </div>
      </section>
      <section class="section">
        <div class="column is-8 is-offset-2">
          <div class="box">
              
            <div class="tile is-ancestor">
              
              <div class="tile is-parent">
                <article class="tile is-child notification is-dark has-text-centered">
                  <div class="is-inline-block">
                    <Joystick
                      size={120}
                      sticky={false}
                      baseColor="#C0C0C0"
                      stickColor="#404040"
                      throttle={100}
                      move={(ev) => {
                        console.log(ev);
                        socket.emit("controle", {x:ev.x, y:ev.y});
                      }}
                      stop={(ev) => {
                        console.log(ev);
                        socket.emit("controle", {x:0, y:0});
                      }}>          
                    </Joystick>
                  </div>
                </article>
              </div>

              <div class="tile is-parent">
                <div class="tile is-child notification has-text-centered is-warning is-button-tile is-clickable">
                  <div class="is-inline-block "
                    onClick={() => {
                      console.log("botao");
                      if(waterOn == true){
                        socket.emit("desligarBomba");
                        waterOn = false;
                      }
                      else{
                        socket.emit("ligarBomba");
                        waterOn = true;
                      }
                    }}
                  >
                    <figure class="image is-128x128">
                      <img src={require("./images\\extintor.png")}></img>
                    </figure>
                  </div>
                </div>
              </div>

              <div class="tile is-parent is-5">
                <article class="message">
                    <div class="message-header">
                      <p>Instruções de uso</p>
                    </div>
                    <div class="message-body">
                        <span>Utilize o joystick para movimentar o robô.<br/>
                        Quando necessário, aperte o botão do extintor para ativá-lo.</span>
                    </div>
                </article>
              </div>

          </div>

            </div>
        </div>
    </section>
    
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            Projeto desenvolvido por <strong>Guilherme Kenzo Takano Miller e Larissa Lewartoski Wong</strong>, para a disciplina de Introdução à Ciência da Computação no ano de 2022.
          </p>
        </div>
      </footer>
    </div>
  );

  
}

export default App;
