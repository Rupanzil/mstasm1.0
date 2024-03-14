import { processIdsAndGrade } from "./processMemberIdsAndGrade.js";

function processTowerDataFile(td) {
    // console.log(td)
    // storing each line of the td in a line array
    const rawlines = td.split('\n');

    // removes the leading and trailing whitespaces in a line
    const linesWithSpace = rawlines.filter( str => str.trim() !== '')
    // console.log(linesWithSpace);
    let lines = linesWithSpace.map( str => str.replace( /^\s+|\s$/g, '' ).toUpperCase())

    lines = processIdsAndGrade(lines)
    // console.log(lines);

    // Each line is stored in an array and each word is stored as array within a line array
    const parts = lines.map( line => line.trim().split(/\s+/));
    // console.log('parts :', parts);
    return parts;
}
let totalNumberofPanels;
function countPanelNumbers(towerData) {
    let panelCount = 0;

    // Iterating over the parts array
    towerData.forEach(line => {
        // Checking if 'PANEL' is mentioned in the line
        if (line.includes('PANEL')) {
            panelCount++;
        }
    });
    totalNumberofPanels = panelCount
    return panelCount;
}

function getPanelHeights(towerData) {
    let panelHeights = []
    towerData.forEach( line => {
        line.forEach( (element, index) => {
            if (element === 'HT') {
                const panelHeight = parseFloat(line[index + 1])
                panelHeights.push(panelHeight.toFixed(2))
            }
        });
    });
    return panelHeights;
}

function getPanelsInSection(towerData) {
    let panelInSections = []
    let panelCountInSection = 0;
    for (let index = 0; index < towerData.length; index++) {
        const line = towerData[index];
        if (line.join(' ').match(/\$?SECTION\s+\d+/) || line.includes('END')) {
            if (panelCountInSection > 0) {
                panelInSections.push(panelCountInSection)
                panelCountInSection = 0
            }
        }
        if (line.includes('PANEL')) {
            panelCountInSection++;
        }
    }
    const panelsInSectionFromBottom = [...panelInSections].reverse()
    return panelsInSectionFromBottom;
}

function getNumberofFaces(towerData) {
    let numberOfFaces = 0;
    towerData.forEach( line => {
        if (line.includes('FACES')) {
            numberOfFaces = line[line.length - 1]
        }
    })
    checkInvertedPanels(towerData)
    return numberOfFaces;
}

function getBaseWidth(towerData) {
    let baseWidth = 0
    towerData.forEach( line => {
        if (line.includes('WBASE')) {
            line.forEach((word, index) => {
                if (word === 'WBASE') {
                    baseWidth = line[index + 1]
                }
            });
        }
    })
    return baseWidth;
}

function getPanelFaces(towerData) {
    let panelFaces = []
    towerData.forEach( line => {
        if (line.includes('FACE')) {
            line.forEach(( word, index ) => {
                if (word === 'FACE') {
                    let face = line[index + 1]
                    panelFaces.push(face)
                }
            });
        }
    });
    const panelFacesFromBottom = [...panelFaces].reverse()
    return panelFacesFromBottom;
}

// Creates an array of topwidth containing values where TW is mentioned in the TD or else taking ' '
// the ' ' can be filled up later using ASM or here in JS.
// for now I will use ASM to autofill the blank Data using "Calculate Missing Data" button.
function getPanelTopWidths(towerData) {
    let PanelTopWidths = []
    towerData.forEach( line => {
        if (line.includes('TW')) {
            line.forEach(( word, index ) => {
                if (word === 'TW') {
                    let topWidth = line[index + 1]    // tw should be a number
                    topWidth = Number(topWidth)
                    if (!isNaN(topWidth)) {
                        PanelTopWidths.push(topWidth)
                    }
                }
            });
        } else if (line.includes('HT')) {
            PanelTopWidths.push(' ')
        }
    });
    const panelTopWidthsFromBottom = [...PanelTopWidths].reverse()
    return panelTopWidthsFromBottom;
}

// check for inverted panels and make an array
let invertedOrNot = []

function checkInvertedPanels(towerData) {
    towerData.forEach( line => {
        if (line.join(' ').match(/^(?=.*\bFACE\b)(?=.*\bINV(?:ERT)?\b).*/)) {
            invertedOrNot.unshift(true)
        } else if (line.join(' ').match(/\bFACE\b/)) {
            invertedOrNot.unshift(false)
        }
    });
}

export { 
    processTowerDataFile, 
    countPanelNumbers, 
    getPanelHeights, 
    getNumberofFaces, 
    getPanelsInSection, 
    getPanelFaces,
    getPanelTopWidths,
    getBaseWidth,
    invertedOrNot,
    totalNumberofPanels
} ;