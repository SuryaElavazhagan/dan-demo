import { getRandomColor, getRandomCoordinates } from './randomUtils'

/**
 * 
 * @param {string} id id of the HTML element, in which you want to present the chart
 * @param {string} data The inputText from the user
 */

export default function renderPlotChart(id, data){
    const d3 = require('d3');

    d3.select(`#${id}`).select('svg').remove();

    const width = window.screen.availWidth > 500 ? Math.ceil(window.screen.availWidth/2) - 10 : window.screen.availWidth;
    const height = 350;

    const margin = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    }
    
    const n = 100 + ((data.length + 1) * 50);
    const xThreshold = 250 + ((data.length % 5) * 5);
    const yThreshold = 250 + ((data.length % 10) * 10);

    let dataPoints = getRandomCoordinates(n, xThreshold, yThreshold);


    const xScale = d3.scaleLinear()
                    .domain([0, xThreshold])
                    .range([margin.left + margin.right, width - margin.left - margin.right]);
    const yScale = d3.scaleLinear()
                    .domain([0, yThreshold])
                    .range([height - margin.top - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    let plotChartSVG = d3.select(`#${id}`)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

    plotChartSVG.append("g")
                .selectAll("circle")
                .data(dataPoints)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d[0]))
                .attr("cy", d => yScale(d[1]))
                .attr("r", "7")
                .attr("fill",() => getRandomColor())
                .attr("fill-opacity", "0.7");

    plotChartSVG.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .attr("class", "axis")
            .call(xAxis);

    plotChartSVG.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left + margin.right} , 0)`)
            .call(yAxis);
}