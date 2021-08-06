

export const depthFirstSearch = maze => {
    const orderTraversed = [];
    let current = maze[0];
    current.isVisited = true;
    document.getElementById(`square-${current.row}-${current.col}`).classList.add("square-visited");
    orderTraversed.push(current)
    let next = checkNeighbors(current, maze);
    let nextCheck = setInterval(iterateDepthFirstSearch, 50);
        function iterateDepthFirstSearch(){
            if(next){
                next.isVisited = true;
                document.getElementById(`square-${next.row}-${next.col}`).classList.add("square-visited");
                document.getElementById(`square-${next.row}-${next.col}`).classList.add("square-current");
                document.getElementById(`square-${current.row}-${current.col}`).classList.remove("square-current");
                removeWalls(current, next);
                current = next;
                //orderTraversed.push(current);
                next = checkNeighbors(current, maze);
            }
            else{
                document.getElementById(`square-${current.row}-${current.col}`).classList.remove("square-current");
                clearInterval(nextCheck);
            }
        }
    //return orderTraversed;
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