// Leg connections are of two types : generic connection which are either single splice or double splice and flange connections for tubular connections
// Angled sections have connections with single or double shear - EA , STA , STASE, STASX, ASXC, ASX

import { panelFacesDB } from "./panelFaceDB.js"

function getLegConnectionElevations(panelElevations, panelsInSection) {
    let sectionElevations = [0.5]     // This will be base elevation if any
    let currentPanelNumber = 0

    panelsInSection.forEach((section, index) => {
        currentPanelNumber += section
        if (index != panelsInSection.length -1) {
            sectionElevations.push(panelElevations[currentPanelNumber-1] + 0.5)
        }
    });

    // console.log('Section elevations: ',sectionElevations);
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

                    const legBoltDia = getLegBoltDia(line[legIndex + 2])
                    legBoltDiaInPanel.unshift(legBoltDia)

                    const legBoltGrade = getLegBoltGrade(line[legIndex +2])
                    legBoltGradeinPanel.unshift(legBoltGrade)

                    const legBoltConnectionType = getlLegBoltConnectionType(line[legIndex + 2])
                    legBoltConnectionTypeInPanel.unshift(legBoltConnectionType)
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

function getLegBoltDia(legBoltData) {
    const legBoltDataAndGrade = legBoltData.split('-')
    const boltDia = parseInt(legBoltDataAndGrade[0].match(/\d+/))
    return boltDia
}

function getLegBoltGrade(legBoltData) {
    const legBoltDataAndGrade = legBoltData.split('-')
    let legBoltGrade;
    if (legBoltDataAndGrade[1].length == 1) {
        legBoltGrade = legBoltDataAndGrade[1]
    } else {
        const lastCharacter = legBoltDataAndGrade[1].charAt(legBoltDataAndGrade[1].length -1)
        // console.log(lastCharacter);
        if (lastCharacter == 0) {
            legBoltGrade = legBoltDataAndGrade[1]
        } else {
            legBoltGrade = legBoltDataAndGrade[1].slice(0,-1)
        }
    }

    //Check for the grade and returns ASM grade value
    if (legBoltGrade == '4') {
        return 'Class 4.8'
    } else if (legBoltGrade == '5') {
        return 'Grade 5.6/5.8'
    } else if (legBoltGrade == '6') {
        return 'Class 6.8'
    } else if (legBoltGrade == '8') {
        return 'Grade 8.8'
    } if (legBoltGrade == '10') {
        return 'Class 10.9'
    } else return 'Grade not in ASM DataBase'
}

function getlLegBoltConnectionType(legBoltData) {
    const legBoltDataAndGrade = legBoltData.split('-')
    let legBoltConnectionType;
    if (legBoltDataAndGrade[1].length == 1) {
        legBoltConnectionType = 'S.SHEAR'
    } else {
        const lastCharacter = legBoltDataAndGrade[1].charAt(legBoltDataAndGrade[1].length - 1)
        if (lastCharacter == 2) {
            legBoltConnectionType = 'D.SHEAR'
        } else if (lastCharacter == 0) {              // if grade 10
            legBoltConnectionType = 'S.SHEAR'
        } else if (lastCharacter == 'T') {
            legBoltConnectionType = 'TENSION'
        } else legBoltConnectionType = 'Error in Connection Type'
    }
    return legBoltConnectionType
}



export function createLegConnections (towerData, panelElevations, panelsInSection) {
    // only for generic connections - Single shear, double shear and tension
    const legConnectionElevations = getLegConnectionElevations(panelElevations, panelsInSection)
    const asmLegConnections = getLegBolts(towerData, panelsInSection, legConnectionElevations)
    return asmLegConnections;
}