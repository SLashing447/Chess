const ALPHA = "abcdefgh";
const NUM = "12345678";

class Piece {
    #piece;
    constructor({ color, cords, name }) {
        this.color = color;
        this.name = name;
        this.cords = cords;

        this.#piece = document.createElement("chess-piece");

        this.#piece.classList.add("piece");
        this.#piece.classList.add("flex");
        this.#piece.classList.add("flexCenter");
        this.#piece.setAttribute("cords", cords);
        this.#piece.setAttribute("color", `${color}`);

        this.imageURL = `../../../assets/pieces/${color}${name}.svg`;
        this.#piece.style.background = `url(${this.imageURL}) no-repeat center center / cover`;
        this.move(this.cords);
    }

    get() {
        return this.#piece;
    }

    move(cords) {
        let x = cords[0];
        let y = cords[1];
        // console.log("Moved ", this.color + this.name, " to ", x + y);
        this.cords = cords;
        this.#piece.style.transform = `translateY(${
            NUM.indexOf(y) * 100
        }px) translateX(${ALPHA.indexOf(x) * 100}px)`;
    }
}

export default Piece;
