export const depthFirstSearch = (maze, speed) => {
  const stack = [];
  let init = Math.floor(Math.random() * maze.length);
  let current = maze[init];
  current.isVisited = true;
  document
    .getElementById(`square-${current.row}-${current.col}`)
    .classList.add("square-visited-depth");
  stack.push(current);
  let next = checkNeighbors(current, maze);
  window.mazeGen = setInterval(iterateDepthFirstSearch, speed);
  function iterateDepthFirstSearch() {
    if (next) {
      next.isVisited = true;
      handleColors(current, next);
      removeWalls(current, next);
      current = next;
      stack.push(current);
      next = checkNeighbors(current, maze);
    } else if (stack.length > 0) {
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.remove("square-current-depth");
      current = stack.pop();
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.add("square-current-depth");
      next = checkNeighbors(current, maze);
    } else {
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.remove("square-current-depth");
      clearInterval(window.mazeGen);
    }
  }
};

export const randomizedPrims = (maze, speed) => {
  const walls = [];
  let init = Math.floor(Math.random() * maze.length);
  let current = maze[init];
  let last = current;
  current.isVisited = true;
  document
    .getElementById(`square-${current.row}-${current.col}`)
    .classList.add("square-visited-prims");
  document
    .getElementById(`square-${current.row}-${current.col}`)
    .classList.add("square-current-prims");
  findWalls(current, walls, maze);
  window.mazeGen = setInterval(iterateRandomPrims, speed);
  function iterateRandomPrims() {
    if (walls.length > 0) {
      let random = Math.floor(Math.random() * walls.length);
      let next = walls[random];
      let current = checkWall(next, maze);
      if (current) {
        removeWalls(current, next);
        findWalls(next, walls, maze);
        next.isVisited = true;
        document
          .getElementById(`square-${next.row}-${next.col}`)
          .classList.add("square-visited-prims");
        document
          .getElementById(`square-${next.row}-${next.col}`)
          .classList.add("square-current-prims");
        document
          .getElementById(`square-${last.row}-${last.col}`)
          .classList.remove("square-current-prims");
        last = next;
      } else {
        // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-top");
        // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-bottom");
        // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-right");
        // document.getElementById(`square-${next.row}-${next.col}`).classList.remove("wall-left");
      }
      walls.splice(random, 1);
    } else {
      document
        .getElementById(`square-${last.row}-${last.col}`)
        .classList.remove("square-current-prims");
      clearInterval(window.mazeGen);
    }
  }
};

export const binaryTree = (maze, speed) => {
  let index = 0;
  let current = maze[index];
  current.isVisited = true;
  document
    .getElementById(`square-${current.row}-${current.col}`)
    .classList.add("square-visited-binary");
  document
    .getElementById(`square-${current.row}-${current.col}`)
    .classList.add("square-current-binary");
  window.mazeGen = setInterval(iterateBinaryTree, speed);
  function iterateBinaryTree() {
    if (index < maze.length - 1) {
      let next = checkDirections(current, maze);
      document
        .getElementById(`square-${next.row}-${next.col}`)
        .classList.add("square-visited-binary");
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.remove("square-current-binary");
      removeWalls(current, next);
      index++;
      current = maze[index];
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.add("square-current-binary");
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.add("square-visited-binary");
    } else {
      document
        .getElementById(`square-${current.row}-${current.col}`)
        .classList.remove("square-current-binary");
      clearInterval(window.mazeGen);
    }
  }
};

function handleColors(current, next) {
  document
    .getElementById(`square-${next.row}-${next.col}`)
    .classList.add("square-visited-depth");
  document
    .getElementById(`square-${next.row}-${next.col}`)
    .classList.add("square-current-depth");
  document
    .getElementById(`square-${current.row}-${current.col}`)
    .classList.remove("square-current-depth");
}

function checkNeighbors(current, maze) {
  let neighbors = [];

  let top = maze[index(current.row - 1, current.col)];
  let right = maze[index(current.row, current.col + 1)];
  let bottom = maze[index(current.row + 1, current.col)];
  let left = maze[index(current.row, current.col - 1)];

  if (top && !top.isVisited) {
    neighbors.push(top);
  }
  if (right && !right.isVisited) {
    neighbors.push(right);
  }
  if (bottom && !bottom.isVisited) {
    neighbors.push(bottom);
  }
  if (left && !left.isVisited) {
    neighbors.push(left);
  }

  if (neighbors.length > 0) {
    let random = Math.floor(Math.random() * neighbors.length);
    return neighbors[random];
  } else {
    return undefined;
  }
}

function index(row, col) {
  const cols = 40; //Make sure to change this if size changes
  const rows = 20;

  if (row < 0 || col < 0 || col > cols - 1 || row > rows - 1) {
    return -1;
  }
  return col + row * cols;
}

function removeWalls(current, next) {
  let x = current.col - next.col;
  if (x === 1) {
    document
      .getElementById(`square-${current.row}-${current.col}`)
      .classList.remove("wall-left");
    document
      .getElementById(`square-${next.row}-${next.col}`)
      .classList.remove("wall-right");
  } else if (x === -1) {
    document
      .getElementById(`square-${current.row}-${current.col}`)
      .classList.remove("wall-right");
    document
      .getElementById(`square-${next.row}-${next.col}`)
      .classList.remove("wall-left");
  }

  let y = current.row - next.row;
  if (y === 1) {
    document
      .getElementById(`square-${current.row}-${current.col}`)
      .classList.remove("wall-top");
    document
      .getElementById(`square-${next.row}-${next.col}`)
      .classList.remove("wall-bottom");
  } else if (y === -1) {
    document
      .getElementById(`square-${current.row}-${current.col}`)
      .classList.remove("wall-bottom");
    document
      .getElementById(`square-${next.row}-${next.col}`)
      .classList.remove("wall-top");
  }
}

function findWalls(current, walls, maze) {
  let top = maze[index(current.row - 1, current.col)];
  let right = maze[index(current.row, current.col + 1)];
  let bottom = maze[index(current.row + 1, current.col)];
  let left = maze[index(current.row, current.col - 1)];

  if (top && !top.isVisited) {
    walls.push(top);
  }
  if (right && !right.isVisited) {
    walls.push(right);
  }
  if (bottom && !bottom.isVisited) {
    walls.push(bottom);
  }
  if (left && !left.isVisited) {
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

  if (top && top.isVisited) {
    connectedCount++;
    topMaze = true;
  }
  if (right && right.isVisited) {
    connectedCount++;
    rightMaze = true;
  }
  if (bottom && bottom.isVisited) {
    connectedCount++;
    bottomMaze = true;
  }
  if (left && left.isVisited) {
    connectedCount++;
    leftMaze = true;
  }

  if (connectedCount > 1) {
    return undefined;
  }

  if (topMaze) {
    return top;
  }
  if (rightMaze) {
    return right;
  }
  if (bottomMaze) {
    return bottom;
  }
  if (leftMaze) {
    return left;
  }

  return undefined;
}

function checkDirections(current, maze) {
  let right = maze[index(current.row, current.col + 1)];
  let bottom = maze[index(current.row + 1, current.col)];

  if (!right) {
    return bottom;
  }
  if (!bottom) {
    return right;
  }
  let rand = Math.floor(Math.random() * 2);
  if (rand === 0) {
    return bottom;
  }
  return right;
}

export const stopMaze = () => {
  clearInterval(window.mazeGen);
};
