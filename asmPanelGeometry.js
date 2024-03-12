import { panelFacesDB } from "./panelFaceDB.js";

// let's first take only one panel type in consideration and
// then we can expand upon that.

/*

objective is to create a format which can be pasted onto ASM interface
the general format for panel geometry is

topElevation\tPanelType\tSubdivide\tTopWidth\tPanelHeight\tCrankRatio\tComments\n

\n - Creates a new line in ASM interface
\t - tabs to the next horizontal cell

*/

let asmPanels = []
let asmSubdivide = []
let asmPanelGeometry = []
function createPanelGeometry( panelElevations, mstTowerFaces, topWidths, panelHeights) {
    mstTowerFaces.forEach((face,index) => {
        let asmPanelType = panelFacesDB[face]['panelType']
        // if (asmPanelType == 'X' && )     // add the functionality to detect X or X0 panels having PLAN bracings in XIP position.
        let asmPanelSubdivision = panelFacesDB[face]['subdivide']
        asmPanels.push(asmPanelType)
        asmSubdivide.push(asmPanelSubdivision)
        let panelGeometryLine = `${panelElevations[index]}\t${asmPanelType}\t${asmPanelSubdivision}\t${topWidths[index]}\t${panelHeights[index]}`
        asmPanelGeometry.push(panelGeometryLine)
    });
    asmPanelGeometry = asmPanelGeometry.join()
    asmPanelGeometry = asmPanelGeometry.replaceAll(',', '\n')

    return asmPanelGeometry
}

function getPanelGeometry() {
 return;
}
export { createPanelGeometry };