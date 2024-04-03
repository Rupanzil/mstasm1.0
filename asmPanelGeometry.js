import { panelFacesDB, allPanelFacesinDB } from "./panelFaceDB.js";
import { invertedOrNot } from "./tdprocessor.js";

// let's first take only one panel type in consideration and
// then we can expand upon that.

/*

objective is to create a format which can be pasted onto ASM interface
the general format for panel geometry is

topElevation\tPanelType\tSubdivide\tTopWidth\tPanelHeight\tCrankRatio\tComments\n

\n - Creates a new line in ASM interface
\t - tabs to the next horizontal cell

*/

/*
need an array of NDs, NTRs and PB positions
this will make processing for panels easy
*/


let asmPanels = []
let asmSubdivide = []
let asmPanelGeometry = []
let asmPanelGeometryComments = []
let isPanelPresentInDB = false;
let actualPanelFaces = []

function createPanelGeometry( panelElevations, mstTowerFaces, topWidths, panelHeights) {
    console.log('Panel faces detected from TD', mstTowerFaces);
    console.log('This is the panel faces db', allPanelFacesinDB);
    // check if current panel face is included in DB

    // if panel is of K type then check whether INV or not
    mstTowerFaces.forEach((currentPanelFace, index) => {
        if (allPanelFacesinDB.includes(currentPanelFace)) {
            isPanelPresentInDB = true;
            // console.log(`current face ${currentPanelFace} and isInverted?: ${invertedOrNot[index]}`);
            processPanelFaceForGeometry(currentPanelFace, panelElevations, topWidths, panelHeights, index, isPanelPresentInDB, invertedOrNot[index])
        } else {
            // console.log(`current face ${currentPanelFace} and isInverted?: ${invertedOrNot[index]}`);
            isPanelPresentInDB = false;
            processPanelFaceForGeometry(currentPanelFace, panelElevations, topWidths, panelHeights, index, isPanelPresentInDB, invertedOrNot[index])
        }
    });
    
    asmPanelGeometry = asmPanelGeometry.join()
    asmPanelGeometry = asmPanelGeometry.replaceAll(',', '\n')
    
    return asmPanelGeometry
}

function processPanelFaceForGeometry(currentPanelFace, panelElevations, topWidths, panelHeights, index, isPanelPresentInDB, isPanelInverted) {
    let asmPanelType = ''
    // if (asmPanelType == 'X' && )     // add the functionality to detect X or X0 panels having PLAN bracings in XIP position.
    let asmPanelSubdivision;
    let asmPanelGeometryComment = ''
    
    if (isPanelPresentInDB) {
        asmPanelGeometryComment = 'OK.'
        asmPanelType = panelFacesDB[currentPanelFace]['panelType']
        // console.log(`${currentPanelFace} is being processed correctly`);
        
        // this checks whether the panel is inverted or not
        if (isPanelInverted) {
            // console.log(`${currentPanelFace} is processed correctly but is inverted`);
            currentPanelFace = currentPanelFace.replace(/\bK(?=\d)|\bK\b/, 'M')
            // console.log(`changed current panel face ${currentPanelFace}`);
            asmPanelType = panelFacesDB[currentPanelFace]['panelType']
            asmPanelSubdivision = panelFacesDB[currentPanelFace]['subdivide']
            actualPanelFaces.push(currentPanelFace)
            // asmPanels.push(asmPanelType)
            // asmSubdivide.push(asmPanelSubdivision)
        } else {
            asmPanelType = panelFacesDB[currentPanelFace]['panelType']
            asmPanelSubdivision = panelFacesDB[currentPanelFace]['subdivide']
            actualPanelFaces.push(currentPanelFace)
        }
    } else {
        // this covers the cases where the panel is not present in the database
        asmPanelGeometryComment = 'Not OK. Check Manually'

        // check whether the panel is inverted or not
        // only K panels can be inverted, So all, KMA, KMGD, KM faces will be converted to M2
        // and non inverted K type panels will be converted to K2
        if (isPanelInverted) {
            // console.log('Panel not processed correctly', currentPanelFace, 'and is inverted');
            // special processing for KM panels
            // if ( currentPanelFace == 'KM') {
            //     processForKMFace( currentPanelFace, isPanelInverted)
            // }
            
            currentPanelFace = 'M2'
            asmPanelType = panelFacesDB[currentPanelFace]['panelType']
            asmPanelSubdivision = panelFacesDB[currentPanelFace]['subdivide']
            actualPanelFaces.push(currentPanelFace)
        } else {
            // these panels will handle all other exceptional cases
            if (currentPanelFace.match(/\bK/)) {
                currentPanelFace = 'K2'
                asmPanelType = panelFacesDB[currentPanelFace]['panelType']
                asmPanelSubdivision = panelFacesDB[currentPanelFace]['subdivide']
                actualPanelFaces.push(currentPanelFace)
            } else {
                currentPanelFace = 'X0'
                asmPanelType = panelFacesDB[currentPanelFace]['panelType']
                asmPanelSubdivision = panelFacesDB[currentPanelFace]['subdivide']
                actualPanelFaces.push(currentPanelFace)
            }
        }

    }
    asmPanelGeometryComments.push(asmPanelGeometryComment)
    let panelGeometryLine = `${panelElevations[index]}\t${asmPanelType}\t${asmPanelSubdivision}\t${topWidths[index]}\t${panelHeights[index]}\t0\t${asmPanelGeometryComment}`
    asmPanelGeometry.push(panelGeometryLine)
}

function getPanelGeometry() {
 return;
}
export { createPanelGeometry, actualPanelFaces, asmPanelGeometryComments };