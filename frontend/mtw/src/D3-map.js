import React from 'react';
import * as d3 from 'd3';
import './D3-map.css';
import axios from 'axios'
import * as R from 'ramda';

let width = 750
let height = 500

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

    console.log(data)

    if (code.substring(0, 1) === 'E' && !!data) {
      console.log(code)
      console.log(data)
    }
    if (data == undefined) {
      // handle error more gracefully; for now, highlight it bright red!
      return 99999;
    }

    return data.total
  }
  
  queryWard(wardData, mapData, ward) {
    let total = this.getTotal(wardData, mapData, ward);
    
    axios.get("http://localhost:5000/uk-stats")
      .then(stats => {
        this.props.onWardClick({
          ward: ward,
          total: total,
          stats: stats.data
        });
    })
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
            let max = maximum(wardData.data)
            let min = minimum(wardData.data)
            
            const projection = d3.geoAzimuthalEqualArea()
                  .fitExtent([[0, 0], [width, height]], mapdata.data)

            const path = d3.geoPath()
                  .projection(projection)
            
            const g = svg.append('g');
            
            this.g = g;
            this.path = path;
            
            let _this = this;
            
            g.selectAll("path")
              .data(mapdata.data.features)
              .enter()
              .append("path")
              .attr("d", path)
              .attr('fill', p => {
                let k = this.getTotal(wardData.data, mapdata.data, p) / max;
                let x = (1 - k) * 255
                return `rgb(255, ${x}, ${x})`
              })
              .on('mouseover', function(d) {
                d3.select(this).classed('active', true)
              })
              .on('mouseout', function(d) {
                d3.select(this).classed('active', false)
              })
              .on('click', function(d) {
                _this.queryWard(wardData.data, mapdata.data, d);
              })
            
            let zoomed = () => {
              g.attr("transform", d3.event.transform);
            }
            
            g.call(
              d3.zoom().on("zoom", zoomed)
                .extent([[0, 0], [width, height]])
                .scaleExtent([1, 12])
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
