
let legMSTId = []
let legASMId = []
let legSections = []
let mainDiagonalMSTIds = []
let mainDiagonalASMId = []
let mainDiagonalSections = []
let uniqueSections = []
let allSections = ['RB16.0 235', 'CHS193.7X5.0 235', 'EA40X40X5 235', 'FB40X5 235']
let uniqueSectionAndGrade = []


function createSelectedSections (towerData) {
    // different regex to check the type of section, whether it is EA or CHS or DAS etc.
    let EAregex = /EA\d/ ;
    let CHSregex = /CHS\d/;
    let DASregex = /DAS\d/;
    let ASXregex = /ASX\d/;
    let ASXCregex = /ASXC\d/;
    let STAregex = /STA\d/;
    let STASEregex = /STASE\d/;
    let STASXregex = /STASX\d/;
    let FBregex = /FB\d/;
    let RBregex = /RB\d/;

    let asmSectionType = '';
    let asmStandard = 'User Defined';
    let asmSectionName = '';
    let asmBuiltUpType = ' ';
    let asmBuiltUpSide = '';
    let asmGap = 0;
    let asmMaterialStandard = 'User Defined';
    let asmMaterialGrade = ' ';
    let asmComments = ' ';

    createSections(towerData)

    

    
    // console.log('Unique sections', uniqueSections);

    uniqueSections.forEach((section,index) => {
        // for now this will work only with equal angles and later we can add checks to include CHS or other types of sections.
        if (EAregex.test(section[0])) {
            asmSectionType = 'Equal Angle'
            asmBuiltUpType = 'S'
            asmComments = 'Do not Delete'
        }

        if (CHSregex.test(section[0])) {
            asmSectionType = 'Pipe'
            asmBuiltUpType = 'S'
            asmComments = 'Do not Delete'
        }

        if (FBregex.test(section[0])) {
            asmSectionType = 'Flat Bar'
            asmBuiltUpType = 'S'
            asmComments = 'Do not Delete'
        }

        if (RBregex.test(section[0])) {
            asmSectionType = 'Solid Round'
            asmBuiltUpType = 'S'
            asmComments = 'Do not Delete'
        }

        if (ASXCregex.test(section[0])) {
            asmSectionType = '60° BP Angle'
            asmBuiltUpType = 'S'
        }
        
        if (ASXregex.test(section[0])) {
            asmSectionType = 'Schifflerized (60° angle)'
            asmBuiltUpType = 'S'
        }

        asmSectionName = section[0];
        asmMaterialGrade = `S${section[1]}`;
        let selectedSectionLine = `${asmSectionType}\t${asmStandard}\t${asmSectionName}\t${asmBuiltUpType}\t${asmBuiltUpSide}\t${asmGap}\t${asmMaterialStandard}\t${asmMaterialGrade}\n`
        selectedSection.push(selectedSectionLine);
    });


    selectedSection = selectedSection.join('')

    
    return selectedSection;
}

function createSections(towerData) {
    // const regex = /EA|CHS/;     // add more to the regex to filter out more sections // will use this later
    towerData.forEach((line, lineIndex) => {
        if ( line.includes('BH')) {
            let section = line[1]
            line.forEach((word, wordIndex) => {
                if (word === 'FY') {
                    let grade = line[wordIndex + 1]
                    allSections.push(section + ' ' + grade)
                }
            });
        }
    });
    // console.log('array containing all sections: ', allSections);
    
    // create an array which only has unique sections and grades
    const set = new Set(allSections)

    // change each 'X' to 'x' including ASX and ASXC
    let arraySet = Array.from(set)
    arraySet = arraySet.map(function(str) {
        return str.replace(/(\d)X(\d)/g, '$1x$2');
    });

    // console.log('This is a set created from all sections', arraySet);

    arraySet.forEach(element => {
        uniqueSectionAndGrade.push(element)
        let sectionAndGrade = element.split(' ')
        // console.log('unique section and grades: ',sectionAndGrade);
        uniqueSections.push(sectionAndGrade)
    });
    // console.log('Uniques section and Grade', uniqueSectionAndGrade);    // #CHECK : grade needs validation whether valid grade or not

}

let selectedSection = [];
let asmSections = []



export { createSelectedSections, uniqueSectionAndGrade }