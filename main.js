const board = $('#board');
const nodes = {
    A: ['B', 'J'],
    B: ['A', 'C', 'E'],
    C: ['B', 'O'],
    D: ['E', 'K'],
    E: ['B', 'H', 'D', 'F'],
    F: ['E', 'N'],
    G: ['H', 'L'],
    H: ['E', 'G', 'I'],
    I: ['H', 'M'],
    J: ['A', 'W', 'K'],
    K: ['D', 'T', 'J', 'L'],
    L: ['G', 'P', 'K'],
    M: ['I', 'S', 'N'],
    N: ['F', 'V', 'M', 'O'],
    O: ['C', 'Y', 'N'],
    P: ['L', 'R'],
    R: ['P', 'S', 'U'],
    S: ['M', 'R'],
    T: ['K', 'U'],
    U: ['R', 'X', 'T', 'V'],
    V: ['U', 'N'],
    W: ['J', 'X'],
    X: ['U', 'W', 'Y'],
    Y: ['X', 'O'],
};

const nodeList = {}

let currentTurn = 'blue';
const maxNumberOfPieces = 18;
const pieces = {};
let piecesOnBoard = 0;

const displayNodeNames = function(index) {
    const element = $(this);

    //build the node list
    const nodeLabel = element.attr('data-node');
    nodeList[nodeLabel] = {
        name: nodeLabel,
        busy: false,
        neighbours: nodes[nodeLabel],
        coords: this.coords
    };

    const div = $('<div class="node">' + nodeLabel + '</div>');
    const [left, top] = this.coords.split(',');
    div.css({
        top: `${parseInt(top) - 14}px`,
        left: `${parseInt(left) - 28}px`,
    }).click(() => {
        $(`area[data-node="${element.attr('data-node')}"]`).trigger('click');
        $(`area[data-node="${element.attr('data-node')}"]`).trigger('mouseup');
    });

    board.append(div);
};

const bindNodeClickEvent = function(event) {
    event.preventDefault();
    const nodeName = $(this).attr('data-node');
    makeSelection(nodeList[nodeName], 'blue');
};

const bindComputerTurn = function(event) {
    event.preventDefault();
    const nonBusyNode = chooseRandomNode(nodeList);
    makeSelection(nonBusyNode, 'red');
}

const chooseRandomNode = function(nodeList) {
    var keys = Object.keys(nodeList).filter((node) => nodeList[node].busy !== true);
    return nodeList[keys[keys.length * Math.random() << 0]];
};

const makeSelection = function(node, player) {
    if (node.busy) {
        // console.log('piece exists on node');
        return;
    }

    if (piecesOnBoard >= maxNumberOfPieces) {
        // console.log('cant add more pieces');
        return;
    }
    const [left, top] = node.coords.split(',');
    const dot = $(`<img class="dot" src="${player}-dot.png">`);
    dot.css({
        top: `${parseInt(top) - 10}px`,
        left: `${parseInt(left) - 27}px`,
    });

    board.append(dot);
    nodeList[node.name].busy = true;
    piecesOnBoard++;
    $('#piecesOnBoard span').html(piecesOnBoard);
}

$('area')
    .each(displayNodeNames)
    .mouseup(bindComputerTurn)
    .click(bindNodeClickEvent);