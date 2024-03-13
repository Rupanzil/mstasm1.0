export function getSecDiagonalsForSameSecDiagonals(line, secDiagRegex) {
    let secondaryDiagonalId = [];
    // console.log(secDiagRegex);
    line.forEach((word, wordNumber) => {
        if (secDiagRegex.test(word)) {
            secondaryDiagonalId.push(line[wordNumber + 1])
        }
    });
    return secondaryDiagonalId
}

export function getSecDiagonalsForDifferentSecDiagonals(line, secDiagIdFromDB) {
    let secondaryDiagonalId = [];
    secDiagIdFromDB.forEach(id => {
        line.forEach((word, wordNumber) => {
            if (word == id || word == 'R') {
                secondaryDiagonalId.push(line[wordNumber + 1])
            }
        });
    });
    return secondaryDiagonalId
}