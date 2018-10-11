/**
a simple two dimensional maze game. javascript/node.js 
**/

//defining global vars
var styles=["bottom","right","left", "bottom"]; //you can change the level difficulty by changing the styles 
var head=false;// a global var for head and tail to let us know if head or tail was already set, as we need this to happen randomly
var tail=false;
var route=[];

//global functions
var rand  = function(t){
  return Math.floor((Math.random() * t));
}

class Maze {
  //1. creates a random maze given width and height of the board and displays it. we have a default value
  constructor(row=0, col=0, head=0, tail=0) {
    this.row = row;
    this.col = col;
    this.rows = [];
    this.head = head; //the start point to the maze
    this.tail = tail; //the exit point from a maze
    this.getMazeHtml();
  //  this.drawMaze();
  }
  //3. shows the shortest route between starting point and destination 
  drawMaze(){
    for(let i=0; i < this.row; i++){
      this.rows = new Row(i);
    }

  }

  drawRoute(){
  }

  getMazeHtml() {
    let table = document.getElementById("maze");
    if(!table){
      table = document.createElement("table");
      table.id = "maze";
      document.body.appendChild(table); 
    }
    return table;
  }
};

class Row {
  constructor(row=0) {
    this.row = row;
    this.cells = [];
    this.getRowHtml();
    this.createCells();
  }
  getRowHtml() {
    let row = document.getElementById("row_"+this.row.toString());
    if(!row){
      row = document.createElement("tr");
      row.id = "row_"+this.row.toString();
      maze.getMazeHtml().appendChild(row);
    }
    return row;
  }
  createCells(){
    for(let c=0; c < maze.col; c++){
      let cell = new Cell(this.row, c);
      this.cells.push(cell);
      this.getRowHtml().appendChild(cell.getCellHtml());
    }
  }
};

class Cell {
  constructor(row=0,col=0) {
    this.row = row;
    this.col = col;
    this.position = [row,col];
    this.style = styles[rand(styles.length)];
  }

  getCellHtml() {
    let cell = document.getElementById("cell_"+this.position.join("."));
    if(!cell){
      cell = document.createElement("td");
      cell.id = "cell_"+this.position.join(".");
      cell.className = this.style;
    }
    return cell;
  }
};

//var maze = new Maze(32,50);
//maze.drawMaze();
