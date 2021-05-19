import React from 'react';
import './App.css';
import {GoogleMap, InfoWindow, LoadScript, Marker,} from "@react-google-maps/api";
import {mapStyle} from "./assets/mapStyle"
import {cities} from "./assets/cities";
import Slider from '@material-ui/core/Slider'
import styled from 'styled-components'

const mapContainerStyle = {
    width: "50vw",
    height: "50vh"
}
const center = {
    lat: 53.893009,
    lng: 27.567444
}
const options = {
    styles: mapStyle
}
let marks = cities.reduce((res, city) => {
    res.push({value: city.id, label: city.name})
    return res
}, [])
const SliderWrapper = styled.div`

  width: 50vw;
  margin: 20px;
`;
const GoogleMapWrapper = styled.div`
  border: 2px solid black;
  width: 50vw;
  margin: 20px;
`;

function App() {
    const [selected, setSelected] = React.useState(null);
    const onCloseClick = (e) => setSelected(null)
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCJRO1CqygG-R_GDRHuZMLG4KF3fIFdor8" language={"ru"}
        >
            <GoogleMapWrapper>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={8}
                options={options}

            >
                {cities.map(city => (
                    <Marker key={city.id}
                            onClick={() => {
                                setSelected(city);
                            }}
                            position={{lat: city.lat, lng: city.lng}}
                    />
                ))}
                {selected ? (<InfoWindow
                        position={{lat: selected.lat, lng: selected.lng}}
                        onCloseClick={onCloseClick}
                    >
                        <div>
                            <h3>Вы выбрали:</h3>
                            <h2>
                                {selected.name}
                            </h2>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
            </GoogleMapWrapper>
            <SliderWrapper><Slider
                value={selected ? selected.id : 1}
                valueLabelDisplay="auto"
                marks={marks}
                step={1}
                min={1}
                max={cities.length}
                onChange={(e, value) => setSelected(cities[value - 1])}
            /></SliderWrapper>
        </LoadScript>
    );
}

export default App;
