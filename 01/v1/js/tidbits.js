// Q1: Highlight ALL elements on mouseover using target phase ONLY

// Store original background color for each element
var originalBackgrounds = {};

function addHandlers() {
    // Add event listeners to ALL elements in the document
    var allElements = document.getElementsByTagName('*');
    
    for ( var i=0; i<allElements.length; i++ ) {
	// Store original background color
	originalBackgrounds[i] = window.getComputedStyle(allElements[i]).backgroundColor;
	
	// Add listeners - false = target/bubbling phase ONLY
	allElements[i].addEventListener( 'mouseover', highlightElement, false );
	allElements[i].addEventListener( 'mouseout', resetElement, false );
    }
}

function highlightElement( e ) {
    // Only process if this is the actual target (target phase)
    if ( e.currentTarget == e.target ) {
	// Highlight with light gray background
	e.target.style.backgroundColor = '#EDEDED';
	e.stopPropagation();
    }
}

function resetElement( e ) {
    // Only process if this is the actual target (target phase)
    if ( e.currentTarget == e.target ) {
	// Reset to original background color
	e.target.style.backgroundColor = '';
	e.stopPropagation();
    }
}
