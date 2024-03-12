import { panelFacesDB } from "./panelFaceDB.js";
import { uniqueSectionAndGrade } from "./asmSelectedSection.js";
import { getSecDiagonalsForSameSecDiagonals, getSecDiagonalsForDifferentSecDiagonals } from "./asmSecondaryDiagonals.js";
import { getSecondaryHorizontals } from "./asmSecondaryHorizontal.js";
import { processIdsAndGrade } from "./processMemberIdsAndGrade.js";


let legMSTIds = [];
let legIdAndSections = []
let asmLegId = []

// Creates an array of numbers which will be filled in the asm data matching mst legs and asm legs
function createLegs(towerData) {
    let legId
    towerData.forEach(line => {
        if ( line.includes('FACE')) {
            line.forEach((word, wordNumber) => {
                if( word == 'LEG') {
                    legId = line[wordNumber + 1]
                    legMSTIds.unshift(legId)        // gets the mst leg ids
                }
            });
        }
    });
    
    // make an array containing all the leg Sections corresponding to the legId

    legMSTIds.forEach(legId => {
        towerData.forEach(line => {
            if (line.includes(legId) && line.includes('FY')) {
                line.forEach( (word, wordNumber) => {
                    if (word == legId) {
                        let legSection = `${line[wordNumber + 1]} ${line[wordNumber + 4]}`
                        legIdAndSections.push(legSection)
                    }
                });
            }
        });  
    });

    legIdAndSections = processIdsAndGrade(legIdAndSections)

    console.log('leg ids and sections',legIdAndSections);
    console.log('unique sections for ASM panel sections: ', uniqueSectionAndGrade);

    console.log(typeof uniqueSectionAndGrade[1]);

    uniqueSectionAndGrade.forEach(element => {
        console.log('test', element);
    });

    legIdAndSections.forEach(element => {
        uniqueSectionAndGrade.forEach((item, index) => {
            // console.log('here item is ', element, 'and asm to be matched is', item);
            if (item.includes(element)) {
             asmLegId.push(index + 1)
            }
        });
    });
    console.log('leg id:', asmLegId);
    return asmLegId;
}

let mainDiagonalIds = []
function createMainDiagonals(towerData) {
    // store the main bracing ids from mst
    towerData.forEach(line => {
        if (line.includes('FACE')) {
            line.forEach((word, wordNumber) => {
                if ( word == 'BR' || word == 'BR1') {
                    let mainDiagonalId = line[wordNumber + 1]
                    mainDiagonalIds.unshift(mainDiagonalId)
                }
            });
        }
    });

    
    // console.log(mainDiagonalIds);

    // match the mainDiagonalIds against the MST sections
    let mainDiagonalIdAndSections = []
    mainDiagonalIds.forEach(mainDiagonalId  => {
        towerData.forEach(line => {
            if (line.includes('CONNECT') && line.includes('FY')) {
                line.forEach( (word, wordNumber) => {
                    if (word == mainDiagonalId) {
                        let mainDiagonalSection = `${line[wordNumber + 1]} ${line[wordNumber + 6]}`
                        mainDiagonalIdAndSections.push(mainDiagonalSection)
                    }
                });
            }
        });  
    });

    mainDiagonalIdAndSections = processIdsAndGrade(mainDiagonalIdAndSections)
    console.log('main diagonal id and sections' , mainDiagonalIdAndSections);

    //match the mainDiagonalIdsAndSections against ASM sections
    let asmMainDiagonalId = []
    mainDiagonalIdAndSections.forEach(element => {
        uniqueSectionAndGrade.forEach((item, index) => {
            if (item.includes(element)) {
             asmMainDiagonalId.push(index + 1)
            }
        });
    });
    // console.log('Main diagonal id:', asmMainDiagonalId);
    return asmMainDiagonalId;
}

