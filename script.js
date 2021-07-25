var board = document.querySelector('main')
var body = document.querySelector('body')
var boardMatrix = '213789564964153278785426319146532897598674132327918456632891745471265983859347621'
var options = document.querySelectorAll('#options > div')


// Settings Defained for the game
var matrix = []
var row = []
var col = 0
var rowCount = 1
var difficulty = 10;
var avalibleHints = 10;
var avalibleWrongOptions = 0;

// A Counter Object to hold the current Selected Box
var selectedIndex = {
    row: -1,
    col: -1
}

// Generating the Sudoku Board from the Selected Random Matrix
Array.from(boardMatrix).forEach(num => {
    let setHidden = false
    random = Math.random() * 100
    if(Math.round(random) > difficulty)
        setHidden = true
    let node = document.createElement('div')
    node.classList.add('tile')
    if(setHidden)
        node.innerHTML = num
    if(rowCount % 3 == 0){
        node.classList.add('borderBottom')
    }
    if(setHidden)
        row.push({node, safe: false, value: num})
    else{
        row.push({node, safe: true, value: num})
        avalibleWrongOptions += 1
    }
    col++;
    if(col == 9){
        matrix.push(row)
        row = []
        col = 0
        rowCount++;
    }
    board.appendChild(node)
})
console.log(avalibleWrongOptions)
// Adding Event Listener to every Cell in this matrix
for(let row = 0; row < matrix.length; row++){
    for(let col = 0; col < matrix.length; col++){
        let cor = {row, col}
        matrix[row][col].node.addEventListener('click', (e) => markIt(e, cor))
    }
}

// This is mark the Row and Column of the box which we clicked
const markIt = (e, cor) => {
    clearEffects()
    selectedIndex.row = cor.row
    selectedIndex.col = cor.col

    for(let tempCol = 0; tempCol < 9; tempCol++){
        matrix[cor.row][tempCol].node.classList.toggle('hovering');
    }
    for(let tempRow = 0; tempRow < 9; tempRow++){
        matrix[tempRow][cor.col].node.classList.toggle('hovering');
    }
    matrix[cor.row][cor.col].node.classList.toggle('hover-point');
}

// This will clear all the highlighing of hovering effects
const clearEffects = () => {
    matrix.forEach(row => {
        row.forEach(col => {
            col.node.classList.remove('hovering')   
            col.node.classList.remove('hover-point')
        })   
    })
}

// this will remove the highlighting from Collision Numbers in the row and column 
const clearWrongSelection = (node) => {
    node.classList.remove('wrong_selection')
}

// This will Clear the default Selected block text color
const clearDefaultColor = (node) => {
    node.classList.remove('default_text_color')
    node.style.color = '#9dda52';
}

console.log(options)


// WHen we click a Box.. This will get Triggered
options.forEach(option => {
    option.addEventListener('click', () => {
        let item = matrix[selectedIndex.row][selectedIndex.col]
        let row = selectedIndex.row
        let col = selectedIndex.col
        if(item.safe){
            if(option.innerHTML == 'Hint'){
                if(avalibleHints > 0){
                    item.node.innerHTML = matrix[row][col].value;
                    avalibleHints -= 1;
                }
            } else {
                item.node.innerHTML = option.innerHTML;
                checkForInvalidInput(item.node, row, col)
            }
            if(item.node.innerHTML == matrix[row][col].value){
                avalibleWrongOptions -= 1
                console.log(avalibleWrongOptions)
                checkWinning()
            }
        }
    })   
})

// This will detect numbers in row and column
const checkForInvalidInput = (node, row, col) => {
    matrix[row][col].node.classList.add('default_text_color')
    for(let tempCol = 0; tempCol < 9; tempCol++){
        if(matrix[row][tempCol].node.innerHTML == node.innerHTML)
            matrix[row][tempCol].node.classList.add('wrong_selection')
        else
            clearWrongSelection(matrix[row][tempCol].node)
    }
    for(let tempRow = 0; tempRow < 9; tempRow++){
        if(matrix[tempRow][col].node.innerHTML == node.innerHTML)
            matrix[tempRow][col].node.classList.add('wrong_selection')
        else
            clearWrongSelection(matrix[tempRow][col].node)
    }
}

body.addEventListener('click', clearMarkedEffects, false)

// This will Clear the Matrix Highlights when we click on body
function clearMarkedEffects(e){
    if(e.target.id == 'container'){
        clearEffects()
        clearDefaultColor(matrix[selectedIndex.row][selectedIndex.col].node)
        selectedIndex = {row: -1,col: -1}
    }
}

// This will check if we completed the game
const checkWinning = () => {
    if(avalibleWrongOptions == 0){
        setTimeout(() => alert('You Won the GAME :D'), 500);
        clearEffects()
        clearDefaultColor(matrix[selectedIndex.row][selectedIndex.col].node)
        selectedIndex = {row: -1,col: -1}
    }
}
