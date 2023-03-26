import {useState} from "react";
import { Button } from "@mui/material";


var ListWithTheUserTrip = []
console.log("Novo id",crypto.randomUUID()); 
//TODO: Mostrar na app os valores que estão a ser lidos  (done)
//TODO: Ver como integrar o Node.js no meio disto tudo
//TODO: Ver como obter um identificador universal(UUID)
//TODO: Ver como guardar UUID no storage interno
//TODO: Integrar com a cloud
//TODO: Ver como impedir o ecrã de se desligar

function Coord (){
    const [lista,setlist] = useState([])
    const [colleting,setCollecting] = useState(false)
    const [watchID,newWatchID] = useState(null)
    const [latitude,setLatitude] = useState(null)
    const [longitude,setLongitude] = useState(null)
    const [speed,setSpeed] = useState(null)
    // const [time,setTime] = useState(null)
    
    console.log("info")
    console.log("WatchID",watchID)
    console.log("Está em trip",colleting)
    console.log("Tamanho da lista",lista.length)
    console.log("Lista em si",lista)
    console.log("---------------------");

    
    
    function BeginTrip() {
        setCollecting(true)
        console.log("Teste watch",watchID);
        
        let aux = navigator.geolocation.watchPosition(        
            function success(position) {
                console.log("Lista no Sucess",ListWithTheUserTrip)
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let speed = position.coords.speed
                let time = new Date(position.timestamp).toLocaleString()
                let data = [latitude,longitude,time]

                setLatitude(latitude)
                setLongitude(longitude)
                setSpeed(speed)

                if(ListWithTheUserTrip.length !== 0){
                  if (JSON.stringify(ListWithTheUserTrip[ListWithTheUserTrip.length-1]) !== JSON.stringify(data)) {
                    ListWithTheUserTrip.push(data)  
                  }
                }
                else{
                    ListWithTheUserTrip.push(data) 
                }
        })      




        console.log("info da lista antiga", ListWithTheUserTrip);
        // console.log("info nova na lista", data);
        console.log("tamanhho da lista",ListWithTheUserTrip.length);
        console.log("------------------")

        console.log("novo id",aux);
        newWatchID(aux)
    }
    
    function Endtrip() {
        navigator.geolocation.clearWatch(watchID)
        setlist(ListWithTheUserTrip)
        console.log("viagem final:",ListWithTheUserTrip);
        ListWithTheUserTrip = []
        setCollecting(false)
        //aqui deve chamar uma função para apanhar
    }

    function TripInfo() {
        console.log("Lista no trip info",lista);
        let data = lista.map((ponto) => <div>{ponto[0]}{"   "}{ponto[1]}{"   "}{ponto[2]}</div>)
        return data
        return <div>ponto</div>
        return <Button variant='contained' color="primary" onClick={Endtrip}>Enceradsadsarar trip</Button>
    }


    function RenderButton() {
        if(colleting === false){
            return <Button variant='contained' color="primary" onClick={BeginTrip}>Iniciar Viagem</Button>
        }
        else{
            return <Button variant='contained' color="primary" onClick={Endtrip}>Encerrar trip</Button>
        }
    }



    return(
        <div>
            <div>
                <div>latitude</div>
                <div>{latitude}</div>
            </div>
            <div>
                <div>longitude</div>
                <div>{longitude}</div>
            </div>
            <div>
                <div>speed</div>
                <div>{speed}</div>
            </div>
            <div>
                <div>distance</div>
            </div>
            <div>
                <div>time</div>
            </div>
            <RenderButton />
            <p/>
            <TripInfo/>
        </div>
        );
}

export default Coord;