// Create main horizontals for asm
let panelFacesHavingMainHorizontals = []
let panelFacesNotHavingMainHorizontals = []
let mainHorizontalIdsAndPanelNumber = []
function createMainHorizontals(towerData, totalNumberofPanels) {
    // list of panel types of MST which have main horizontals from the panelFaceDB
    // go through each panelFace in panelFaceDB and check if it has mainHorizontal
    Object.keys(panelFacesDB).forEach( panelFace => {
        const panel = panelFacesDB[panelFace]
        if (panel.mainHorizontal != 0) {
            panelFacesHavingMainHorizontals.push(panelFace)
        } else panelFacesNotHavingMainHorizontals.push(panelFace)
    })
    // console.log('Panels which do not have main horizontals ', panelFacesNotHavingMainHorizontals);
    // main horizontals can be created either from H1 of the panels having main horizontals like X
    // or from the panels which don't have main horizontal but have PB1 plan bracings
    // create array of all H1 or H ids from MST
    // FACE XH1 LEG 111 BR1 211 H1 311
    let panelNumberFromBottom = totalNumberofPanels
    towerData.forEach( (line, lineNumber) => {
        let isPanelProcessed = false;
        if( line.includes('FACE') ) {               // 'FACE' is only included in the panel sections
            let currentPanelFace = line[1]
            // console.log('Current Panel Face: ',currentPanelFace, ', Current Panel Number from bottom : ', panelNumberFromBottom);

            // if the current panel face belongs to the family of panels which have a main horizontal then take the H1 or H ids
            // need to take the panel number as well to place it in proper position in asm
            // if the current panel face does not belong to the family of panels having main horizontals then check if the panel
            // has any plan bracings and if there is no plan bracings then put 0 in the asm section ids
            if (panelFacesHavingMainHorizontals.includes(currentPanelFace)) {
                // console.log('This is a regex', panelFacesDB[currentPanelFace].mainHorizontal, 'currentPanelFace', currentPanelFace)
                line.forEach( (word, wordNumber) => {
                    if ( word == 'H' || word == 'H1') {
                        let mainHorizontalId = line[wordNumber + 1]
                        mainHorizontalIdsAndPanelNumber.push([panelNumberFromBottom, mainHorizontalId])
                    }
                });
            } else if (panelFacesNotHavingMainHorizontals.includes(currentPanelFace) && towerData[lineNumber + 1].includes('PLAN') ) {  // does not account for cases where there is X0 and no plan bracings
                const currentLine = towerData[lineNumber + 1]
                currentLine.forEach((word, wordNumber) => {
                    // XIP plan is only present in X faces so the PB1 of these PLAN cannot be main horizontals
                    if (!currentLine.includes('XIP')) {
                        if (word == 'PB1' || word == 'PB') {
                            mainHorizontalIdsAndPanelNumber.push([panelNumberFromBottom, currentLine[wordNumber + 1]])
                        }
                    } else if (!isPanelProcessed) {
                        mainHorizontalIdsAndPanelNumber.push([panelNumberFromBottom, 0])
                        isPanelProcessed = true;
                    }
                });
            } else if (panelFacesNotHavingMainHorizontals.includes(currentPanelFace)) {
                mainHorizontalIdsAndPanelNumber.push([panelNumberFromBottom, 0])         // stores 0 as mainHorizontalIds for panels not having a main horizontal.
            }
            panelNumberFromBottom--;
        }
    })

    // match the mainHorizontalIdsAndPanelNumbers against the sections
    let mainHorizontalSectionAndGrade = []

    mainHorizontalIdsAndPanelNumber.forEach(mainHorizontal => {
        if (mainHorizontal[1] === 0) {
            mainHorizontalSectionAndGrade.unshift([mainHorizontal[0], mainHorizontal[1]])
        } else towerData.forEach(line => {
            if (line.includes(mainHorizontal[1]) && line.includes('CONNECT')) {      // checks the main hor id with section data
                // console.log('Horizontal section data: ', line);
                mainHorizontalSectionAndGrade.unshift([mainHorizontal[0], `${line[1]} ${line[6]}`])
            }
        });
    });

    console.log('main horizontal ids and sections', mainHorizontalSectionAndGrade);
    //match the mainDiagonalIdsAndSections against ASM sections
    let asmMainHorizontalIds = []

    mainHorizontalSectionAndGrade.forEach(element => {
        if (element[1] === 0) {
            asmMainHorizontalIds.push(0)
        } else {
            uniqueSectionAndGrade.forEach((item, index) => {
                if (item.includes(element[1])) {
                    asmMainHorizontalIds.push(index + 1)
                }
            });
        }
    });

    // console.log('ASM main horizontals id', asmMainHorizontalIds);
    return asmMainHorizontalIds;
}
let panelHavingSecondayDiagonals = []
let panelsNotHavingSecondaryDiagonals = []
let asmSecondaryDiagonalIds = []
let secondaryDiagonalIdsAndSections = []

