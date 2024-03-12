/*
In case of secondary diagonals, all the members will be denoted by Redundants, and generally speaking there is no conflict between the main diagonal
and the secondary diagonal whatsoever.

logic breakdown:
1. separate the panels having secondary diagonals and not having secondary diagonals
2. for panels not having secondary digonals, 0 bolts with M16-8 will be written
3. for panels having secondary diagonals, check whether redundants are same or different. In case they are different then take the smallest among
    and use that as the secondary diagonal bolt for that panel.

*/

import { panelsNotHavingSecondaryDiagonals, panelHavingSecondayDiagonals } from "./asmPanelSections.js";
import { getBoltDia, getBoltGrade, getBoltConnectionType } from "./boltDataProcessing.js";
import { panelFacesDB } from "./panelFaceDB.js";


let secondaryDiagonalBoltNumber = []
let secondaryDiagonalBoltGrade = []
let secondaryDiagonalBoltDia = []
let secondaryDiagonalBolConnectionType = []
let asmSecondaryDiagonalBolts = []

export function createSecondaryDiagonalConnections(towerData, panelBaseElevations, panelElevations) {

    towerData.forEach((line, lineNumber) => {
        if (line.includes('FACE')) {
            const currentPanelFace = line[1]
            // console.log(currentPanelFace);
            if (panelsNotHavingSecondaryDiagonals.includes(currentPanelFace)) {
                const numberOfBolts = 0
                secondaryDiagonalBoltNumber.unshift(numberOfBolts)

                const boltData = 'M12-8'        // A default value taken for assigning 0 bolts

                const boltDia = getBoltDia(boltData)
                secondaryDiagonalBoltDia.unshift(boltDia)
                
                const boltGrade = getBoltGrade(boltData)
                secondaryDiagonalBoltGrade.unshift(boltGrade)
                
                const boltConnectionType =  getBoltConnectionType(boltData)
                secondaryDiagonalBolConnectionType.unshift(boltConnectionType)

            } else if (panelHavingSecondayDiagonals.includes(currentPanelFace)) {
                // update these as new panel faces are added.
                const panelsHavingSameSecondaryDiagonals = ['XH3', 'K1', 'K2', 'M1', 'M2']
                const panelsHavingDifferentSecondaryDiagonals = ['XH3A', 'K2A']

                if (panelsHavingSameSecondaryDiagonals.includes(currentPanelFace)) {
                    getBoltDataSameDiagonals(lineNumber, towerData)
                } else if (panelsHavingDifferentSecondaryDiagonals.includes(currentPanelFace)) {     
                    getBoltDataDiffDiagonals(lineNumber, towerData, currentPanelFace)
                }
            } 
        }
    })

    // console.log('Number of bolts: ', secondaryDiagonalBoltNumber);
    // console.log('Grade of bolts: ', secondaryDiagonalBoltGrade);
    // console.log('Dia of bolts: ', secondaryDiagonalBoltDia);
    // console.log('Connection type of bolts: ', secondaryDiagonalBolConnectionType);

    panelBaseElevations.forEach((baseElevation, i) => {
        const currentLine = `${baseElevation}\t${panelElevations[i]}\t${secondaryDiagonalBolConnectionType[i]}\t${secondaryDiagonalBoltNumber[i]}\t${secondaryDiagonalBoltDia[i]}\t\t\t${secondaryDiagonalBoltGrade[i]}\tYES\t1\t0\tNO\t0\t\t\tSINGLE THICK.\tSINGLE THICK.`
        asmSecondaryDiagonalBolts.push(currentLine);
    });

    asmSecondaryDiagonalBolts = asmSecondaryDiagonalBolts.join('\n')
    // console.log('ASM Secondary Diagonal bolts : \n', asmSecondaryDiagonalBolts);

    return asmSecondaryDiagonalBolts;

}

