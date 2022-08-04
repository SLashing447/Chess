const ALPHA = "abcdefgh";
const NUM = "12345678";

export function Moves(state, piece) {
    var moves;

    const name = piece.color + piece.name;
    const cords = piece.cords;

    switch (piece.name) {
        case "p":
            moves = getPawnMoves(state, name, cords);
            break;
        case "n":
            moves = getKnightMoves(state, name, cords);
            break;
        case "k":
            moves = getKingMoves(state, name, cords);
            break;
        case "r":
            moves = getRookMoves(state, name, cords);
            break;
        case "b":
            moves = getBishopMoves(state, name, cords);
            break;
        case "q":
            moves = getQueenMoves(state, name, cords);
            break;
        default:
            console.error("Internal Chess Piece Selection Error");
            break;
    }

    return moves;
}

function getPawnMoves(state, name, cords) {
    const moves = [];
    let x = cords[0];
    let y = parseInt(cords[1]);
    let color = name[0];

    let hasMoved = (color === "w" && y === 2) || (color === "b" && y === 7);
    hasMoved = !hasMoved;

    let s1 = `${x}${color === "w" ? y + 1 : y - 1}`;
    let s2 = `${x}${color === "w" ? y + 2 : y - 2}`;

    if (state[s1] === undefined) {
        if (!hasMoved) {
            moves.push(s1);
            moves.push(s2);
        } else {
            moves.push(s1);
        }
    }

    // capturing pattern
    let d1 = `${ALPHA[ALPHA.indexOf(x) - 1]}${color === "w" ? y + 1 : y - 1}`;
    let d2 = `${ALPHA[ALPHA.indexOf(x) + 1]}${color === "w" ? y + 1 : y - 1}`;

    if (state[d1] !== undefined && state[d1][0] !== color) moves.push(d1);
    if (state[d2] !== undefined && state[d2][0] !== color) moves.push(d2);

    return moves;
}

// TODO : incomplete function and needs to be fixed
function getKnightMoves(state, name, cords) {
    console.log("Fetching Knight Moves");
    const moves = [];
    let x = cords[0];
    let y = parseInt(cords[1]);
    let color = name[0];

    for (let i of [
        `${ALPHA[ALPHA.indexOf(x) - 1]}${y - 2}`,
        `${ALPHA[ALPHA.indexOf(x) - 1]}${y + 2}`,
        `${ALPHA[ALPHA.indexOf(x) + 2]}${y - 1}`,
        `${ALPHA[ALPHA.indexOf(x) + 2]}${y + 1}`,
        `${ALPHA[ALPHA.indexOf(x) + 1]}${y - 2}`,
        `${ALPHA[ALPHA.indexOf(x) + 1]}${y + 2}`,
        `${ALPHA[ALPHA.indexOf(x) - 2]}${y - 1}`,
        `${ALPHA[ALPHA.indexOf(x) - 2]}${y + 1}`,
    ]) {
        if (checkOutSide(i)) {
            if (state[i] === undefined) moves.push(i);
            if (state[i] !== undefined && state[i][0] !== color) moves.push(i);
        }
    }

    return moves;
}

function checkOutSide(moves) {
    return (
        moves[0].charCodeAt() >= 97 &&
        moves[0].charCodeAt() <= 104 &&
        parseInt(moves[1]) >= 1 &&
        parseInt(moves[1]) <= 8 &&
        moves.length === 2
    );
}

function getKingMoves(state, name, cords) {
    const moves = [];
    let x = cords[0];
    let y = parseInt(cords[1]);
    let color = name[0];

    for (let i of [
        `${ALPHA[ALPHA.indexOf(x) - 1]}${y}`,
        `${ALPHA[ALPHA.indexOf(x) + 1]}${y}`,
        `${ALPHA[ALPHA.indexOf(x)]}${y + 1}`,
        `${ALPHA[ALPHA.indexOf(x)]}${y - 1}`,
        `${ALPHA[ALPHA.indexOf(x) - 1]}${y + 1}`,
        `${ALPHA[ALPHA.indexOf(x) + 1]}${y + 1}`,
        `${ALPHA[ALPHA.indexOf(x) - 1]}${y - 1}`,
        `${ALPHA[ALPHA.indexOf(x) + 1]}${y - 1}`,
    ]) {
        if (checkOutSide(i) && state[i] === undefined) moves.push(i);
        if (checkOutSide(i) && state[i] !== undefined && state[i][0] !== color)
            moves.push(i);
    }
    return moves;
}

function getRookMoves(state, name, cords) {
    const moves = [];
    let x = cords[0];
    let y = parseInt(cords[1]);
    let color = name[0];

    // ! top moves
    for (let i = 1; i <= 8; i++) {
        let m = `${x}${y - i}`;
        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }
    // ! bottom moves
    for (let i = 1; i <= 8 - y; i++) {
        let m = `${x}${y + i}`;
        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }

    // ! left moves
    for (let i = 1; i <= 8; i++) {
        let m = `${ALPHA[ALPHA.indexOf(x) - i]}${y}`;
        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }
    // ! right moves
    for (let i = 1; i <= 8; i++) {
        let m = `${ALPHA[ALPHA.indexOf(x) + i]}${y}`;
        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }

    return moves;
}

function getBishopMoves(state, name, cords) {
    const moves = [];
    let x = cords[0];
    let y = parseInt(cords[1]);
    let color = name[0];

    // ! top left moves
    for (let i = 1; i <= 8; i++) {
        let m = `${ALPHA[ALPHA.indexOf(x) - i]}${y - i}`;
        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }

    // ! bottom left moves
    for (let i = 1; i <= 8; i++) {
        let m = `${ALPHA[ALPHA.indexOf(x) - i]}${y + i}`;

        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }

    // ! top right moves
    for (let i = 1; i <= 8; i++) {
        let m = `${ALPHA[ALPHA.indexOf(x) + i]}${y + i}`;

        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }
    // ! bottom right moves
    for (let i = 1; i <= 8; i++) {
        let m = `${ALPHA[ALPHA.indexOf(x) + i]}${y - i}`;

        if (checkOutSide(m)) {
            if (state[m] !== undefined && state[m][0] === color) break;
            if (state[m] !== undefined && state[m][0] !== color) {
                moves.push(m);
                break;
            }
            moves.push(m);
        }
    }

    return moves;
}

function getQueenMoves(state, name, cords) {
    const moves = [];

    moves.push(...getRookMoves(state, name, cords));
    moves.push(...getBishopMoves(state, name, cords));

    return moves;
}
