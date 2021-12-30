/*******
This script is designed to utilize a 300 pixels/inch photoshop file that measures 600px x 600px
to create a new file with 24 copies of the design for use in printing them on an 8.5" x 11" piece of paper
which can then be used to make pinback buttons.

A unique serial number is printed on each pin.  File must have a layer named "sn" with text 0 entered with type tool
*******/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

//set variable to refer to opened 600px x 600px design file...
var orig_img = app.activeDocument;

//select and coppy circle from design file...
SelectCircle(56,56,544,544,0); 
app.activeDocument.selection.copy(true);

//create print sheet where we will paste 24 coppies of the pin design...
var newDocRef = app.documents.add("2250px", "3075px", 300, "New Doc", NewDocumentMode.CMYK, DocumentFill.TRANSPARENT, 1);

//create an array of objects for placement of each pin on the print sheet...
var pasteCoordinates = [
	//row 1...
    { top : 1, left : 1, bottom : 490, right : 490 },
	{ top : 1, left : 580, bottom : 490, right : 1068 },
    { top : 1, left : 1180, bottom : 490, right : 1668 },
    { top : 1, left : 1770, bottom : 490, right : 2258 },
    //row 2...
    { top : 515, left : 1, bottom : 1003, right : 490 },
    { top : 515, left : 580, bottom : 1003, right : 1068 },
    { top : 515, left : 1180, bottom : 1003, right : 1668 },
    { top : 515, left : 1770, bottom : 1003, right : 2258 },
    //row 3...
    { top : 1025, left : 1, bottom : 1513, right : 490 },
    { top : 1025, left : 580, bottom : 1513, right : 1068 },
    { top : 1025, left : 1180, bottom : 1513, right : 1668 },
    { top : 1025, left : 1770, bottom : 1513, right : 2258 },
    //row 4...
    { top : 1550, left : 1, bottom : 2038, right : 490 },
    { top : 1550, left : 580, bottom : 2038, right : 1068 },
    { top : 1550, left : 1180, bottom : 2038, right : 1668 },
    { top : 1550, left : 1770, bottom : 2038, right : 2258 },
    //row 5...
    { top : 2065, left : 1, bottom : 2553, right : 490 },
    { top : 2065, left : 580, bottom : 2553, right : 1068 },
    { top : 2065, left : 1180, bottom : 2553, right : 1668 },
    { top : 2065, left : 1770, bottom : 2553, right : 2258 },
    //row 6...
    { top : 2575, left : 1, bottom : 3063, right : 490 },
    { top : 2575, left : 580, bottom : 3063, right : 1068 },
    { top : 2575, left : 1180, bottom : 3063, right : 1668 },
    { top : 2575, left : 1770, bottom : 3063, right : 2258 },
    

];

var sn = 0;
var counter = 0;
for($i=0; $i < 24; $i++) {
    app.activeDocument = orig_img;
    sn = counter + 1;
    copyPaste(sn, pasteCoordinates[counter]);
    counter++;
}


function copyPaste (sn, pasteCoordinates) {
    //change serial number
    var ti = app.activeDocument.layers.getByName("sn").textItem;
    ti.contents = sn;
    app.activeDocument.selection.copy(true);
    app.activeDocument = newDocRef;
    SelectCircle(pasteCoordinates.top, pasteCoordinates.left, pasteCoordinates.bottom, pasteCoordinates.right); 
    newDocRef.paste();
}


//draws us a selection area to paste into
function SelectCircle(Top,Left,Bottom,Right,Feather) { 
  if(Feather == undefined) Feather = 0;
  var desc3 = new ActionDescriptor(); 
    var ref1 = new ActionReference(); 
    ref1.putProperty( charIDToTypeID('Chnl'), charIDToTypeID('fsel') ); 
    desc3.putReference( charIDToTypeID('null'), ref1 ); 
    var desc4 = new ActionDescriptor(); 
    desc4.putUnitDouble( charIDToTypeID('Top '), charIDToTypeID('#Pxl'), Top ); 
    desc4.putUnitDouble( charIDToTypeID('Left'), charIDToTypeID('#Pxl'), Left ); 
    desc4.putUnitDouble( charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), Bottom ); 
    desc4.putUnitDouble( charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), Right ); 
    desc3.putObject( charIDToTypeID('T   '), charIDToTypeID('Elps'), desc4 ); 
    desc3.putUnitDouble( charIDToTypeID('Fthr'), charIDToTypeID('#Pxl'), Feather );
    desc3.putBoolean( charIDToTypeID('AntA'), true ); 
    executeAction( charIDToTypeID('setd'), desc3, DialogModes.NO ); 
};

