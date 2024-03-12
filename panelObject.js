// create constructor function to create a panel object
/*
panel[index] = {
    panelId : 'some id',
    MSTFace : 'panel_face_from_mst'
    legMSTId : 'Leg_id_from_mst',
    legASMId : 'section_number_from_selected_sections',
    legSection : 'EA or ASXC or ASX or DAS or CHS',
    mainDiagonalMSTId: 'bracing_id_from_mst',
    mainDiagonalASMId: 'bracing id from selected sections',
    mainDiagonalSection: 'EA or DAS or CHS',
    


}
*/

class Panel {
    constructor ( panelId, MSTFace, legMSTId, legASMId, legSection, mainDiagonalMSTId, mainDiagonalASMId, mainDiagonalSection) {
        this.panelId = panelId;
        this.MSTFace = MSTFace;
        this.legMSTId = legMSTId;
        this.legASMId = legASMId;
        this.legSection = legSection;
        this.mainDiagonalMSTId = mainDiagonalMSTId;
        this.mainDiagonalASMId = mainDiagonalASMId;
        this.mainDiagonalSection = mainDiagonalSection;
    }
}

let panelObjects = []

// Function to create panel objects
// pass the array of legs, panel faces, leg, bracing Ids from MST, sections
function createPanelObjects() {
    const panelObject1 = new Panel(1, 'XH1', '1011', 1, 'EA100X100X8', '2011', 8, 'EA60X60X6')
    panelObjects.push(panelObject1)
    console.log('Panel Object', panelObjects[0])
}

export { Panel, createPanelObjects }