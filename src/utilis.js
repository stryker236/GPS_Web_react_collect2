

let cloudFunction = "https://us-central1-projectbk2-71159.cloudfunctions.net/function-2"

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

function PostRequest(data) {
    console.log("data:",data);
    fetch(cloudFunction, {
        mode : "cors",
        // mode : "no-cors",
        method: "POST", 
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify({
            message : data
        })
      }).then(res => {
        console.log("Request complete! response:", res)
      });
}

export {distance,PostRequest}