function getBoltDataSameDiagonals (lineNumber, towerData) {

    for (let i = lineNumber; i < lineNumber + 5; i++) {
        if (towerData[i].join(' ').match(/\bBOLT\b.*\bR1?\b/)) {

            towerData[i].forEach((word, wordNumber) => {
                if (word.match(/\bR1?\b/)) {
                    const boltNumber = parseInt(towerData[i][wordNumber + 1])
                    if (!isNaN(boltNumber)) {
                        const boltData = towerData[i][wordNumber + 2]
                        
                        secondaryDiagonalBoltNumber.unshift(boltNumber)
    
                        const boltDia = getBoltDia(boltData)
                        secondaryDiagonalBoltDia.unshift(boltDia)
                        
                        const boltGrade = getBoltGrade(boltData)
                        secondaryDiagonalBoltGrade.unshift(boltGrade)
                        
                        const boltConnectionType =  getBoltConnectionType(boltData)
                        secondaryDiagonalBolConnectionType.unshift(boltConnectionType)
                    }
                }
                return;
            });
        }
        if (towerData[i].join(' ').match(/\bPANEL\b.*\bHT\b/)) {
            return;
        } 
    }

}

function getBoltDataDiffDiagonals (lineNumber, towerData, currentPanelFace) {

    for ( let i = lineNumber; i < lineNumber + 5; i++ ) {

        // first match condition: BOLT & R exactly
        // for ex: FACE is XH3A but bolts assigned as R
        if (towerData[i].join(' ').match(/\bBOLT\b.*\bR\b/)) {     

            towerData[i].forEach((word, wordNumber) => {
                if (word.match(/\bR\b/)) {
                    const boltNumber = parseInt(towerData[i][wordNumber + 1])
                    if (!isNaN(boltNumber)) {
                        const boltData = towerData[i][wordNumber + 2]
                        
                        secondaryDiagonalBoltNumber.unshift(boltNumber)
    
                        const boltDia = getBoltDia(boltData)
                        secondaryDiagonalBoltDia.unshift(boltDia)
                        
                        const boltGrade = getBoltGrade(boltData)
                        secondaryDiagonalBoltGrade.unshift(boltGrade)
                        
                        const boltConnectionType =  getBoltConnectionType(boltData)
                        secondaryDiagonalBolConnectionType.unshift(boltConnectionType)
                    }
                }
                return;
            });

        // second match condtion: BOLT & R1 match exactly
        // for example: face is XH3A with BOLTS R1 1 M12-8 R2 1 M16-8 R3 1 M16-8 R4 1 M12-8
        // in this case, the bolt details of the bottom most secondary diagonal will be applied to all.
        // this is because having different bolt details in case of secondary diagonals for the panel faces 
        // that are considered in this app, it is highly unlikely that there will be different secondary diagonal bolts
        } else if (towerData[i].join(' ').match(/\bBOLT\b.*\bR1\b/)) {
            const secDiagonalId = panelFacesDB[currentPanelFace]['secondaryDiagonals'][0]      

            towerData[i].forEach((word, wordNumber) => {
                if ( word == secDiagonalId ) {
                    const boltNumber = parseInt(towerData[i][wordNumber + 1])
                    if (!isNaN(boltNumber)) {
                        const boltData = towerData[i][wordNumber + 2]
                        
                        secondaryDiagonalBoltNumber.unshift(boltNumber)
    
                        const boltDia = getBoltDia(boltData)
                        secondaryDiagonalBoltDia.unshift(boltDia)
                        
                        const boltGrade = getBoltGrade(boltData)
                        secondaryDiagonalBoltGrade.unshift(boltGrade)
                        
                        const boltConnectionType =  getBoltConnectionType(boltData)
                        secondaryDiagonalBolConnectionType.unshift(boltConnectionType)
                    }
                    return;
                }
            });

        }
        if (towerData[i].join(' ').match(/\bPANEL\b.*\bHT\b/)) {
            return;
        } 
    }
}