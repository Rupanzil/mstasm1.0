// Leg connections are of two types : generic connection which are either single splice or double splice and flange connections for tubular connections
// Angled sections have connections with single or double shear - EA , STA , STASE, STASX, ASXC, ASX

import { panelFacesDB } from "./panelFaceDB.js"
import { getBoltDia, getBoltConnectionType, getBoltGrade } from "./boltDataProcessing.js";

function getLegConnectionElevations(panelElevations, panelsInSection) {
    let sectionElevations = [0.5]     // This will be base elevation if any
    let currentPanelNumber = 0
    console.log('Numbers of panels in each section', panelsInSection);

    panelsInSection.forEach((section, index) => {
        currentPanelNumber += section
        if (index != panelsInSection.length - 1) {
            sectionElevations.push(parseFloat(panelElevations[currentPanelNumber-1]) + 0.5)
        }
    });

    console.log('Section elevations: ',sectionElevations);
    return sectionElevations;
}

// gets leg Bolt details
// iterate through each line and store the bolt details when '$ Section' is encountered
function getLegBolts (towerData, panelsInSection, legConnectionElevations) {
    let legBoltsInPanel = []
    let legBoltDiaInPanel = []
    let legBoltGradeinPanel = []
    let legBoltConnectionTypeInPanel = []
    let legBoltsInSection = []
    let legBoltDiaInSection = []
    let legBoltGradeinSection = []
    let legBoltConnectionTypeInSection = []
    let legBoltNumberOfGauges = []
    let asmLegConnections = []

    towerData.forEach(line => {
        if (line.includes('BOLT') && line.includes('LEG')) {
            const legIndex = line.indexOf('LEG');
            if (legIndex !== -2 && legIndex < line.length - 1) {
                const legBolts = parseInt(line[legIndex + 1]);
                if (!isNaN(legBolts)) {
                    legBoltsInPanel.unshift(legBolts);
                    // if LEG 0 only
                    if (legBolts === 0) {
                        const legBoltDia = getBoltDia('M16-8')
                        legBoltDiaInPanel.unshift(legBoltDia)

                        const legBoltGrade = getBoltGrade('M16-8')
                        legBoltGradeinPanel.unshift(legBoltGrade)

                        const legBoltConnectionType = getBoltConnectionType('M16-8')
                        legBoltConnectionTypeInPanel.unshift(legBoltConnectionType)
                    } else {
                        const legBoltDia = getBoltDia(line[legIndex + 2])
                        legBoltDiaInPanel.unshift(legBoltDia)

                        const legBoltGrade = getBoltGrade(line[legIndex +2])
                        legBoltGradeinPanel.unshift(legBoltGrade)

                        const legBoltConnectionType = getBoltConnectionType(line[legIndex + 2])
                        legBoltConnectionTypeInPanel.unshift(legBoltConnectionType)
                    }

                    
                }
            }
        }
    });

    let currentPanelNumber = 0;

    panelsInSection.forEach((section, index) => {
        legBoltsInSection.push(legBoltsInPanel[currentPanelNumber])
        legBoltDiaInSection.push(legBoltDiaInPanel[currentPanelNumber])
        legBoltGradeinSection.push(legBoltGradeinPanel[currentPanelNumber])
        legBoltConnectionTypeInSection.push(legBoltConnectionTypeInPanel[currentPanelNumber])
        if (legBoltsInPanel[currentPanelNumber] >= 8) {
            legBoltNumberOfGauges.push(4)
        } else legBoltNumberOfGauges.push(2)

        currentPanelNumber += section
    });

    // console.log('Leg bolts in each section: ', legBoltsInSection);
    // console.log(legBoltDiaInSection);
    // console.log('Leg bolt grade in each section: ', legBoltGradeinSection);
    // console.log('Leg bolt type in each section: ', legBoltConnectionTypeInSection);
    // console.log('leg bolt number of gauges in sections: ', legBoltNumberOfGauges);

    legConnectionElevations.forEach((elevation, i) => {
        const currentLine = `${elevation}\t${legBoltConnectionTypeInSection[i]}\t${legBoltsInSection[i]}\t${legBoltDiaInSection[i]}\t\t\t${legBoltGradeinSection[i]}\tYES\t${legBoltNumberOfGauges[i]}\t0\tNO\t0\t\t\tSINGLE THICK.`
        asmLegConnections.push(currentLine);
    });

    asmLegConnections = asmLegConnections.join('\n')
    // console.log(asmLegConnections);
    return asmLegConnections;
}

export function createLegConnections (towerData, panelElevations, panelsInSection) {
    // only for generic connections - Single shear, double shear and tension
    const legConnectionElevations = getLegConnectionElevations(panelElevations, panelsInSection)
    console.log('panel elevations ', panelElevations);
    const asmLegConnections = getLegBolts(towerData, panelsInSection, legConnectionElevations)
    return asmLegConnections;
}