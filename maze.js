/**
a simple two dimensional maze game. javascript/node.js 
**/

//defining global vars
var styles=["bottom","right","left", "bottom"]; //you can change the level difficulty by changing the styles 
var colors=["red","green","orange", "gray", "purple", "blue", "yellow"]; 

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
    this.route = [];
    this.head = head; //the start point to the maze
    this.tail = tail; //the exit point from a maze
    this.html();
  //  this.drawMaze();
  }
  //3. shows the shortest route between starting point and destination 
  drawMaze(){
    for(let r=0; r < this.row; r++){
      this.rows[r] = new Row(r);
    }
    this.pickHeadTail(); //now pick head and tail, also insert the head and tail to the route array
    this.drawRoute(); //work to detect success path, this can be done in different ways
  }
  drawRoute(){

  }

  html(name) {
    let table = document.getElementById("maze");
    if(!table){
      table = document.createElement("table");
      table.id = "maze";
      if(document && document.body){
       document.body.appendChild(table); 
      }
      else{
       alert("Make sure to run maze.js inside an html page, with a present body tag");
      }
    }
    return table;
  }

  pickHeadTail(){
    this.head  = this.rows[0].cells[rand(this.col)];
    this.head.html("head");
    this.head = this.head.position;
    this.tail =  this.rows[this.row-1].cells[rand(this.col)];
    this.tail.html("tail");
    this.tail = this.tail.position;
    this.route.push(head);
    this.route.push(tail);
  }
};

class Row {
  constructor(row=0) {
    this.row = row;
    this.cells = [];
    this.route = [];
    this.html();
    this.createCells();
  //  this.headAndTail();
  }

  html() {
    let row = document.getElementById("row_"+this.row.toString());
    if(!row){
      row = document.createElement("tr");
      row.id = "row_"+this.row.toString();
      maze.html().appendChild(row);
    }
    return row;
  }

  createCells(){
    //we want our head/start cell to be in 0 row, but a random cell

    for(let c=0; c < maze.col; c++){
      let cell = new Cell(this.row, c);
      this.cells.push(cell);
      this.html().appendChild(cell.html());
    }

  }

};

class Cell {
  constructor(row=0,col=0) {
    this.row = row;
    this.col = col;
    this.position = {row,col};
    this.style = styles[rand(styles.length)];
  }

  html(style) {
    let cell = document.getElementById("cell_"+this.position.row+"."+this.position.col );
    if(!cell){
      cell = document.createElement("td");
      cell.id = "cell_"+this.position.row+"."+this.position.col;
      if(!style){
        cell.className =  this.style;
      }
      else {
        cell.className = cell.className + " " + style;
      }
    }
    if(style){
      cell.className = cell.className + " " + style;
    }
    return cell;
  }
};
var maze = new Maze(6,6);
maze.drawMaze();
