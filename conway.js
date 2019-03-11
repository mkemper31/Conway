'use strict';


// [[0, 1, 0, 1, 0],
// [1, 1, 1, 1, 1],

/*
let grid = [[0,1,0,1,0,1,0,1],
            [1,1,1,1,1,0,0,1],
            [1,1,1,1,1,1,0,0],
            [1,1,1,1,1,0,0,0],
            [1,1,1,1,1,0,1,0],
            [1,1,1,1,1,0,0,1],
            [1,1,1,1,1,1,0,0],
            [1,1,1,1,1,0,0,0]];
            
*/

function defineGrid(xAxis,yAxis) {
    let grid = [];
    for (let i = 0; i < yAxis; i++) {
        let row = [];
        for (let n = 0; n < xAxis; n++) {
            row.push(Math.round(Math.random()));
        }
        grid.push(row);
    }
    return grid;
}

function updateGrid(currentGrid) { //Updates the grid, returns array newGrid
    let newGrid = currentGrid;
    
    //console.log('newGrid: \n');
    //console.log(newGrid);
    
    for (let i = 0; i < currentGrid.length; i++) {
        for (let n = 0; n < currentGrid[i].length; n++) {
            newGrid[i][n] = updateCell(currentGrid,i,n);
        }
    }
    return newGrid;
}

function updateCell(currentGrid,yAxis,xAxis) {  //Updates one cell. Called by
                                                //updateGrid(). Returns boolean
    let isAlive = 0;
    let numberAdjacent = 0;
    if (currentGrid[yAxis][xAxis] == 1) {
        isAlive = 1;
    }
    for (let i = yAxis - 1; i <= yAxis + 1; i++) {
        if (i >= 0 && i < currentGrid.length) {  // Check if outside minimum bounds
            for (let n = xAxis - 1; n <= xAxis + 1; n++)
            {
                if (n >= 0 && n < currentGrid[i].length) {
                    
                    if (currentGrid[i][n] == 1 && !(i == yAxis && n == xAxis)) {
                        numberAdjacent++;   // Check if currently-being-checked cell is
                                            // alive or dead. Increase adjacency if
                                            // is alive
                    }
                }
                
            }
        }
        
    }
    
    if ((numberAdjacent < 2 || numberAdjacent > 3) && isAlive == 1) {
        isAlive = 0; // Kills the cell if alive and under or overpopulated
    }
    else if ((numberAdjacent == 3) && isAlive == 0) {
        isAlive = 1; // Reproduces cell if exactly three living neighbors
    }
    
    return isAlive; // Returns true/false status of if cell is alive
}

/*
while(true) {
    //console.log(JSON.stringify(updateGrid(grid)));
    console.log('Before:');
    console.log(grid);
    grid = updateGrid(grid);
    console.log('After:');
    console.log(grid);
}*/
const X_AXIS = 12;
const Y_AXIS = 12;
const ROUNDS = 20;

let grid = defineGrid(X_AXIS,Y_AXIS);
console.log('Initial setup:');
console.log(grid);

for (let r = 0; r < ROUNDS; r++) {
    console.log('Round ' + (r+1));
    grid = updateGrid(grid);
    console.log(grid);
}