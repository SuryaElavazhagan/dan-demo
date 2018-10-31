/*
    The only difference from Dan's demo and this app is that,
    the input to the chart is random.
*/

const colors = ["#F4D03F", "#F4D03F", "#2980B9", "#D35400", "#7D3C98", "#1E8449"];

// Returns a random color from the above six
function getRandomColor(){    
    return colors[getRandomNumberBetween(0, colors.length)];
}

/**
 * 
 * @param {Integer} min The minimum number from which you want to get random number (Inclusive)
 * @param {Integer} max The maximum number within which you want to get random number (Exclusive)
 * 
 * @returns A random number within two given params
 */
function getRandomNumberBetween(min, max){
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

/**
 * 
 * @param {Integer} noOfCoordinates Specifies the number of coordinates needed
 * @param {Integer} xThreshold Specifies the maximum X-Axis value
 * @param {Integer} yThreshold Specifies the maximum Y-Axis value
 * 
 * @returns An array of random coordinates  eg) [[x,y], ....]
 */
function getRandomCoordinates(noOfCoordinates, xThreshold, yThreshold){
    let coordinates = [];
    for(let iterator = 0; iterator < noOfCoordinates; iterator++){
        coordinates.push([getRandomNumberBetween(0 , xThreshold + 1) , getRandomNumberBetween(0, yThreshold + 1)]);
    }
    return coordinates;
}

/**
 * 
 * @param {Integer} xThreshold Specifies the maximum X-Axis value
 * @param {Integer} yThreshold Specifies the maximum Y-Axis value
 * 
 * @returns An array of random coordinates for each integer in x-axis
 */
function getLinearCoordinates(xThreshold, yThreshold){
    let coordinates = [];
    for(let iterator = 1; iterator <= xThreshold; iterator++){
        coordinates.push([iterator, getRandomNumberBetween(10, yThreshold + 1)]);
    }
    return coordinates;
}

/**
 * 
 * @param {Integer} xThreshold Specifies the maximum X-Axis value
 * @param {Integer} yThreshold Specifies the maximum Y-Axis value
 * @param {Integer} noOfLayers specifies the number of layers
 * 
 * @returns an array of random stacked area coordinates  eg) [[x1,y1,y0], ...]
 */
function getStackedCoordinates(xThreshold, yThreshold, noOfLayers){
    let coordinates = [];
    const layerThreshold = Math.floor(yThreshold / noOfLayers);
    let prevLayerYCoords = Array.from(new Array(xThreshold), () => 0);
    for(let outerLoopCounter = 0; outerLoopCounter < noOfLayers; outerLoopCounter++){
        let tempLayer = [];
        for(let innerLoopCounter = 0; innerLoopCounter < xThreshold; innerLoopCounter++){
            let yCoord = getRandomNumberBetween(prevLayerYCoords[0], (outerLoopCounter + 1) * layerThreshold);
            prevLayerYCoords.push(yCoord);
            tempLayer.push([innerLoopCounter, yCoord, prevLayerYCoords.shift()]);
        }
        coordinates.push(tempLayer);
    }
    return coordinates;
}

export {
    getRandomColor,
    getRandomCoordinates,
    getLinearCoordinates,
    getStackedCoordinates,
    colors
}