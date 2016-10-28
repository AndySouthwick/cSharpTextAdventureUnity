#pragma strict
import UnityEngine.UI;  //We can use these special lines at the top to import more code from pre-built libraries giving us more functionality.

public var textObject : UI.Text;  //By default every variable is set to private.  In this case we want this variable publicly visible so we can easily use it within Unity.
public enum States {intro, roll, cott, window, search, lock, click, push, left, right, fail, win};  //An enum is a special type of variable that allows us to name each number with a name. (instead of it just being a number).
public var myState : States;  //Think of this as the parent variable that we use, with the enum value held inside.  (myState.intro)
public var holdingKey = false;
public var doorLocked = true;
public var holdingDie = false;
public var dieValue = Random.Range (1,7);
public var titleObject : UI.Text;

function Start () {  //The start function runs once, the first time this object loads.
    myState = States.intro;  //We want to make sure the myState gets assigned to .intro
}

function Update () {
    print (myState);  //This will display the myState value within the console.  This might be helpful if there is a problem and the text doesn't get properly updated on the normal screen.
    if (myState == States.intro) 					{state_intro ();}
    else if (myState == States.roll)                {state_roll ();}
    else if (myState == States.cott) 				{state_cott ();}
    else if (myState == States.window)				{state_window ();}
    else if (myState == States.search)              {state_search ();}
    else if (myState == States.lock)				{state_lock ();}
    else if (myState == States.click)               {state_click ();}
    else if (myState == States.push)                {state_push();}
    else if (myState == States.left)                {state_left();}
    else if (myState == States.right)               {state_right();}
    else if (myState == States.fail)                {state_fail();}
    else if (myState == States.win)                 {state_win();}
}

function state_intro(){
   titleObject.text = "Prison Cell";
   
    if (holdingDie == false) {textObject.text = "You awake in a prison cell. \n" +
        "There is an uncomfortable cott with ominous stains. \n" +
        "There is a window with a view outside. \n" +
        "There is a door with a lock. \n" +
        "\n\n" +
        "Press C to look at the Cott, W to look out the Window, L to look at the Lock.";
    if (Input.GetKeyDown (KeyCode.C)) 					{myState = States.cott;}
    if (Input.GetKeyDown (KeyCode.W)) 					{myState = States.window;}
    if (Input.GetKeyDown (KeyCode.L)) 					{myState = States.lock;}
    }
    else if (holdingDie == true) {textObject.text =  "You awake in a prison cell. \n" +
        "There is an uncomfortable cott with ominous stains. \n" +
        "There is a window with a view outside. \n" +
        "There is a door with a lock. \n" +
        "You're now holding a die. \n" +
        "\n\n" +
        "Press C to look at the Cott, W to look out the Window, L to look at the Lock, or R to roll your die.";
    if (Input.GetKeyDown (KeyCode.C)) 					{myState = States.cott;}
    if (Input.GetKeyDown (KeyCode.W)) 					{myState = States.window;}
    if (Input.GetKeyDown (KeyCode.L)) 					{myState = States.lock;}
    if (Input.GetKeyDown (KeyCode.R))                   {myState = States.roll;}
}
}

function state_roll() {
    titleObject.text = "Rolling the die!";
    textObject.text = "You roll the die. It lands on " + dieValue + ". \n" +
    "Roll again?" +
    "\n \n" +
    "Press R to roll again, C to look at the Cell.";
    if (Input.GetKeyDown (KeyCode.C))                   {myState = States.intro;}
    if (Input.GetKeyDown (KeyCode.R))                   {dieValue = Random.Range (1,7);
                                                        myState = States.roll;}
}

function state_cott(){
    titleObject.text = "Cott";
    if (holdingKey == false) {textObject.text = "The cott looks uncomfortable to sleep on, \n" +
    "with slim blankets that would hardly keep you warm. \n" +
    "Upon closer inspection, the stains look even more ominous. \n" +
    "Trying to look away from the stains, you notice the glint of metal beneath the cott. \n" +
    "There is a window with a view outside. \n" +
    "There is a door with a lock. \n" +
    "\n\n" +
    "Press C to look at the Cell, S to Search under the cott, W to look out the Window, L to look at the Lock.";
    if (Input.GetKeyDown (KeyCode.C)) 					{myState = States.intro;}
    if (Input.GetKeyDown (KeyCode.W)) 					{myState = States.window;}
    if (Input.GetKeyDown (KeyCode.L)) 					{myState = States.lock;}
    if (Input.GetKeyDown (KeyCode.S))                   {myState = States.search;}
    }
    else if (holdingKey == true) {textObject.text = "The cott looks uncomfortable to sleep on, \n" +
    "with slim blankets that would hardly keep you warm. \n" +
    "Upon closer inspection, the stains look even more ominous. \n" +
    //"Trying to look away from the stains, you notice the glint of metal beneath the cott. \n" +
    "There is a window with a view outside. \n" +
    "There is a door with a lock. \n" +
    "\n\n" +
    "Press C to look at the Cell, W to look out the Window, L to look at the Lock.";
    if (Input.GetKeyDown (KeyCode.C)) 					{myState = States.intro;}
    if (Input.GetKeyDown (KeyCode.W)) 					{myState = States.window;}
    if (Input.GetKeyDown (KeyCode.L)) 					{myState = States.lock;}
}
}