function createSecondaryDiagonals(towerData, totalNumberofPanels) {

    // create an array of faces which don't have secondary diagonals
    Object.keys(panelFacesDB).forEach( panelFace => {
        if (panelFacesDB[panelFace].secondaryDiagonals == 0) {
            panelsNotHavingSecondaryDiagonals.push(panelFace)
        } else panelHavingSecondayDiagonals.push(panelFace)
    })

    // console.log('panels having secondary diagonals: ', panelHavingSecondayDiagonals);
    // console.log('Panels not having secondary diagonals: ', panelsNotHavingSecondaryDiagonals);
    
    
    // for secondary diagonals and secondary horizontals it is better to write separate logic for each panel face
    let panelNumberFromBottom = totalNumberofPanels
    
    towerData.forEach((line,lineNumber) => {
        if (line.includes('FACE')) {
            let currentPanelFace = line[1]
            // the first group of panels will include those faces which don't have secondary diagonals
            if (panelsNotHavingSecondaryDiagonals.includes(currentPanelFace)) {
                secondaryDiagonalIdsAndSections.unshift([panelNumberFromBottom, 0])
            }
            if (panelHavingSecondayDiagonals.includes(currentPanelFace)) {
                if (currentPanelFace == 'XH3' || currentPanelFace == 'K1' || currentPanelFace == 'K2') {
                    let currentPanelSecDiagId = [panelNumberFromBottom, getSecDiagonalsForSameSecDiagonals(line, panelFacesDB[currentPanelFace].secondaryDiagonals)]              // this should return array like [ panelNumber, secondaryDiagonalIds ]
                    secondaryDiagonalIdsAndSections.unshift(currentPanelSecDiagId)
                }
                if (currentPanelFace == 'XH3A' || currentPanelFace == 'K2A') {
                    let currentPanelSecDiagId = [panelNumberFromBottom, getSecDiagonalsForDifferentSecDiagonals(line, panelFacesDB[currentPanelFace].secondaryDiagonals)]              // this should return array like [ panelNumber, secondaryDiagonalIds ]
                    secondaryDiagonalIdsAndSections.unshift(currentPanelSecDiagId)
                }
            }
            panelNumberFromBottom--;
        }
    });
   
    let secondaryDiagonalSectionAndGrade = []
    // console.log('secondary Diag Ids and sections',secondaryDiagonalIdsAndSections);
    // match the secondary diagonal ids with the mst sections
    secondaryDiagonalIdsAndSections.forEach((secDiagonal, index) => {
        if ( secDiagonal[1] === 0) {
            secondaryDiagonalSectionAndGrade.push([0])
        } else {
            let currentPanelSecDiagonalSection = []
            secDiagonal[1].forEach(secDiagonalId => {
                towerData.forEach(line => {
                    if(line.includes(secDiagonalId) && line.includes('CONNECT')) {
                        currentPanelSecDiagonalSection.push(`${line[1]} ${line[6]}`)
                    }
                });
            });
            secondaryDiagonalSectionAndGrade.push(currentPanelSecDiagonalSection)
        }
    });
    // console.log('secondary diagonal Sections and grade', secondaryDiagonalSectionAndGrade);

    // match the secondary diagonal sections and grade with unique section and grade
    secondaryDiagonalSectionAndGrade.forEach(secondaryDiagonal => {
        if (secondaryDiagonal[0] == 0) {
            asmSecondaryDiagonalIds.push(0)
        } else {
            let currentASMSecId = []
            secondaryDiagonal.forEach(secDiagSection => {
                uniqueSectionAndGrade.forEach((section, index) => {
                    if (section.includes(secDiagSection)) {
                        currentASMSecId.push(index + 1)    // all the sec diag ids will be , separated
                    }
                });
            });
            asmSecondaryDiagonalIds.push(currentASMSecId.join())
        }
    });
    // console.log('ASM secondary diagonals ids are: ', asmSecondaryDiagonalIds);
    // console.log('unique sections and grades are: ', uniqueSectionAndGrade);
    return asmSecondaryDiagonalIds;
}

