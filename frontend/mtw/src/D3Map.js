import React from 'react';
import * as d3 from 'd3';
import './D3Map.css';
import axios from 'axios'
import * as R from 'ramda';

let width = 1000
let height = 1000

class D3Map extends React.Component {
  path;
  g;
  componentDidMount() {
    this.drawMap();
  }
  
  rend() {
    this.g.selectAll('path').attr('d', this.path);
  }
  
  zoomed() {
    this.g.attr("transform", d3.event.transform);
  }
  
  getWardData() {
    return axios.get("http://localhost:5000/ward-data")
  }
  
  getTotal(wardData, mapData, feature) {
    let code = feature.properties.wd18cd;
    let data = wardData[code];

    if (data == undefined) {
      // console.log("Missing ward data.");
      return 99999;
    }
    
    return data.total
  }
  
  

  drawMap() {
    const svg = d3.select('#map')
          .append('svg')
          .attr('width', width)
          .attr('height', height);
    axios.get("http://localhost:5000/map-data")
      .then(mapdata => {
        this.getWardData()
          .then(wardData => {
            let maximum = (obj) => {
              let m = -Infinity;
              for (let prop in obj) {
                if (obj[prop].total > m) {
                  m = obj[prop].total
                }
              }
              return m;
            }
            let minimum = (obj) => {
              let m = Infinity;
              for (let prop in obj) {
                if (obj[prop].total < m) {
                  m = obj[prop].total
                }
              }
              return m;
            }
            // console.log(toIndividualKeys(wardData));
            let max = maximum(wardData.data)
            console.log(max)
            let min = minimum(wardData.data)
            console.log(min)
            console.log(wardData.data);
            console.log(mapdata.data);
            
            
            const projection = d3.geoAzimuthalEqualArea()
                  .fitExtent([[0, 0], [width, height]], mapdata.data)

            const path = d3.geoPath()
                  .projection(projection)
            
            const g = svg.append('g');
            
            this.g = g;
            this.path = path;

            g.selectAll("path")
              .data(mapdata.data.features)
              .enter()
              .append("path")
              .attr("d", path)
              .attr('fill', p => {
                // console.log(d3.interpolateReds(this.getTotal(wardData.data, mapdata.data, p) / max))
                let k = this.getTotal(wardData.data, mapdata.data, p) / max;
                // if (k > 0.25) {
                //   console.log(p)
                //   console.log(k)
                // }
                let x = (1 - k) * 255
                return `rgb(255, ${x}, ${x})`
              })
            
            let zoomed = () => {
              g.attr("transform", d3.event.transform);
            }
            
            g.call(
              d3.zoom().on("zoom", zoomed)
                .extent([[0, 0], [width, height]])
                .scaleExtent([1, 8])
            )
            
            
          })
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    return <div id="map"></div>
  }
}

export default D3Map;
