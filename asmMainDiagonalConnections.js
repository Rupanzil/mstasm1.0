import { panelFacesDB } from "./panelFaceDB.js";


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

                        const boltDia = getMainDiagonalBoltDia(line[wordNumber + 2])
                        mainDiagonalBoltDia.unshift(boltDia)

                        const boltGrade = getMainDiagonalBoltGrade(line[wordNumber + 2])
                        mainDiagonalBoltGrade.unshift(boltGrade)

                        const boltConnectionType = getMainDiagonalBoltConnectionType(line[wordNumber + 2])
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

function getMainDiagonalBoltDia(boltData) {
    // console.log('panel data: ', boltData);
    const mainDiagonalBoltDataAndGrade = boltData.split('-')
    const boltDia = parseInt(mainDiagonalBoltDataAndGrade[0].match(/\d+/))
    return boltDia
}

function getMainDiagonalBoltGrade(boltData) {
    // console.log('panel data: ', boltData);
    const mainDiagonalBoltDataAndGrade = boltData.split('-')
    let boltGrade;
    if (mainDiagonalBoltDataAndGrade[1].length == 1) {
        boltGrade = mainDiagonalBoltDataAndGrade[1]
    } else {
        const lastCharacter = mainDiagonalBoltDataAndGrade[1].charAt(mainDiagonalBoltDataAndGrade[1].length -1)
        // console.log(lastCharacter);
        if (lastCharacter == 0) {
            boltGrade = mainDiagonalBoltDataAndGrade[1]
        } else {
            boltGrade = mainDiagonalBoltDataAndGrade[1].slice(0,-1)
        }
    }

    //Check for the grade and returns ASM grade value
    if (boltGrade == '4') {
        return 'Class 4.8'
    } else if (boltGrade == '5') {
        return 'Grade 5.6/5.8'
    } else if (boltGrade == '6') {
        return 'Class 6.8'
    } else if (boltGrade == '8') {
        return 'Grade 8.8'
    } if (boltGrade == '10') {
        return 'Class 10.9'
    } else return 'Grade not in ASM DataBase'
}

function getMainDiagonalBoltConnectionType(BoltData) {
    const BoltDataAndGrade = BoltData.split('-')
    let boltConnectionType;
    if (BoltDataAndGrade[1].length == 1) {
        boltConnectionType = 'S.SHEAR'
    } else {
        const lastCharacter = BoltDataAndGrade[1].charAt(BoltDataAndGrade[1].length - 1)
        if (lastCharacter == 2) {
            boltConnectionType = 'D.SHEAR'
        } else if (lastCharacter == 0) {              // if grade 10
            boltConnectionType = 'S.SHEAR'
        } else if (lastCharacter == 'T') {
            boltConnectionType = 'TENSION'
        } else boltConnectionType = 'Error in Connection Type'
    }
    return boltConnectionType
}

export { panelBaseElevations }
