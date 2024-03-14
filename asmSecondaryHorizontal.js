export function getSecondaryHorizontals(line, secHorRegexArray) {
    // console.log(secHorRegexArray);
    let secHorIds = []
    secHorRegexArray.forEach(regex => {
        line.forEach((word, wordNumber) => {
            if (regex.test(word)) {
                // console.log('sec hor id: ',line[wordNumber+1]);
                secHorIds.push(parseInt(line[wordNumber+1]))
            }
        });
    });
    // console.log('sec hor ids', secHorIds);
    return secHorIds;
}