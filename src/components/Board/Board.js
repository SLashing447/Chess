import { Moves } from "../../scripts/Moves/Moves.js";
import state from "../../state/state.js";
import Piece from "../Piece/Piece.js";

const ALPHA = "abcdefgh";
const NUM = "12345678s";

class Board {
    #piece = null;

    constructor(size) {
        this.size = size;
        this.board = [];
        this.state = state;

        this.ui = document.querySelector("[c-board]");

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let c = ALPHA[i] + NUM[j];
                if (this.state.hasOwnProperty(c)) {
                    let p = new Piece({
                        color: state[c][0],
                        name: state[c][1],
                        cords: c,
                    });
                    this.board.push(p);
                    this.ui.appendChild(p.get());
                    p.get().addEventListener("click", () =>
                        this.onPieceClick(p)
                    );
                }
            }
        }
    }

    unFocusPiece() {
        this.#piece.get().classList.remove("selected");
        this.#piece = null;
        this.removeMoves();
    }

    onPieceClick(e) {
        if (this.#piece !== null) this.unFocusPiece();

        this.#piece = e;
        this.#piece.get().classList.add("selected");

        if (document.querySelector(".cover"))
            document.querySelector(".cover").remove();
        let cover = document.createElement("span");
        cover.classList.add("cover");
        this.ui.appendChild(cover);
        cover.addEventListener("click", (e) => {
            cover.remove();
            this.unFocusPiece();
        });
        console.log();
        const moves = Moves(this.state, e);
        this.showMoves(moves);
    }

    removeMoves() {
        let moves = document.querySelectorAll("move-node");
        for (let i of moves) {
            i.remove();
        }
    }

    showMoves(moves) {
        for (let i of moves) {
            let moveNode = document.createElement("move-node");
            let C_ = this.#piece.color;
            let p_;
            let c_;

            if (this.state.hasOwnProperty(i)) {
                this.board.map((e) => {
                    if (e.cords === i) {
                        p_ = e.get();
                        c_ = e.color;
                    }
                });
            }

            if ((C_ === "w" && c_ === "b") || (C_ === "b" && c_ === "w")) {
                moveNode.classList.add("capture");
            }

            moveNode.addEventListener("click", (e) => {
                document.getElementsByClassName("cover")[0].remove();

                if (p_) this.ui.removeChild(p_); // remove captured piece from board

                delete this.state[this.#piece.cords]; // removing previos piece

                this.#piece.move(i);

                this.state[i] = this.#piece.color + this.#piece.name; // updateing the state with new piece

                this.unFocusPiece();
            });
            moveNode.style.transform = `translateY(${
                NUM.indexOf(i[1]) * 100
            }px) translateX(${ALPHA.indexOf(i[0]) * 100}px)`;
            this.ui.appendChild(moveNode);
        }
    }
}

export default Board;