function createSecondaryHorizontals(towerData, totalNumberofPanels) {
    let panelsHavingSecHorizontals = []
    let panelsNotHavingSecHorizontals = []

    Object.keys(panelFacesDB).forEach( panelFace => {
        if (panelFacesDB[panelFace].secondaryHorizontal == 0) {
            panelsNotHavingSecHorizontals.push(panelFace)
        } else panelsHavingSecHorizontals.push(panelFace)
    })

    let secHorizontalPanelNumberAndId = []
    // the main challenge here is that for X panels and XIP PLANS PB can also be secondary horizontal as well
    // need to write the logic for that separately for X0 and X
    // separate the panels having and not having direct secondary horizontal
    // if direct sec hor not present then check whether it is X type and has XIP plan bracing or not
    let panelNumberFromBottom = totalNumberofPanels
    towerData.forEach((line,lineNumber) => {
        if (line.includes('FACE')) {
            let currentPanelFace = line[1];
            if (panelsHavingSecHorizontals.includes(currentPanelFace)) {
                // console.log('These faces have sec horizontals', currentPanelFace);
                let currentSecPanelAndHorizontalId = getSecondaryHorizontals(line, panelFacesDB[currentPanelFace].secondaryHorizontal)
                secHorizontalPanelNumberAndId.unshift([panelNumberFromBottom, currentSecPanelAndHorizontalId])
            } else if (currentPanelFace == 'X' || currentPanelFace == 'X0') {
                if (towerData[lineNumber + 1].includes('XIP')) {
                    towerData[lineNumber + 1].forEach((word, wordNumber) => {
                        if ( word == 'PB' || word == 'PB1' ) {
                            let currentSecPanelAndHorizontalId = [towerData[lineNumber + 1][wordNumber + 1]]
                            secHorizontalPanelNumberAndId.unshift([panelNumberFromBottom, currentSecPanelAndHorizontalId])
                        }
                    });
                } else secHorizontalPanelNumberAndId.unshift([panelNumberFromBottom, 0])
            } else {
                secHorizontalPanelNumberAndId.unshift([panelNumberFromBottom, 0])
            }
            panelNumberFromBottom--;
        }
    });
    // console.log('sec hor panel number and id',secHorizontalPanelNumberAndId);

    // match the secHorizontalIds with section data and grade
    let secondaryHorizontalSectionAndGrade = []
    // console.log('secondary Hor Ids and sections',secHorizontalPanelNumberAndId);
    secHorizontalPanelNumberAndId.forEach((secHorizontal, index) => {
        if ( secHorizontal[1] === 0) {
            secondaryHorizontalSectionAndGrade.push([0])
        } else {
            let currentPanelSecHorizontalSection = []
            secHorizontal[1].forEach(secHorizontalId => {
                towerData.forEach(line => {
                    if(line.includes(secHorizontalId) && line.includes('CONNECT')) {
                        currentPanelSecHorizontalSection.push(`${line[1]} ${line[6]}`)
                    }
                });
            });
            secondaryHorizontalSectionAndGrade.push(currentPanelSecHorizontalSection)
        }
    });
    // console.log('secondary hor section and grade',secondaryHorizontalSectionAndGrade);

    // match the secondary horizontal sections and grade with unique section and grade
    let asmSecondaryHorizontalIds = []
    secondaryHorizontalSectionAndGrade.forEach(secondaryHorizontal => {
        if (secondaryHorizontal[0] == 0) {
            asmSecondaryHorizontalIds.push(0)
        } else {
            let currentASMSecId = []
            secondaryHorizontal.forEach(secHorSection => {
                uniqueSectionAndGrade.forEach((section, index) => {
                    if (section.includes(secHorSection)) {
                        currentASMSecId.push(index + 1)    // all the sec hor ids will be , separated
                    }
                });
            });
            asmSecondaryHorizontalIds.push(currentASMSecId.join())
        }
    });

    // console.log('unique sections and grade: ', uniqueSectionAndGrade);
    // console.log('ASM sec hor ids: ', asmSecondaryHorizontalIds);
    return asmSecondaryHorizontalIds;

}


export function createPanelSection(towerData, topElevations, totalNumberofPanels) {
    const asmLegIds = createLegs(towerData)    
    const asmMainDiagonalIds = createMainDiagonals(towerData)
    const asmMainHorizontalIds = createMainHorizontals(towerData, totalNumberofPanels)
    const asmSecondaryDiagonalIds = createSecondaryDiagonals(towerData, totalNumberofPanels)
    const asmSecondaryHorizontalIds = createSecondaryHorizontals(towerData, totalNumberofPanels)

    let asmPanelSections = [];
    for (let i = 0; i < totalNumberofPanels; i++) {
        let currentPanelSectionLine = `${topElevations[i]}\t${asmLegIds[i]}\t${asmMainDiagonalIds[i]}\t${asmMainHorizontalIds[i]}\t${asmSecondaryDiagonalIds[i]}\t${asmSecondaryHorizontalIds[i]}`
        asmPanelSections.push(currentPanelSectionLine)
    }
    asmPanelSections = asmPanelSections.join('-')
    asmPanelSections = asmPanelSections.replaceAll('-', '\n')
    // console.log(asmPanelSections);
    return asmPanelSections;
}

export { panelFacesHavingMainHorizontals, panelFacesNotHavingMainHorizontals, panelHavingSecondayDiagonals, panelsNotHavingSecondaryDiagonals }