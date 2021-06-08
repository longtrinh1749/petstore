/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");
function editorChanged(){
    var language = document.getElementById("language-selector").value;
    var editorNumber = document.getElementsByClassName("editor").length;
    var i;
    for ( i=0 ; i< editorNumber; i++){
        document.getElementsByClassName("editor")[i].style.display = "none";
        document.getElementsByClassName("alone-editor")[i].style.display = "none";
    }
    switch(language){
        case "Web Development":
            document.getElementById("html-editor").style.display = "inline-block";
            document.getElementById("css-editor").style.display = "inline-block";
            document.getElementById("js-editor").style.display = "inline-block";
            break;
        case "C": 
            document.getElementById("c-editor").style.display = "inline-block";
            break;
        case "Python":
            document.getElementById("python-editor").style.display = "inline-block";
            break;
        case "Java":
            document.getElementById("java-editor").style.display = "inline-block";
            break;
        default:
    }
}
function showConsole(){
    if ( document.getElementById("console").style.display === "block")
        document.getElementById("console").style.display = "none";
    else document.getElementById("console").style.display = "block";
}

// document.getElementById('textbox').addEventListener('keydown', function(e) {
//     if (e.key == 'Tab') {
//       e.preventDefault();
//       var start = this.selectionStart;
//       var end = this.selectionEnd;
  
//       // set textarea value to: text before caret + tab + text after caret
//       this.value = this.value.substring(0, start) +
//         "\t" + this.value.substring(end);
  
//       // put caret at right position again
//       this.selectionStart =
//         this.selectionEnd = start + 1;
//     }
//   });


  function navController(){
      if ( document.getElementById("mySidenav").style.width == "0px" ){
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("content-wrapper").style.marginLeft = "250px";
      }
      else {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("content-wrapper").style.marginLeft = "0px";
      }
  }
  function fileManagerBtnHandler(){
    if ( document.getElementById("file-manager-dropdown").style.display === "block" )
        document.getElementById("file-manager-dropdown").style.display = "none";
    else document.getElementById("file-manager-dropdown").style.display = "block";
  }

  function showPostManager(){
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("post-manager").style.display = "block";
    document.getElementById("excercise-manager").style.display = "none";
  }
  function showDashboard(){
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("post-manager").style.display = "none";
    document.getElementById("excercise-manager").style.display = "none";
  }
  function showExcerciseManager(){
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("post-manager").style.display = "none";
    document.getElementById("excercise-manager").style.display = "block";
  }