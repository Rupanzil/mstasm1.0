import { panelFacesDB } from "./panelFaceDB.js";
import { getBoltDia, getBoltConnectionType, getBoltGrade } from "./boltDataProcessing.js";


let panelBaseElevations = [0]

export function createMainBracingConnections(towerData, panelElevations) {
    const mainDiagonalBaseElevation = getBaseElevations(panelElevations)
    const mainDiagonalTopElevation = panelElevations;
    // console.log('Panel top elevations: ', mainDiagonalTopElevation);
    const asmMainDiagonalConnections = getMainDiagonalBolts(towerData, mainDiagonalBaseElevation, mainDiagonalTopElevation)
    // console.log('ASM main diagonal connections: ', asmMainDiagonalConnections);
    return asmMainDiagonalConnections;
}

function getBaseElevations(panelElevations) {

    panelElevations.forEach((panel, panelNumber) => {
        if (panelNumber < panelElevations.length - 1) {
            panelBaseElevations.push(panel)
        }
    });

    // console.log('Panel base elevations are: ', panelBaseElevations);
    return panelBaseElevations;
}

function getMainDiagonalBolts(towerData, mainDiagonalBaseElevation, mainDiagonalTopElevation) {
    let mainDiagonalBolts = []
    let mainDiagonalBoltDia = []
    let mainDiagonalBoltGrade = []
    let mainDiagonalBoltConnectionType = []
    let mainDiagonalBoltNumberOfGauges = []
    let asmMainDiagonalConnections = []
    
    towerData.forEach(line => {
        if (line.join(' ').match(/BOLT.*\bBR1?\b/)) {
            line.forEach((word, wordNumber) => {
                if(word.match(/\bBR1?\b/)) {
                    const mainBracingBolts = parseInt(line[wordNumber + 1])
                    if (!isNaN(mainBracingBolts)) {
                        mainDiagonalBolts.unshift(mainBracingBolts)

                        const boltDia = getBoltDia(line[wordNumber + 2])
                        mainDiagonalBoltDia.unshift(boltDia)

                        const boltGrade = getBoltGrade(line[wordNumber + 2])
                        mainDiagonalBoltGrade.unshift(boltGrade)

                        const boltConnectionType = getBoltConnectionType(line[wordNumber + 2])
                        mainDiagonalBoltConnectionType.unshift(boltConnectionType)
                    }
                }
            });
        }
    });

    // console.log('Main Diagonal bolts: ', mainDiagonalBolts);
    // console.log('Main Diagonal bolts dia: ', mainDiagonalBoltDia);
    // console.log('Main Diagonal bolts grade: ', mainDiagonalBoltGrade);
    // console.log('Main Diagonal bolts connection type: ', mainDiagonalBoltConnectionType);

    mainDiagonalBaseElevation.forEach((baseElevation, i) => {
        const currentLine = `${baseElevation}\t${mainDiagonalTopElevation[i]}\t${mainDiagonalBoltConnectionType[i]}\t${mainDiagonalBolts[i]}\t${mainDiagonalBoltDia[i]}\t\t\t${mainDiagonalBoltGrade[i]}\tYES\t1\t0\tNO\t0\t\t\tSINGLE THICK.\tSINGLE THICK.`
        asmMainDiagonalConnections.push(currentLine);
    });

    asmMainDiagonalConnections = asmMainDiagonalConnections.join('\n')
    return asmMainDiagonalConnections;
}

export { panelBaseElevations }
