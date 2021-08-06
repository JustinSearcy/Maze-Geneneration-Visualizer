

export const depthFirstSearch = maze => {
    const stack = [];
    let current = maze[0];
    current.isVisited = true;
    document.getElementById(`square-${current.row}-${current.col}`).classList.add("square-visited");
    stack.push(current)
    let next = checkNeighbors(current, maze);
    let nextCheck = setInterval(iterateDepthFirstSearch, 35);
        function iterateDepthFirstSearch(){
            if(next){
                next.isVisited = true;
                handleColors(current, next);
                removeWalls(current, next);
                current = next;
                stack.push(current);
                next = checkNeighbors(current, maze);
            }
            else if (stack.length > 0){
                document.getElementById(`square-${current.row}-${current.col}`).classList.remove("square-current");
                current = stack.pop();
                document.getElementById(`square-${current.row}-${current.col}`).classList.add("square-current");
                next = checkNeighbors(current, maze);
                
            }
            else {
                document.getElementById(`square-${current.row}-${current.col}`).classList.remove("square-current");
                clearInterval(nextCheck);
            }
        }
}

export const randomizedPrims = maze => {
    const walls = [];
    let current = maze[0];
    let last = current;
    current.isVisited = true;
    document.getElementById(`square-${current.row}-${current.col}`).classList.add("square-visited");
    document.getElementById(`square-${current.row}-${current.col}`).classList.add("square-current");
    findWalls(current, walls, maze);
    let wallsCheck = setInterval(iterateDepthFirstSearch, 35);
        function iterateDepthFirstSearch(){
            if(walls.length > 0){
                let random = Math.floor(Math.random() * walls.length);
                let next = walls[random];
                let current = checkWall(next, maze)
                if(current){
                    removeWalls(current, next);
                    findWalls(next, walls, maze);
                    next.isVisited = true;
                    document.getElementById(`square-${next.row}-${next.col}`).classList.add("square-visited");
                    document.getElementById(`square-${next.row}-${next.col}`).classList.add("square-current");
                    document.getElementById(`square-${last.row}-${last.col}`).classList.remove("square-current");
                    last = next;
                }
                else{
                    // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-top");
                    // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-bottom");
                    // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-right");
                    // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-left");
                }
                walls.splice(random, 1);
                console.log(walls);
            }
            else {
                document.getElementById(`square-${last.row}-${last.col}`).classList.remove("square-current");
                clearInterval(wallsCheck);
            }
        }
}

function handleColors(current, next) {
    document.getElementById(`square-${next.row}-${next.col}`).classList.add("square-visited");
    document.getElementById(`square-${next.row}-${next.col}`).classList.add("square-current");
    document.getElementById(`square-${current.row}-${current.col}`).classList.remove("square-current");
}

function checkNeighbors(current, maze) {
    let neighbors = [];

    let top = maze[index(current.row - 1, current.col)];
    let right = maze[index(current.row, current.col + 1)];
    let bottom = maze[index(current.row + 1, current.col)];
    let left = maze[index(current.row, current.col - 1)];

    if(top && !top.isVisited){
        neighbors.push(top);
    }
    if(right && !right.isVisited){
        neighbors.push(right);
    }
    if(bottom && !bottom.isVisited){
        neighbors.push(bottom);
    }
    if(left && !left.isVisited){
        neighbors.push(left);
    }

    if(neighbors.length > 0) {
        let random = Math.floor(Math.random() * neighbors.length);
        return neighbors[random];
    } else {
        return undefined;
    }
}

function index(row, col) {
    const cols = 40; //Make sure to change this if size changes
    const rows = 20;

    if(row < 0 || col < 0 || col > cols - 1 || row > rows - 1){
        return -1;
    }
    return (col + (row * cols));
}

function removeWalls(current, next){
    let x = current.col - next.col;
    if(x === 1){
        document.getElementById(`square-${current.row}-${current.col}`).classList.remove("wall-left");
        document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-right");
    } else if (x === -1) {
        document.getElementById(`square-${current.row}-${current.col}`).classList.remove("wall-right");
        document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-left");
    }

    let y = current.row - next.row;
    if(y === 1){
        document.getElementById(`square-${current.row}-${current.col}`).classList.remove("wall-top");
        document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-bottom");
    } else if (y === -1) {
        document.getElementById(`square-${current.row}-${current.col}`).classList.remove("wall-bottom");
        document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-top");
    }
}

function findWalls(current, walls, maze){
    let top = maze[index(current.row - 1, current.col)];
    let right = maze[index(current.row, current.col + 1)];
    let bottom = maze[index(current.row + 1, current.col)];
    let left = maze[index(current.row, current.col - 1)];

    if(top && !top.isVisited){
        walls.push(top);
    }
    if(right && !right.isVisited){
        walls.push(right);
    }
    if(bottom && !bottom.isVisited){
        walls.push(bottom);
    }
    if(left && !left.isVisited){
        walls.push(left);
    }
}

function checkWall(next, maze) {
    let top = maze[index(next.row - 1, next.col)];
    let right = maze[index(next.row, next.col + 1)];
    let bottom = maze[index(next.row + 1, next.col)];
    let left = maze[index(next.row, next.col - 1)];

    let topMaze = false;
    let rightMaze = false;
    let bottomMaze = false;
    let leftMaze = false;

    let connectedCount = 0;

    if(top && top.isVisited){
        connectedCount++;
        topMaze = true;
    }
    if(right && right.isVisited){
        connectedCount++;
        rightMaze = true;
    }
    if(bottom && bottom.isVisited){
        connectedCount++;
        bottomMaze = true;
    }
    if(left && left.isVisited){
        connectedCount++;
        leftMaze = true;
    }

    if(connectedCount > 1){
        return undefined;
    }

    if(topMaze){
        return top;
    }
    if(rightMaze){
        return right;
    }
    if(bottomMaze){
        return bottom;
    }
    if(leftMaze){
        return left;
    }

    return undefined;
}