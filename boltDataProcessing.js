export function getBoltDia(boltData) {
    // console.log('panel data: ', boltData);
    const BoltDataAndGrade = boltData.split('-')
    const boltDia = parseInt(BoltDataAndGrade[0].match(/\d+/))
    return boltDia
}

export function getBoltGrade(boltData) {
    // console.log('panel data: ', boltData);
    const BoltDataAndGrade = boltData.split('-')
    let boltGrade;
    if (BoltDataAndGrade[1].length == 1) {
        boltGrade = BoltDataAndGrade[1]
    } else {
        const lastCharacter = BoltDataAndGrade[1].charAt(BoltDataAndGrade[1].length -1)
        // console.log(lastCharacter);
        if (lastCharacter == 0) {
            boltGrade = BoltDataAndGrade[1]
        } else {
            boltGrade = BoltDataAndGrade[1].slice(0,-1)
        }
    }

    //Check for the grade and returns ASM grade value
    if (boltGrade == '4') {
        return 'Class 4.8'
    } else if (boltGrade == '5') {
        return 'Class 5.8'
    } else if (boltGrade == '6') {
        return 'Class 6.8'
    } else if (boltGrade == '8') {
        return 'Class 8.8'
    } if (boltGrade == '10') {
        return 'Class 10.9'
    } else return 'Grade not in ASM DataBase'
}

export function getBoltConnectionType(BoltData) {
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