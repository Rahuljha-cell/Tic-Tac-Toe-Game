let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.createElement("p"); //Add a turn indicator
document.body.insertBefore(turnIndicator, document.querySelector("main"));
let turnO = true;//playerX, playerO
let count = 0; //count button clicks
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Player O's Turn";
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {//check if playerO's turn 
            box.innerText = "O";
            turnO = false;
            turnIndicator.innerText = "Player X's Turn";
        } else {// check if playerX's turn
            box.innerText = "X";
            turnO = true;
            turnIndicator.innerText = "Player O's Turn";
        }
        box.disabled = true;
        count++;//Increment count
        if (!checkWinner()) {
            checkDraw(); //check for draw only if no winner
        }
        checkWinner();
    });
});
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }

}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

};
const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // );

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;// Winner found
            }
        }
    }
    return false; // No winner
};

const checkDraw = () => {
    if (count == 9) {
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

turnIndicator.innerText = "Player O's Turn";
