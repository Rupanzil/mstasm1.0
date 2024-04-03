let legMSTId = []
let legASMId = []
let legSections = []
let mainDiagonalMSTIds = []
let mainDiagonalASMId = []
let mainDiagonalSections = []
let uniqueSections = []
let allSections = [
  'RB16.0 235',
  'CHS193.7X5.0 235',
  'EA40X40X5 235',
  'FB40X5 235',
]
let uniqueSectionAndGrade = []

function createSelectedSections(towerData) {
  // different regex to check the type of section, whether it is EA or CHS or DAS etc.
  let EAregex = /\bEA\d/
  let CHSregex = /\bCHS\d/
  let DASregex = /\bDAS\d/
  let ASXregex = /\bASX\d/
  let ASXCregex = /\bASXC\d/
  let STAregex = /\bSTA\d/
  let STASEregex = /\bSTASE\d/
  let STASXregex = /\bSTASX\d/
  let FBregex = /\bFB\d/
  let FPregex = /\bFP\d/
  let RBregex = /\bRB\d/

  let asmSectionType = ''
  let asmStandard = 'User Defined'
  let asmSectionName = ''
  let asmBuiltUpType = ' '
  let asmBuiltUpSide = ''
  let asmGap = 0
  let asmMaterialStandard = 'User Defined'
  let asmMaterialGrade = ' '
  let asmComments = ' '

  createSections(towerData)

  console.log('Unique sections', uniqueSections)

  uniqueSections.forEach((section, index) => {
    asmSectionName = section[0]
    asmMaterialGrade = `S${section[1]}`
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

    if (FPregex.test(section[0])) {
      asmSectionType = 'Flat Bar'
      asmBuiltUpType = 'S'
      asmComments = 'Do not Delete'
      asmSectionName = convertToFB(section[0])
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

    if (DASregex.test(section[0])) {
      asmSectionType = 'Equal Angle'
      asmBuiltUpSide = 'Height'
      asmBuiltUpType = 'DB'
      asmGap = 10
      // convert DAS to EA
      // remove '-' sign from DAS sections
      asmSectionName = convertToEA(section[0])
      console.log('this is DAS to EA', asmSectionName)
    }

    if (STAregex.test(section[0])) {
      asmSectionType = 'Equal Angle'
      asmBuiltUpSide = 'Height'
      asmBuiltUpType = 'ST'
      asmGap = 10
      // convert STA to EA
      asmSectionName = convertToEA(section[0])
      console.log('this is STA to EA', asmSectionName)
    }

    let selectedSectionLine = `${asmSectionType}\t${asmStandard}\t${asmSectionName}\t${asmBuiltUpType}\t${asmBuiltUpSide}\t${asmGap}\t${asmMaterialStandard}\t${asmMaterialGrade}\n`
    selectedSection.push(selectedSectionLine)

    //resetting the values again
    asmSectionType = ''
    asmStandard = 'User Defined'
    asmSectionName = ''
    asmBuiltUpType = ' '
    asmBuiltUpSide = ''
    asmGap = 0
    asmMaterialStandard = 'User Defined'
    asmMaterialGrade = ' '
    asmComments = ' '
  })

  selectedSection = selectedSection.join('')
  return selectedSection
}

function createSections(towerData) {
  // const regex = /EA|CHS/;     // add more to the regex to filter out more sections // will use this later
  towerData.forEach((line, lineIndex) => {
    if (line.includes('BH')) {
      let section = line[1]
      line.forEach((word, wordIndex) => {
        if (word === 'FY') {
          let grade = line[wordIndex + 1]
          allSections.push(section + ' ' + grade)
        }
      })
    }
  })
  // console.log('array containing all sections: ', allSections);

  // create an array which only has unique sections and grades
  const set = new Set(allSections)

  // change each 'X' to 'x' including ASX and ASXC
  let arraySet = Array.from(set)
  arraySet = arraySet.map(function (str) {
    return str.replace(/(\d)X(\d)/g, '$1x$2')
  })

  //   console.log('This is a set created from all sections', arraySet)

  arraySet.forEach((element) => {
    uniqueSectionAndGrade.push(element)
    let sectionAndGrade = element.split(' ')
    // console.log('unique section and grades: ',sectionAndGrade);
    uniqueSections.push(sectionAndGrade)
  })
  console.log('Uniques section and Grade', uniqueSections) // #CHECK : grade needs validation whether valid grade or not
}

let selectedSection = []
let asmSections = []

const convertToEA = (section) => {
  const matchedText = section.match(/^([A-Z]+)([\dx]+)/)
  return 'EA' + matchedText[2]
}

const convertToFB = (section) => {
  const matchedText = section.match(/^([A-Z]+)([\dx]+)/)
  return 'FB' + matchedText[2]
}

export { createSelectedSections, uniqueSectionAndGrade }
