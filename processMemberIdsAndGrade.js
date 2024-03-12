export function processIdsAndGrade(data) {
    data = data.map(function(str) {
        return str.replace(/(\d)X(\d)/g, '$1x$2');
    });

    return data;
}