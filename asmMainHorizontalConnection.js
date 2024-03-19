import { panelFacesHavingMainHorizontals, panelFacesNotHavingMainHorizontals } from "./asmPanelSections.js";
import { panelBaseElevations } from "./asmMainDiagonalConnections.js";
import { getBoltGrade, getBoltDia, getBoltConnectionType } from "./boltDataProcessing.js";
import { actualPanelFaces } from "./asmPanelGeometry.js";
import { totalNumberofPanels } from "./tdprocessor.js";



export function createMainHorizontalConnections(towerData, panelElevations) {
    // console.log('Faces having main horizonatals', panelFacesHavingMainHorizontals);
    // console.log('Faces having not main horizonatals', panelFacesNotHavingMainHorizontals);
    // console.log('Panel base elevations are: ', panelBaseElevations);
    const HorizontalBolts = getMainHorizontalBolts(towerData, panelElevations)
    return HorizontalBolts
}

/*
For main horizontals, except X faced panels, the H1 bolts will be main horizontal bolts and PB bolts in case of DL0 or DR0 panels.
For DL-DR main horizontals = H1 or H
for DL0-DR0 main horizontals = PB or PB1 if plan exists at TOP or BTM, that is the position should not be XIP

These are the panels having a direct main horizontal
for K faces, main horizontal connections are either H1 or H
for M faces, main horizontal connections are either H1 or H

for X faces, main horizontal connections are 
    H1 or H for X, XTN
    PB1 or PB if X0, XH1, XH3, XH3A, XTR if plan exists at TOP or BTM, that is the position should not be XIP  

if 0 bolt is put in horizontal connection, it will not consider it, even if base and top elevation are given at that level.
*/

let asmMainHorizontalBolts = []
function getMainHorizontalBolts(towerData, panelElevations) {
    
    // write new logic which takes into account all the edge cases.
    // 1. recognise the panel face
    // 2. depending upon the panel face, take action
    let panelNumberFromBottom = totalNumberofPanels;
    towerData.forEach((line, lineNumber) => {
        if(line.includes('FACE')) {
            const currentPanelFace = actualPanelFaces[panelNumberFromBottom - 1]
            if (panelFacesHavingMainHorizontals.includes(currentPanelFace)) {                  // include the cases where faces have main horizontals
                processMainHorizontalBoltsDirect(currentPanelFace, lineNumber, towerData) 
            } else if (panelFacesNotHavingMainHorizontals.includes(currentPanelFace)) {        // include the cases where faces are of X type (X0, XH1, XH3 etc) and D0 types
                processIndirectMainHorizontalBolts(currentPanelFace, lineNumber, towerData)
            }       
            panelNumberFromBottom--;
        }
    });

    console.log('Bolt Grade: ', mainHorizontalBoltGrade);
    console.log('Bolt Bolt Number: ', mainHorizontalBoltNumber);
    console.log('Bolt Dia: ', mainHorizontalBoltDia);
    console.log('Bolt Connection Type: ', mainHorizontalBoltConnectionType);

    panelBaseElevations.forEach((baseElevation, i) => {
        const currentLine = `${baseElevation}\t${panelElevations[i]}\t${mainHorizontalBoltConnectionType[i]}\t${mainHorizontalBoltNumber[i]}\t${mainHorizontalBoltDia[i]}\t\t\t${mainHorizontalBoltGrade[i]}\tYES\t1\t0\tNO\t0\t\t\tSINGLE THICK.\tSINGLE THICK.`
        asmMainHorizontalBolts.push(currentLine);
    });

    asmMainHorizontalBolts = asmMainHorizontalBolts.join('\n')
    // console.log(asmMainHorizontalBolts);

    return asmMainHorizontalBolts;
}

let mainHorizontalBoltNumber = [];
let mainHorizontalBoltDia = [];
let mainHorizontalBoltGrade = []
let mainHorizontalBoltConnectionType = [];

