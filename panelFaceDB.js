const panelFacesDB = {

    // ------------ X-FACES---------------
    'X0': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'X',
        subdivide: 0,
    },
    // apparently, X0 and XO both are same
    'XO': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'X',
        subdivide: 0,
    },
    'X': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'X',
        subdivide: 0,
    },
    'XH1': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: [/\bH\b|\bH1\b/],
        panelType: 'X',
        subdivide: 1,
        legConnection: /LEG/
    },
    'XH2': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: [/\bH\b|\bH1\b/],
        panelType: 'X',
        subdivide: 1,
        legConnection: /LEG/
    },
    'XH3': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: /\bR\b|\bR1\b/,     // regex for panels having same redundants
        secondaryHorizontal: [/\bR1?\b/, /\bH1?\b/, /\bR1?\b/],
        panelType: 'X',
        subdivide: 3,
        legConnection: /LEG/
    },
    'XH3A': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: ['R3', 'R2'],      // array of mst ids from bottom to top for panels having different redundants
        secondaryHorizontal: [/\bR4\b/, /\bH1?\b/, /\bR1\b/],
        panelType: 'X',
        subdivide: 3,
        legConnection: /LEG/
    },
    'XTR': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: ['R3', 'R1', 'R2'],
        secondaryHorizontal: 0,
        panelType: 'XD',
        subdivide: 1,
        legConnection: /LEG/
    },

    //--------------- K-FACES------------
    'K': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'A',
        subdivide: 0,
        legConnection: /LEG/
    },
    'K1': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: /\bR\b|\bR1\b/,
        secondaryHorizontal: [/\bR\b|\bR2\b/],
        panelType: 'A',
        subdivide: 1,
        legConnection: /LEG/
    },
    'K2': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: /\bR\b|\bR1\b/,
        secondaryHorizontal: [/\bR1?\b/],
        panelType: 'A',
        subdivide: 2,
        legConnection: /LEG/
    },
    'K2A': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: ['R3', 'R1'],
        secondaryHorizontal: [/\bR4?\b/, /\bR2?\b/],
        panelType: 'A',
        subdivide: 2,
        legConnection: /LEG/
    },
    
    //--------------- DL,DR-FACES------------
    'DL': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'S',
        subdivide: 0,
        legConnection: /LEG/
    },
    'DL0': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'S',
        subdivide: 0,
        legConnection: /LEG/
    },
    'DLO': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'S',
        subdivide: 0,
    },
    'DR': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'Z',
        subdivide: 0,
    },
    'DR0': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'Z',
        subdivide: 0,
    },
    'DRO': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: 0,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'Z',
        subdivide: 0,
    },
    
    // ------------ M-Faces----------------
    'M': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /\bH1?\b/,
        secondaryDiagonals: 0,
        secondaryHorizontal: 0,
        panelType: 'V',
        subdivide: 0
    },
    'M1': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: /\bR2?\b/,
        secondaryHorizontal: [/\bR1?/],
        panelType: 'V',
        subdivide: 1
    },
    'M2': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: /\bR1?\b/,
        secondaryHorizontal: [/\bR1?/],
        panelType: 'V',
        subdivide: 2
    },
    'M2A': {
        leg: 'LEG',
        mainDiagonal: 'BR1',
        mainHorizontal: /H|H1/,
        secondaryDiagonals: ['R4', 'R2'],
        secondaryHorizontal: [/\bR3?\b/, /\bR1?\b/],
        panelType: 'V',
        subdivide: 2,
    },
}

let panelsHavingSecondaryHorizontals = []
let panelsNotHavingSecondaryHorizontals = []
let allPanelFacesinDB = []

Object.keys(panelFacesDB).forEach( panelFace => {
    const panel = panelFacesDB[panelFace]
    allPanelFacesinDB.push(panelFace)
    if (panel.secondaryHorizontal == 0) {
        panelsNotHavingSecondaryHorizontals.push(panelFace)
    } else panelsHavingSecondaryHorizontals.push(panelFace)
})

export { panelsHavingSecondaryHorizontals, panelsNotHavingSecondaryHorizontals, panelFacesDB, allPanelFacesinDB }