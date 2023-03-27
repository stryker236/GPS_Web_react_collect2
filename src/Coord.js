import {useState} from "react";
import { Button } from "@mui/material";


var ListWithTheUserTrip = []
var DeviceID = CheckUserID()
//TODO: Mostrar na app os valores que estão a ser lidos  (done)
//TODO: Ver como obter um identificador universal(UUID) (done)
//TODO: Ver como guardar UUID no storage interno (done)
//TODO: Ver como impedir o ecrã de se desligar
//TODO: Integrar com a cloud
//TODO: Separar este projeto em mais components
//TODO: Ver como integrar o Node.js no meio disto tudo

function CheckUserID() {
    let DeviceID = localStorage.getItem("DeviceID")
    if(!DeviceID){
        localStorage.setItem("DeviceID",crypto.randomUUID())
    }
    console.log(DeviceID);
    return DeviceID
}
function Coord (){
    const [lista,setlist] = useState([])
    const [colleting,setCollecting] = useState(false)
    const [watchID,newWatchID] = useState(null)
    const [latitude,setLatitude] = useState(null)
    const [longitude,setLongitude] = useState(null)
    const [speed,setSpeed] = useState(null)
    const [time,setTime] = useState(null)
    
    console.log("info")
    console.log("WatchID",watchID)
    console.log("Está em trip",colleting)
    console.log("Tamanho da lista",lista.length)
    console.log("Lista em si",lista)
    console.log("---------------------");

    
    function distance(lat1,lon1,lat2,lon2) {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;
    
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        const d = R * c; // in metres
        return d
    }
    function BeginTrip() {
        setCollecting(true)
        console.log("Teste watch",watchID);
        
        let aux = navigator.geolocation.watchPosition(        
            function success(position) {
                console.log("Lista no Sucess",ListWithTheUserTrip)
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let speed = position.coords.speed
                if (!speed) {
                    speed = "speed not supported"
                }
                let time = new Date(position.timestamp).toLocaleString()
                let dist = 0
                if (ListWithTheUserTrip.length !== 0) {
                    dist = distance(latitude,longitude,ListWithTheUserTrip[ListWithTheUserTrip.length-1][0],ListWithTheUserTrip[ListWithTheUserTrip.length-1][1])
                }
                // let data = [latitude,longitude,dist,speed,time]
                let data = {
                    "latitude" : latitude,
                    "longitude" : longitude,
                    "speed" : speed,
                    "dist" : dist,
                    "timestamp" : time,
                }

                setLatitude(latitude)
                setLongitude(longitude)
                setSpeed(speed)
                setTime(time)

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
        let final = {
            "trip" : ListWithTheUserTrip,
            "tripID" : crypto.randomUUID(),
            "DeviceID" : DeviceID,
        }
        // console.log("Tipo da lista",typeof ListWithTheUserTrip);
        setlist(final)
        // console.log("viagem final:",ListWithTheUserTrip);
        ListWithTheUserTrip = []
        setCollecting(false)
        //aqui deve chamar uma função para apanhar
    }

    function TripInfo() {
        console.log("Lista no trip info",lista);
        // console.log("Tipo da lista",lista["trip"][0]);
        
        // let data = lista.map((ponto) => <div>{ponto[0]}{"   "}{ponto[1]}{"   "}{ponto[2]}</div>)
        if (lista.length !== 0) {
            let data = lista["trip"].map((ponto,i) => <div key={i}>{ponto["latitude"]}{"   "}{ponto["longitude"]}{"   "}{ponto["speed"]}{"   "}{ponto["dist"]}{"   "}{ponto["timestamp"]}</div>)
            data.push(<div key={"a"}>DeviceID: {lista["DeviceID"]}</div>)
            data.push(<div key={"b"}>TripID: {lista["tripID"]}</div>)
            return data
            
        }
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
                <div>{time}</div>
            </div>
            <RenderButton />
            <p/>
            <TripInfo/>
        </div>
        );
}

export default Coord;