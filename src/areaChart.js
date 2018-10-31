import { getStackedCoordinates, colors } from './utils';

/**
 * 
 * @param {string} id id of the HTML element, in which you want to present the chart
 * @param {string} data The inputText from the user
 */

export default function renderAreaChart(id, data){
    const d3 = require('d3');

    d3.select(`#${id}`).select('svg').remove();

    const width = window.innerWidth - 10;
    const height = 320;

    const margin = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }
    
    const xThreshold = 250 + ((data.length % 5) * 25);
    const yThreshold = 250 + ((data.length % 10) * 15);
    const numberOfLayers = 6;

    let dataPoints = getStackedCoordinates(xThreshold, yThreshold, numberOfLayers);

    const xScale = d3.scaleLinear()
                    .domain([0, xThreshold])
                    .range([margin.left + margin.right, width - margin.left - margin.right]);
    const yScale = d3.scaleLinear()
                    .domain([0, yThreshold])
                    .range([height - margin.top - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const area = d3.area()
                    .x(d => xScale(d[0]))
                    .y0(d => yScale(d[1]))
                    .y1(d => yScale(d[2]));

    let areaChartSVG = d3.select(`#${id}`)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

    // areaChartSVG.append("g")
    //             .selectAll("path")
    //             .data(dataPoints)
    //             .enter()
    //             .append("p")
    //             .attr("d",d => area(d))
    //             .attr("fill",(_, index) => colors[index])
    //             .attr("fill-opacity", "0.7");

    areaChartSVG.append("g")
                .selectAll("path")
                .data(dataPoints)
                .enter()
                .append("path")
                .datum(d => d)
                .attr("fill", (_, i) => colors[i])
                .attr("d", area);

    areaChartSVG.append("g")
                .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
                .call(xAxis);
    areaChartSVG.append("g")
                .attr("transform", `translate(${margin.left + margin.right} , 0)`)
                .call(yAxis);

}