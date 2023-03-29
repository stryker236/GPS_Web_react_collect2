import {useState} from "react";
import { distance,PostRequest } from "./utilis";
import RenderButton from "./RenderButton"

var ListWithTheUserTrip = []
var DeviceID = CheckUserID()
var wakeLock = null
//TODO: Mostrar na app os valores que estão a ser lidos  (done)
//TODO: Ver como obter um identificador universal(UUID) (done)
//TODO: Ver como guardar UUID no storage interno (done)
//TODO: Ver como impedir o ecrã de se desligar (done)
//TODO: Integrar com a cloud
//TODO: Ver como integrar o Node.js no meio disto tudo
//NOTA: tenho de descobrir como dar deply do Node server e como fazer com que este comsiga reveber os dados do server com o React
//TODO: Separar este projeto em mais components

function CheckUserID() {
    let DeviceID = localStorage.getItem("DeviceID")
    if(!DeviceID){
        localStorage.setItem("DeviceID",crypto.randomUUID())
    }
    console.log("DeviceID: ",DeviceID);
    return DeviceID
}
function Coord (){
    const [lista,setlist] = useState([])
    const [colleting,setCollecting] = useState(false)
    const [watchID,newWatchID] = useState(null)
    const [latitude,setLatitude] = useState(null)
    const [longitude,setLongitude] = useState(null)
    const [speed,setSpeed] = useState(null)
    const [dist,setDistance] = useState(null)
    const [time,setTime] = useState(null)
    
    console.log("info")
    // console.log("WatchID",watchID)
    console.log("Collecting coord",colleting)
    // console.log("Tamanho da lista",lista.length)
    // console.log("Lista em si",lista)
    console.log("---------------------");

    
    async function BeginTrip() {
        wakeLock = await navigator.wakeLock.request("screen");
        setCollecting(true)
        // console.log("Teste watch",watchID);
        
        let aux = navigator.geolocation.watchPosition(        
            function success(position) {
                // console.log("Lista no Sucess",ListWithTheUserTrip)
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let speed = position.coords.speed
                if (!speed) {
                    speed = 0
                }
                let time = new Date(position.timestamp).toLocaleString()
                let dist = 0
                if (ListWithTheUserTrip.length !== 0) {
                    // console.log("Tamanho da lista antes do calculo",ListWithTheUserTrip.length);
                    // console.log("Lista durante  o calculo",ListWithTheUserTrip);
                    dist = distance(latitude,longitude,ListWithTheUserTrip[ListWithTheUserTrip.length-1]["lat"],ListWithTheUserTrip[ListWithTheUserTrip.length-1]["long"])
                }
                // let data = [latitude,longitude,dist,speed,time]
                let data = {
                    "lat" : latitude,
                    "long" : longitude,
                    "speed" : speed,
                    "dist" : dist,
                    "timestamp" : time,
                }

                setLatitude(latitude)
                setLongitude(longitude)
                setSpeed(speed)
                setTime(time)
                setDistance(dist)

                if(ListWithTheUserTrip.length !== 0){
                  if (JSON.stringify(ListWithTheUserTrip[ListWithTheUserTrip.length-1]) !== JSON.stringify(data)) {
                    ListWithTheUserTrip.push(data)  
                  }
                }
                else{
                    ListWithTheUserTrip.push(data) 
                }
        },
        function error(err) {
            console.error(`ERROR(${err.code}): ${err.message}`);
          },
          {
            enableHighAccuracy: true,
          })      




        console.log("info da lista antiga", ListWithTheUserTrip);
        // console.log("info nova na lista", data);
        console.log("tamanhho da lista",ListWithTheUserTrip.length);
        console.log("------------------")

        console.log("novo id",aux);
        newWatchID(aux)
    }

    function Endtrip() {
        wakeLock.release().then(() => {
            wakeLock = null;
          });
        navigator.geolocation.clearWatch(watchID)
        let final = {
            "trip" : ListWithTheUserTrip,
            "tripID" : crypto.randomUUID(),
            "DeviceID" : DeviceID,
        }
        // console.log("Tipo da lista",typeof ListWithTheUserTrip);
        setlist(final)
        // console.log("viagem final:",ListWithTheUserTrip);
        PostRequest(JSON.stringify(final))
        ListWithTheUserTrip = []
        setCollecting(false)
        //aqui deve chamar uma função para apanhar
    }

    function TripInfo() {
        // console.log("Lista no trip info",lista);
        // console.log("Tipo da lista",lista["trip"][0]);
        
        // let data = lista.map((ponto) => <div>{ponto[0]}{"   "}{ponto[1]}{"   "}{ponto[2]}</div>)
        if (lista.length !== 0) {
            let data = lista["trip"].map((ponto,i) => <div key={i}>{ponto["lat"]}{"   "}{ponto["long"]}{"   "}{ponto["speed"]}{"   "}{ponto["dist"]}{"   "}{ponto["timestamp"]}</div>)
            data.push(<div key={"a"}>DeviceID: {lista["DeviceID"]}</div>)
            data.push(<div key={"b"}>TripID: {lista["tripID"]}</div>)
            return data
            
        }
    }


    // function RenderButton() {
    //     if(colleting === false){
    //         return <Button variant='contained' color="primary" onClick={BeginTrip}>Iniciar Viagem</Button>
    //     }
    //     else{
    //         return <Button variant='contained' color="primary" onClick={Endtrip}>Encerrar trip</Button>
    //     }
    // }



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
                <div>{dist}</div>
            </div>
            <div>
                <div>time</div>
                <div>{time}</div>
            </div>
            <RenderButton BeginTrip={BeginTrip} Endtrip={Endtrip} colleting = {colleting} />
            <p/>
            <TripInfo/>
        </div>
        );
}

export default Coord;