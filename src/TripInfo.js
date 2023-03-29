function TripInfo({lista}) {
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

export default TripInfo