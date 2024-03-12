/*
For secondary horizontals, the logic becomes a little bit complicated for cases where 
H1 acts as the secondary horizontal. happens only in XH3 and XH3A faces
for these two faces the H bolts will be considered.

*/

import { panelsHavingSecondaryHorizontals, panelsNotHavingSecondaryHorizontals, panelFacesDB } from "./panelFaceDB.js";
import { getBoltDia, getBoltGrade, getBoltConnectionType } from "./boltDataProcessing.js";


let secondaryHorizontalBoltNumber = []
let secondaryHorizontalBoltGrade = []
let secondaryHorizontalBoltDia = []
let secondaryHorizontalBolConnectionType = []
let asmSecondaryHorizontalBolts = []
const secondaryHorizontalIsH1 = ['XH1','XH3', 'XH3A']

export function createSecondaryHorizontalConnections(towerData, panelBaseElevations, panelElevations) {

    towerData.forEach((line, lineNumber) => {
        if (line.includes('FACE')) {
            const currentPanelFace = line[1];
            if (panelsHavingSecondaryHorizontals.includes(currentPanelFace)) {
                // XH3 and XH3A are processed separately
                if (secondaryHorizontalIsH1.includes(currentPanelFace)) {
                    processBoltsForH1(towerData, lineNumber)
                } else {
                    processBoltsForR1(towerData, lineNumber, currentPanelFace)
                }
            } else if (panelsNotHavingSecondaryHorizontals.includes(currentPanelFace)) {
                processBoltsForNoSecondaryHorizontals();
            }
        }
    });
    // console.log(panelsHavingSecondaryHorizontals, panelsNotHavingSecondaryHorizontals);
    
    // console.log('Number of bolts: ', secondaryHorizontalBoltNumber);
    // console.log('Grade of bolts: ', secondaryHorizontalBoltGrade);
    // console.log('dia of bolts: ', secondaryHorizontalBoltDia);
    // console.log('connection type of bolts: ', secondaryHorizontalBolConnectionType);

    panelBaseElevations.forEach((baseElevation, i) => {
        const currentLine = `${baseElevation}\t${panelElevations[i]}\t${secondaryHorizontalBolConnectionType[i]}\t${secondaryHorizontalBoltNumber[i]}\t${secondaryHorizontalBoltDia[i]}\t\t\t${secondaryHorizontalBoltGrade[i]}\tYES\t1\t0\tNO\t0\t\t\tSINGLE THICK.\tSINGLE THICK.`
        asmSecondaryHorizontalBolts.push(currentLine);
    });

    asmSecondaryHorizontalBolts = asmSecondaryHorizontalBolts.join('\n')
    // console.log('ASM Secondary Horizontal bolts : \n', asmSecondaryHorizontalBolts);

    return asmSecondaryHorizontalBolts;
}

function processBoltsForH1(towerData, lineNumber) {

    for ( let i = lineNumber; i < lineNumber + 5; i++) {
        if (towerData[i].join(' ').match(/\bBOLT\b.*\bH1?\b/)) {

            towerData[i].forEach((word, wordNumber) => {
                if (word.match(/\bH1?\b/)) {
                    const boltNumber = parseInt(towerData[i][wordNumber + 1])
                    if (!isNaN(boltNumber)) {
                        secondaryHorizontalBoltNumber.unshift(boltNumber)
        
                        const boltData = towerData[i][wordNumber + 2]
        
                        const boltDia = getBoltDia(boltData)
                        secondaryHorizontalBoltDia.unshift(boltDia)
                        
                        const boltGrade = getBoltGrade(boltData)
                        secondaryHorizontalBoltGrade.unshift(boltGrade)
                        
                        const boltConnectionType =  getBoltConnectionType(boltData)
                        secondaryHorizontalBolConnectionType.unshift(boltConnectionType)
                    }
                    return;
                }
            });
            return;

        } else if (towerData[i].join(' ').match(/\bBOLT\b.*\bLEG\b/)) {
            processBoltsForNoSecondaryHorizontals();
        }
        if (towerData[i].join(' ').match(/\bPANEL\b.*\bHT\b/)) {
            return;
        }
    }

}

function processBoltsForR1(towerData, lineNumber, currentPanelFace) {

    for ( let i = lineNumber; i < lineNumber + 5; i++) {
        if (towerData[i].join(' ').match(/\bBOLT\b.*\bR1\b/)) {
            const secHorizontalIdRegex = panelFacesDB[currentPanelFace]['secondaryHorizontal'][0]      

            towerData[i].forEach((word, wordNumber) => {
                if (word.match(secHorizontalIdRegex) ) {
                    const boltNumber = parseInt(towerData[i][wordNumber + 1])
                    if (!isNaN(boltNumber)) {
                        const boltData = towerData[i][wordNumber + 2]
                        
                        secondaryHorizontalBoltNumber.unshift(boltNumber)
    
                        const boltDia = getBoltDia(boltData)
                        secondaryHorizontalBoltDia.unshift(boltDia)
                        
                        const boltGrade = getBoltGrade(boltData)
                        secondaryHorizontalBoltGrade.unshift(boltGrade)
                        
                        const boltConnectionType =  getBoltConnectionType(boltData)
                        secondaryHorizontalBolConnectionType.unshift(boltConnectionType)
                    }
                    return;
                }
            });

        } else if (towerData[i].join(' ').match(/\bBOLT\b.*\bLEG\b/)) {
            processBoltsForNoSecondaryHorizontals();
        }
        if (towerData[i].join(' ').match(/\bPANEL\b.*\bHT\b/)) {
            return;
        }
    }

}

function processBoltsForNoSecondaryHorizontals() {
    const numberOfBolts = 0
    secondaryHorizontalBoltNumber.unshift(numberOfBolts)
    
    const boltData = 'M12-8'        // A default value taken for assigning 0 bolts
    
    const boltDia = getBoltDia(boltData)
    secondaryHorizontalBoltDia.unshift(boltDia)
    
    const boltGrade = getBoltGrade(boltData)
    secondaryHorizontalBoltGrade.unshift(boltGrade)
    
    const boltConnectionType =  getBoltConnectionType(boltData)
    secondaryHorizontalBolConnectionType.unshift(boltConnectionType)
}