function processMainHorizontalBoltsDirect(panelFace, lineNumber, towerData) {
    
    // searching for the bolt data
    for (let i = lineNumber; i < lineNumber + 5; i++) {             // keeping the search range short as bolt should occur here
        if (towerData[i].join(' ').match(/BOLT.*\bH1?\b/)) {

            towerData[i].forEach((word, wordNumber) => {
                if(word.match(/\bH1?\b/)) {
                    const numberOfBolts = parseInt(towerData[i][wordNumber + 1])
                    if (!isNaN(numberOfBolts)) {
                        mainHorizontalBoltNumber.unshift(numberOfBolts)
                        if (numberOfBolts != 0) {
                            const boltData = towerData[i][wordNumber + 2]
                            console.log('This line has direct horizontal bolts: ',towerData[i - 1].join(' '), ':For panel face: ', panelFace);
                            
                            const boltDia = getBoltDia(boltData)
                            mainHorizontalBoltDia.unshift(boltDia)
                            
                            const boltGrade = getBoltGrade(boltData)
                            mainHorizontalBoltGrade.unshift(boltGrade)
                            
                            const boltConnectionType = getBoltConnectionType(boltData)
                            mainHorizontalBoltConnectionType.unshift(boltConnectionType)
                        } else {
                            // if written only H1 0
                            const boltData = 'M16-8'
                            console.log('This line has 0 horizontal bolts: ',towerData[i - 1].join(' '), ':For panel face: ', panelFace);

                            const boltDia = getBoltDia(boltData)
                            mainHorizontalBoltDia.unshift(boltDia)
    
                            const boltGrade = getBoltGrade(boltData)
                            mainHorizontalBoltGrade.unshift(boltGrade)
                            
                            const boltConnectionType = getBoltConnectionType(boltData)
                            mainHorizontalBoltConnectionType.unshift(boltConnectionType)
                        }
                    }
                }
            });

            return;    // breaks out of the loop once it is matched for that panel
        } else if (towerData[i].join(' ').match(/\bBOLT\b.*\bLEG\b/)) {      // Add an else condition that will add 0 bolts if H1 or H boltdata is not given at all due to mistake in TD.
            console.log('this is for 0 bolts on :', panelFace,'on line :',towerData[i-1].join(' '));
            mainHorizontalBoltNumber.unshift(0)

            const boltData = 'M16-8'

            const boltDia = getBoltDia(boltData)
            mainHorizontalBoltDia.unshift(boltDia)

            const boltGrade = getBoltGrade(boltData)
            mainHorizontalBoltGrade.unshift(boltGrade)
            
            const boltConnectionType = getBoltConnectionType(boltData)
            mainHorizontalBoltConnectionType.unshift(boltConnectionType)
        } else if (towerData[i].join(' ').match(/\bPANEL\b/)) {
            return    // returns when next panel is reached
        }

    }
}

function processIndirectMainHorizontalBolts(currentPanelFace, lineNumber, towerData) {

    // check if plan bracing exists on top level
    // searching for plan bracings in the next lines
    for (let i = lineNumber; i < lineNumber + 5; i++) {

        // match lines that contain 'PLAN', may or may not contain 'TOP', and will return false if 'XIP' or 'BTM' is present in the line
        if (towerData[i].join(' ').match(/\bPLAN\b(?:(?!.*\b(XIP|BTM)\b).)*(?=.*\bTOP\b)?/)) {
            console.log('Line currently matched is ', towerData[i].join(' '), 'Panel Face: ', currentPanelFace);

            for (let k = i; k < i + 2; k++) {
                if (towerData[k].join(' ').match(/\bBOLT.*\bPB1?\b/)) {
                    // console.log('Bolt data for main horizontal from plan bracings: ', towerData[k].join(' '));

                    for ( let j = 0; j < towerData[k].length; j++ ) {
                        if ( towerData[k][j].match(/\bPB1?\b/)) {
                            let wordNumber = j;
                            const numberOfBolts = parseInt(towerData[k][wordNumber + 1])
                            if (!isNaN(numberOfBolts)) {
                                mainHorizontalBoltNumber.unshift(numberOfBolts)
        
                                const boltData = towerData[k][wordNumber + 2]
        
                                const boltDia = getBoltDia(boltData)
                                mainHorizontalBoltDia.unshift(boltDia)
        
                                const boltGrade = getBoltGrade(boltData)
                                mainHorizontalBoltGrade.unshift(boltGrade)
                                
                                const boltConnectionType = getBoltConnectionType(boltData)
                                mainHorizontalBoltConnectionType.unshift(boltConnectionType)

                                return
                            }
                        }
                    }
                    return;
                }
                
            }

        } else if (towerData[i].join(' ').match(/\bBOLT\b.*\bLEG\b/)) {
            console.log('this is for 0 bolts on :', currentPanelFace,'on line :',towerData[i-1].join(' '));
            mainHorizontalBoltNumber.unshift(0)

            const boltData = 'M16-8'

            const boltDia = getBoltDia(boltData)
            mainHorizontalBoltDia.unshift(boltDia)

            const boltGrade = getBoltGrade(boltData)
            mainHorizontalBoltGrade.unshift(boltGrade)
            
            const boltConnectionType = getBoltConnectionType(boltData)
            mainHorizontalBoltConnectionType.unshift(boltConnectionType)
            
            return
        } else if (towerData[i].join(' ').match(/\bPANEL\b/)) {
            return    // returns when next panel is reached
        }
    }
}