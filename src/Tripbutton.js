function Tripbutton(props) {

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
        setlist(ListWithTheUserTrip)
        console.log("viagem final:",ListWithTheUserTrip);
        ListWithTheUserTrip = []
        setCollecting(false)
        //aqui deve chamar uma função para apanhar
    }
    if(colleting === false){
        return <Button variant='contained' color="primary" onClick={BeginTrip}>Iniciar Viagem</Button>
    }
    else{
        return <Button variant='contained' color="primary" onClick={Endtrip}>Encerrar trip</Button>
    }
}

export default Tripbutton