var board = document.querySelector('main')
var body = document.querySelector('body')
var newGame = document.querySelector('#newGame')
var timer = document.querySelector('#timer')
var hints = document.querySelector('#hints')
var intro = document.querySelector('.intro')
var setting = document.querySelector('#setting')
var model = document.querySelector('.model-box')
var closeModel = document.querySelector('#closeModel')
var DifficultyLevel = document.querySelector('#DifficultyLevel')


var boardMatrix = ['213789564964153278785426319146532897598674132327918456632891745471265983859347621',
                   '753129684984765321621843957897654213546312879312978546479286135265431798138597462',
                   '213598647987643521654721983895176432762934158431852796578369214349217865126485379',
                   '351897642972654831864321975798465213645213798213978564589146327436782159127539486',
                   '165849372947632851832751964794286513683915427521473698479528136358167249216394785',
                   '862974531917325486543861972795683214684712395321549867479158623236497158158236749',
                   '138795264947862531652431978896174352725983416413526897589217643374658129261349785',
                   '239867541876541932541923876928756413765314298413298765697185324384672159152439687',
                   '581329764976854321432761958894675213765213849213948675659187432347592186128436597',
                   '792865431865431972431927865918756324674392518523184796386519247257643189149278653',
                   '739865421865421973421937865986754312574312698312698754658273149293146587147589236',
                   '219387654876945321543621978925876413784513296631492587497268135368159742152734869',
                   '452789361967531842831642975794865213685213794213974658579128436326457189148396527',
                   '527396841948751632631842975895274316764913528312685794489527163276138459153469287',
                   '638594172947821653521763948895176324764932815312485796489357261253619487176248539'
                ]
var options = document.querySelectorAll('#options > div')

// Dark Mode
let btn = document.querySelector('.neo')
btn.addEventListener('click', () => {
    btn.classList.toggle('neomorphic')
    body.classList.toggle('dark')
})

// Settings is Clicked
setting.addEventListener('click', () => {
    model.classList.toggle('display')
},false)


// When model Close is Clicked
closeModel.addEventListener('click', () => {
    model.classList.toggle('display')
}, false)

//changeDifficultyLevel
var difficulty = 50;
DifficultyLevel.addEventListener('change', () => {
    difficulty = DifficultyLevel.value
}, false)

const newGameStart = () => {
    // Settings Defained for the game
    var matrix = []
    var row = []
    var col = 0
    var rowCount = 1
    var avalibleHints = 10;
    var avalibleWrongOptions = 0;
    
    // A Counter Object to hold the current Selected Box
    var selectedIndex = {
        row: -1,
        col: -1
    }
    board.innerHTML = ''
    // Generating the Sudoku Board from the Selected Random Matrix
    Array.from(boardMatrix[Math.floor(Math.random() * 16)]).forEach(num => {
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
        if(setHidden){
            node.classList.add('fixed')
            row.push({node, safe: false, value: num})
        }
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
        var countDownDate = new Date().getTime();
        
        setInterval(() => {
            var now = new Date().getTime();
            var distance = now - countDownDate;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // console.log();
            if(seconds < 10){
                seconds = '0'+seconds
            }
            timer.innerHTML = minutes+':'+seconds
            hints.innerHTML = avalibleHints
        },1000)
    })
    console.log(avalibleWrongOptions)
    
    const checkAllOccurences = (num) => {
        for(let tempRow = 0; tempRow < 9; tempRow++){
            for(let tempCol = 0; tempCol < 9; tempCol++){
                if(matrix[tempRow][tempCol].node.innerHTML == num){
                    matrix[tempRow][tempCol].node.classList.toggle('hovering')
                }
            }
        }
    }
    
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
        document.querySelector('#options').classList.add('visible')
        selectedIndex.row = cor.row
        selectedIndex.col = cor.col
        console.log("Clicked");
        
        // for(let tempCol = 0; tempCol < 9; tempCol++){
            //     matrix[cor.row][tempCol].node.classList.toggle('hovering');
            // }
            // for(let tempRow = 0; tempRow < 9; tempRow++){
                //     matrix[tempRow][cor.col].node.classList.toggle('hovering');
                // }
                matrix[cor.row][cor.col].node.classList.toggle('hover-point');
                if(!matrix[cor.row][cor.col].safe){
                    console.log("Running");
                    checkAllOccurences(matrix[cor.row][cor.col].node.innerHTML)
                }
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
        if(e.target.localName != 'div'){
            clearEffects()
            clearDefaultColor(matrix[selectedIndex.row][selectedIndex.col].node)
            selectedIndex = {row: -1,col: -1}
            document.querySelector('#options').classList.remove('visible')
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
    
    
    //Keybindings
    function mapKeysWithKeyboard(key){
        switch(key){
            case 'Digit1':
                return 1;
                case 'Digit2':
                    return 2;
                    case 'Digit3':
                        return 3;
                        case 'Digit4':
                            return 4;
                            case 'Digit5':
                                return 5;
                                case 'Digit6':
                                    return 6;
                                    case 'Digit7':
                                        return 7;
                                        case 'Digit8':
                                            return 8;
                                            case 'Digit9':
                                                return 9;
                                                default:
                                                    return key;
                                                }
                                            }
                                            
                                            
                                            const handleKeyEvent = (e) => {
                                                console.log(e.key);
                                                if(selectedIndex.row !== -1){
                                                    console.log("working");
                                                    let option = mapKeysWithKeyboard(e.key)
                                                    let item = matrix[selectedIndex.row][selectedIndex.col]
            let row = selectedIndex.row
            let col = selectedIndex.col
            if(item.safe){
                item.node.innerHTML = option;
                checkForInvalidInput(item.node, row, col)
                if(item.node.innerHTML == matrix[row][col].value){
                    avalibleWrongOptions -= 1
                    console.log(avalibleWrongOptions)
                    checkWinning()
                }
            }
        }
    }
    body.addEventListener('keypress', handleKeyEvent)

}

newGame.addEventListener('click', newGameStart, false)


// Start Game if Clicked on intro Button
intro.addEventListener('click', newGameStart, false)