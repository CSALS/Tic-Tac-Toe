let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];
let player1 = -1; //X
let player2 = +1; //O
let currentPlayer;
function resetBoard() {
    for (let i = 0;i < 3;i++) {
        for (let j =0;j < 3;j++) {
            board[i][j] = 0;
        }
    }
    loop();
}
function setup() {
    createCanvas(windowHeight/2,windowHeight/2).style('display', 'block');; //width,height
    // createButton("Reset Board")
    if(random(1) < 0.5) {
        currentPlayer = player1;
    }
    else {
        currentPlayer = player2;
    }
}
function nextTurn() {
    //Check where did the user click
    let w = width/3;
    let h = height/3;
    for (let i = 0;i < 3;i++) {
        for (let j = 0;j < 3;j++) {
            let xTopLeft = j*w;
            let yTopLeft = i*h;
            let xTopRight = xTopLeft + w;
            let yTopRight = yTopLeft;
            let xBottomLeft = xTopLeft;
            let yBottomLeft = yTopLeft + h;;
            let xBottomRight = xTopLeft + w;
            let yBottomRight = yTopLeft + h;
            if(mouseX > xTopLeft && mouseX < xTopRight) {
                if(mouseY > yTopLeft && mouseY < yBottomLeft) {
                    board[i][j] = currentPlayer;
                }
            }
        }
    }
    currentPlayer = -currentPlayer;
}
function mousePressed() {
    nextTurn();
}
function draw() {
    background(255);
    strokeWeight(4);
    let w = width/3; //width of each box
    let h = height/3; //height of each height
    //Horizontal Lines
    line(0,0,width,0);
    line(0,h,width,h);
    line(0,2*h,width,2*h);
    line(0,height,width,height);
    //Vertical Lines
    line(0,0,0,height);
    line(w,0,w,height);
    line(2*w,0,2*w,height);
    line(width,0,width,height);
    //updating canvas according to the board matrix
    for (let i = 0;i < 3;i++) {
        for (let j = 0;j < 3;j++) {
            let x = j*w;
            let y = i*h;
            if(board[i][j] == player1) {
                //Draw X
                strokeWeight(2);
                let offset = 18;
                line(x+offset,y+offset,x+h-offset,y+w-offset);
                line(x+w+-offset,y+offset,x+offset,y+h-offset);
            }
            else if(board[i][j] == player2) {
                //Draw O
                strokeWeight(2);
                ellipse(x+w/2,y+h/2,w/1.5);
            }
        }
    }
    //Checking the result
    //If product of all elements in board = 0 then in progress and if any row/col/diagonal product to +1 then O is winner if -1 then X is winner
    let product = boardProduct();
    result = checkWinner();
    if(result == "player1") {
        noLoop();
        console.log("Player 1 Wins")
    }
    else if(result == "player2") {
        noLoop();
        console.log("Player 2 Wins")
    }
    else if(result == "tie" && product != 0) {
        noLoop();
        console.log("Tie!!")
    }
    else {
        console.log("Game yet to finish")
    }
}
function mousePressed() {
    nextTurn(); 
}
function boardProduct() {
    let product = 1;
    for (let i = 0;i < 3;i++) {
        for (let j = 0;j < 3;j++) {
            product = product * board[i][j];
        }
    }
    return product;
}
function checkWinner() {
    //Horizontal
    for (let i = 0;i < 3;i++) {
        sum = board[i][0] + board[i][1] + board[i][2];
        if(sum == 3*player1) {
            return "player1";
        }
        else if(sum == 3*player2) {
            return "player2";
        }
    }
    //Vertical
    for (let j = 0;j < 3;j++) {
        sum = board[0][j] + board[1][j] + board[2][j];
        if(sum == 3*player1) {
            return "player1";
        }
        else if(sum == 3*player2) {
            return "player2";
        }
    }
    //Diagonal
    sum = board[0][0] + board[1][1] + board[2][2];
    if(sum == 3*player1) {
        return "player1";
    }
    else if(sum == 3*player2) {
        return "player2";
    }
    sum = board[2][0] + board[1][1] + board[0][2];
    if(sum == 3*player1) {
        return "player1";
    }
    else if(sum == 3*player2) {
        return "player2";
    }
    //If still not returned
    return "tie"
}
