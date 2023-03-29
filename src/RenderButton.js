import { Button } from "@mui/material"

function RenderButton({BeginTrip,Endtrip,colleting}) {
    if(colleting === false){
        return <Button variant='contained' color="primary" onClick={BeginTrip}>Iniciar Viagem</Button>
    }
    else{
        return <Button variant='contained' color="primary" onClick={Endtrip}>Encerrar trip</Button>
    }
}

export default RenderButton