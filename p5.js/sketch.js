let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];
let player1 = -1; //X
let player2 = +1; //O
let currentPlayer;
let x1,y1,x2,y2,x3,y3; //stores top left corner positions of matched rectangles
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
    frameRate(30);
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
                    //if 0 then only that square is free
                    if(board[i][j] == 0 ){
                        board[i][j] = currentPlayer;
                    }
                }
            }
        }
    }
    currentPlayer = -currentPlayer;
}
function mousePressed() {
    nextTurn();
}
function highLightSquares() {
    let w = width/3;
    let h = height/3;
    X1 = y1*w; 
    Y1 = x1*h; 
    X2 = y2*w; 
    Y2 = x2*h; 
    X3 = y3*w; 
    Y3 = x3*h; 
    if(Y1 == Y2 && Y2 == Y3) {
        //horizontal match
        stroke('green');
        strokeWeight(5);
        for (let offset = 0;offset <= 3*w;offset += 0.125) {
            setTimeout(() => {line(0,Y1+h/2,offset,Y1+h/2)},200);
        }
    }
    else if(X1 == X2 && X2 == X3) {
        //vertical match
        stroke('green');
        strokeWeight(5);
        for (let offset = 0;offset <= 3*h;offset += 0.125) {
            setTimeout(() => {line(X1+w/2,0,X1+w/2,offset)},200);
        }
    }
    else {
        stroke('green');
        strokeWeight(5);
        if(Y1 == 0) {
            //right diagonal
            for (let xOffset = 0, yOffset = 0; xOffset <= 3*w,yOffset <= 3*h; xOffset += 0.125, yOffset += 0.125) {
                setTimeout(() => {line(0,0,xOffset,yOffset)},200); 
            }
        }
        else {
            //left diagonal
            // line(0,3*h,3*w,0);
            for (let xOffset = 0, yOffset = 3*h; xOffset <= 3*w,yOffset >= 0; xOffset += 0.125, yOffset -= 0.125) {
                setTimeout(() => {line(0,3*h,xOffset,yOffset)},200); 
            }
        }
    }
}
function highLightBoardForTie() {
    background(255,0,0,50);
}
function draw() {
    background(255);
    
    stroke('black');
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
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    resultP.style('font-family','Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans')
    resultP.style('position','relative')
    resultP.style('left','30px');
    if(result == "player1") {
        noLoop();
        highLightSquares();
        resultP.html("Player X Wins !!!")
    }
    else if(result == "player2") {
        noLoop();
        highLightSquares();
        resultP.html("Player O Wins !!!")
    }
    else if(result == "tie" && product != 0) {
        noLoop();
        highLightBoardForTie();
        resultP.html("Tie !!!")
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
            x1 = i; y1 = 0;
            x2 = i; y2 = 1;
            x3 = i; y3 = 2;
            return "player1";
        }
        else if(sum == 3*player2) {
            x1 = i; y1 = 0;
            x2 = i; y2 = 1;
            x3 = i; y3 = 2;
            return "player2";
        }
    }
    //Vertical
    for (let j = 0;j < 3;j++) {
        sum = board[0][j] + board[1][j] + board[2][j];
        if(sum == 3*player1) {
            x1 = 0; y1 = j;
            x2 = 1; y2 = j;
            x3 = 2; y3 = j;
            return "player1";
        }
        else if(sum == 3*player2) {
            x1 = 0; y1 = j;
            x2 = 1; y2 = j;
            x3 = 2; y3 = j;
            return "player2";
        }
    }
    //Diagonal
    sum = board[0][0] + board[1][1] + board[2][2];
    if(sum == 3*player1) {
        x1 = 0; y1 = 0;
        x2 = 1; y2 = 1;
        x3 = 2; y3 = 2;
        return "player1";
    }
    else if(sum == 3*player2) {
        x1 = 0; y1 = 0;
        x2 = 1; y2 = 1;
        x3 = 2; y3 = 2;
        return "player2";
    }
    
    sum = board[2][0] + board[1][1] + board[0][2];
    if(sum == 3*player1) {
        x1 = 2; y1 = 0;
        x2 = 1; y2 = 2;
        x3 = 0; y3 = 2;
        return "player1";
    }
    else if(sum == 3*player2) {
        x1 = 2; y1 = 0;
        x2 = 1; y2 = 2;
        x3 = 0; y3 = 2;
        return "player2";
    }
    //If still not returned
    return "tie"
}
