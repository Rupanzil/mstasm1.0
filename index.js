import { createPanelSection } from './asmPanelSections.js';
import { createPanelGeometry } from './asmPanelGeometry.js';
import { createSelectedSections } from './asmSelectedSection.js';
import { createPanelObjects, Panel } from './panelObject.js';
import { createLegConnections } from './asmLegConnections.js';
import { createMainBracingConnections, panelBaseElevations } from './asmMainDiagonalConnections.js';
import { createMainHorizontalConnections } from './asmMainHorizontalConnection.js';
import { createSecondaryDiagonalConnections } from './asmSecondaryDiagonalConnections.js';
import { createSecondaryHorizontalConnections } from './asmSecondaryHorizontalConnections.js';
import { 
    processTowerDataFile, 
    countPanelNumbers, 
    getPanelHeights, 
    getNumberofFaces,
    getPanelsInSection,
    getPanelFaces,
    getPanelTopWidths,
    getBaseWidth } from './tdprocessor.js'


    
document.getElementById('process-td').addEventListener('click', () => {
    const td = document.getElementById('td-text').value
    beginConversion(td)
})

function beginConversion(td) {
    // processes the td file and converts it into arrays to process it further
    const towerData = processTowerDataFile(td)

    // get the base width
    const baseWidth = getBaseWidth(towerData)

    // get number of faces
    const numberOfFaces = getNumberofFaces(towerData)

    // gets the total number of panels present in td
    const numberOfPanels = countPanelNumbers(towerData)

    // creates an array of panel heights
    const panelHeightsfromTop = getPanelHeights(towerData)
    const panelHeightsFromBottom = [...panelHeightsfromTop].reverse().map( item => Number(item))

    // get and store the elevations in an array
    let panelElevations = [];
    let towerTotalHeight = 0;
    panelHeightsFromBottom.forEach( (panelHeight) => {
        towerTotalHeight += panelHeight;
        panelElevations.push(towerTotalHeight)
    })

    // create an array containing the number of panels in each section
    const panelsInSection = getPanelsInSection(towerData)


    // create an array containing all the tower faces
    const panelFaces = getPanelFaces(towerData)

    //create an array to get the top widths of the panels
    //   if tw is present for a panel, then store it otherwise store ' '
    const topWidths = getPanelTopWidths(towerData)

    // process the panel specific information into asm specific info


    // +++++++++++ GEOMETRY PART +++++++++++

    // 1. panel geometry
    const panelGeometry = createPanelGeometry(panelElevations, panelFaces, topWidths, panelHeightsFromBottom)

    const panelGeometryTextArea = document.getElementById('asm-panel-geometry')
    panelGeometryTextArea.value = panelGeometry


    // Displays the number of tower faces
    document.getElementById('num-of-faces').innerText = `No. of Tower Faces: ${numberOfFaces}`

    // Display the base width of the tower
    document.getElementById('base-width').innerText = `Tower Base Width: ${baseWidth} m`

    // 2. panel section
    
    //  i. Create selected sections
    //  - From the sections part of the TD, unique sections has to be identified
    //  - Cross check the uniquely identified sections and add them to the selected sections dialog box
    // getUniqueSections(towerData)
    /*
    Can we create an object of the following format?
    sections = {
        'MemberID': {
            sectionType : 'EA' or 'ASXC' or 'ASX' or 'CHS',
            grade: 235 or 275 or 345 or 355 
        }
    }
    */
    const asmSelectedSection = createSelectedSections(towerData);
    document.getElementById('asm-selected-sections').value = asmSelectedSection;  // add the sections for ladder and hoop and platforms

    // ii. creating the panel section
    const panelSection = createPanelSection(towerData, panelElevations, numberOfPanels)
    document.getElementById('asm-panel-sections').value = panelSection;

    // 3. plan bracing
    // 4. hip bracing
    // 5. member Option
    // 6. connection
    //      a. main leg
    //         i. CHS flange connection
    //         ii. generic connection

    const legConnections = createLegConnections(towerData, panelElevations, panelsInSection)
    // console.log(legConnections);
    document.getElementById('asm-leg-connection').value = legConnections;

    //      b. diagonal
    const mainDiagonalConnections = createMainBracingConnections(towerData, panelElevations)
    // console.log(mainDiagonalConnections);
    document.getElementById('asm-main-diagonal-connection').value = mainDiagonalConnections;

    //      c. horizontal
    const mainHorizontalConnections = createMainHorizontalConnections(towerData, panelElevations)
    document.getElementById('asm-main-horizontal-connection').value = mainHorizontalConnections;
    
    //      d. secondary diagonal
    const secondaryDiagonalConnections = createSecondaryDiagonalConnections(towerData, panelBaseElevations, panelElevations)
    document.getElementById('asm-secondary-diagonal-connections').value = secondaryDiagonalConnections;

    //      e. secondary horizontal
    const secondaryHorizontalConnections = createSecondaryHorizontalConnections(towerData, panelBaseElevations, panelElevations)
    document.getElementById('asm-secondary-horizontal-connections').value = secondaryHorizontalConnections;


    //  
    // +++++++++++++++++++++++++++++++++++++

    // ++++++++++++ LOADING PART +++++++++++

    //++++++++++++++++++++++++++++++++++++++

}