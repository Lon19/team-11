import React from 'react';
import * as d3 from 'd3';
import './D3Map.css';
import axios from 'axios'
import d3GeoZoom from 'd3-geo-zoom'

// let geojson = require('./map.geojson');
// console.log(geojson)
// import geojson from "./map.geojson";

class D3Map extends React.Component {
  componentDidMount() {
    this.drawMap();
  }

  drawMap() {
    const svg = d3.select('#map')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 1000);
    axios.get("http://localhost:5000/map-data")
      .then(resp => {
        console.log(resp.data);
        const projection = d3.geoAzimuthalEqualArea()
              .fitExtent([[0, 0], [1000, 1000]], resp.data)

        const path = d3.geoPath()
              .projection(projection)

        svg.selectAll("path")
            .data(resp.data.features)
            .enter()
            .append("path")
            .attr("d", path);
      })
    .catch(e => {
      console.log(e);
    })
    

    // console.log(geojson)

    // let url = "https://opendata.arcgis.com/datasets/a0b43fe01c474eb9a18b6c90f91664c2_0.geojson"

    // let url = "./map.geojson"
    // console.log("uh")
    // d3.json(url, (err, json) => {
    //     console.log(json);
    // });

  }

  render() {
    return <div id="map"></div>
  }
}

export default D3Map;
