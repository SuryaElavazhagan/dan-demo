import { getRandomColor, getLinearCoordinates } from './randomUtils';
/**
 * 
 * @param {string} id id of the HTML element, in which you want to present the chart
 * @param {string} data The inputText from the user
 */

export default function renderLineChart(id, data){
    const d3 = require('d3');

    d3.select(`#${id}`).select('svg').remove();

    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const width = screenWidth > 900 ? Math.ceil(screenWidth/2) - 10 : window.screen.width;
    const height = 350;

    const margin = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }
    
    const xThreshold = 250 + ((data.length % 5) * 5);
    const yThreshold = 250 + ((data.length % 10) * 10);

    let dataPoints = getLinearCoordinates(xThreshold, yThreshold);


    const xScale = d3.scaleLinear()
                    .domain([0, xThreshold])
                    .range([margin.left + margin.right, width - margin.left - margin.right]);
    const yScale = d3.scaleLinear()
                    .domain([0, yThreshold])
                    .range([height - margin.top - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const line = d3.line()
                    .x(d => xScale(d[0]))
                    .y(d => yScale(d[1]))

    let lineChartSVG = d3.select(`#${id}`)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
    
    lineChartSVG.selectAll("g")
                .data(dataPoints)
                .enter()
                .append("g:path")
                .attr("d", (d, index) => line([[index + 1, 0], d]))
                .attr("stroke", () => getRandomColor())
                .attr("stroke-width", 1)
                .attr("fill", "none");

    lineChartSVG.append("g")
                .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
                .attr("class", "axis")
                .call(xAxis);
    lineChartSVG.append("g")
                .attr("transform", `translate(${margin.left + margin.right} , 0)`)
                .attr("class", "axis")
                .call(yAxis);
}