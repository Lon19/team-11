import React from 'react';
import * as d3 from 'd3';
import './D3Map.css';

// let geojson = require('./map.geojson');
// console.log(geojson)
// import geojson from "./map.geojson";
import geo from './map-json';
console.log(geo)

class D3Map extends React.Component {
    componentDidMount() {
        this.drawMap();
    }

    drawMap() {
        const svg = d3.select('#map')
            .append('svg')
            .attr('width', 400)
            .attr('height', 400);


        // console.log(geojson)

        // let url = "https://opendata.arcgis.com/datasets/a0b43fe01c474eb9a18b6c90f91664c2_0.geojson"

        // let url = "./map.geojson"
        // console.log("uh")
        // d3.json(url, (err, json) => {
        //     console.log(json);
        // });

        const projection = d3.geoEquirectangular();

        const path = d3.geoPath()
            .projection(projection);

        // svg.selectAll("path")
        //     .data(geo.features)
        //     .enter()
        //     .append("path")
        //     .attr("d", path);
    }

    render() {
        return <div id="map"></div>
    }
}

export default D3Map;