function state_window(){
    titleObject.text = "Window";
    textObject.text = "You look out the window to see only ocean. \n" +
        "In fact the whole horizon looks like it's tilting. \n" +
        "There's a six-sided die sitting beneath the window. Better take it with you. \n" +
        "Maybe you are on a ship? \n" +
        "There is a door with a lock. \n" +
        "\n\n" +
        "Press C to look at the Cell, L to look at the Lock.";
        holdingDie = true;
    if (Input.GetKeyDown (KeyCode.C)) 					{myState = States.intro;}
    if (Input.GetKeyDown (KeyCode.L)) 					{myState = States.lock;}
}

function state_search(){
    titleObject.text = "";
    textObject.text = "A quick look beneath the cott nets you a shiny small key. Right on! \n" + 
    "\n \n" +
    "Press C to look at the Cell, W to look out the Window, V to look at the Cott, or L to look at the lock.";
    holdingKey = true;
    if (Input.GetKeyDown (KeyCode.C))                   {myState = States.intro;}
    if (Input.GetKeyDown (KeyCode.L))                   {myState = States.lock;}
    if (Input.GetKeyDown (KeyCode.W))                   {myState = States.window;}
    if (Input.GetKeyDown (KeyCode.V))                   {myState = States.cott;}
}

function state_lock(){
    titleObject.text = "The Door";
    if (holdingKey == false) {textObject.text = "The door and lock look sturdy. \n" + 
    "You might embarrass yourself, but perhaps you can push the door open?" +
    "\n\n" +
    "Press C to look at the Cell, P to push the door.";
    if (Input.GetKeyDown (KeyCode.C))                   {myState = States.intro;}
    if (Input.GetKeyDown (KeyCode.P))                   {myState = States.push;}
    }
    else if (holdingKey == true) {textObject.text = "The door and lock look sturdy. \n" +
"Maybe that key you found will fit the lock? \n" +
"\n \n" +
"Press U to unlock the lock.";
if (Input.GetKeyDown (KeyCode.U)) {                      {myState = States.click;}
}
}
}

function state_click(){
    titleObject.text = "";
    textObject.text = "Click! \n" +
    "The door is unlocked! Hooray!" +
    "\n \n" +
    "Press L to look at the door.";
    doorLocked = false;
    holdingKey = false;
    if (Input.GetKeyDown (KeyCode.L))                   {myState = States.lock;}
}

function state_push(){
    titleObject.text = "Hallway";
    if (doorLocked == false) {textObject.text = "With a screech of metal, the door gives way. \n" +
    "You're now in a hallway lined with multiple cell doors just like yours. \n" + 
    "Will you go left or right?" +
    "\n\n" +
    "Press L to go left, R to go right.";
    if (Input.GetKeyDown (KeyCode.L))                   {myState = States.left;}
    if (Input.GetKeyDown (KeyCode.R))                   {myState = States.right;}
    }
    else if (doorLocked == true) {textObject.text = "As expected, you strained and struggled against the door and embarrassed yourself. \n" +
"Maybe you should Search for another way?" +
"\n \n" +
"Press C to look at the Cell.";
if (Input.GetKeyDown (KeyCode.C))                       {myState = States.intro;}
}
}

function state_left(){
    titleObject.text = "";
    textObject.text = "You turn left down the hall. Uh oh! There's a guard!" +
    "\n\n" +
    "Press F to flee!";
    if (Input.GetKeyDown (KeyCode.F))                   {myState = States.fail;}
}

function state_right(){
    titleObject.text = "The (Other) Door";
    textObject.text = "You turn right down the hall. \n" +
    "You find another door, this one already unlocked. \n" +
    "Open it?" +
    "\n\n" +
    "Press O to open the door. (Not zero.)";
    if (Input.GetKeyDown (KeyCode.O))                   {myState = States.win;}
}

function state_fail(){
    titleObject.text = "<color=red>Death</color>";
    textObject.text = "You died. Sorry! \n" +
    "Restart? \n" +
    "\n\n" +
    "Press R to restart.";
    if (Input.GetKeyDown (KeyCode.R))                   {myState = States.intro;}
}

function state_win(){
    titleObject.text = "<color=green>Victory!</color>";
    textObject.text = "You escaped the prison! Congratulations! \n" +
    "Restart? \n" +
    "\n\n" +
    "Press R to restart.";
    if (Input.GetKeyDown (KeyCode.R))                   {myState = States.intro;}
}