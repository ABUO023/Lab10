// Q2: Single handler with capture/bubbling phase comparison

var useCapture = false;

function addHandlers() {
    // Get all elements on page
    var allElements = document.getElementsByTagName('*');
    
    // Add SINGLE handler to all elements (uses useCapture flag)
    for ( var i=0; i<allElements.length; i++ ) {
	allElements[i].addEventListener( 'mouseover', handleMouseEvent, useCapture );
	allElements[i].addEventListener( 'mouseout', handleMouseEvent, useCapture );
    }
    
    logPhaseInfo();
}

function handleMouseEvent( e ) {
    // Single handler processes both mouseover and mouseout
    if ( e.currentTarget == e.target ) {
	if ( e.type === 'mouseover' ) {
	    e.target.style.backgroundColor = '#EDEDED';
	} else if ( e.type === 'mouseout' ) {
	    e.target.style.backgroundColor = '';
	}
	e.stopPropagation();
    }
}

function togglePhase() {
    useCapture = !useCapture;
    
    // Remove old listeners
    var allElements = document.getElementsByTagName('*');
    for ( var i=0; i<allElements.length; i++ ) {
	allElements[i].removeEventListener( 'mouseover', handleMouseEvent, !useCapture );
	allElements[i].removeEventListener( 'mouseout', handleMouseEvent, !useCapture );
    }
    
    // Add new listeners with opposite phase
    for ( var i=0; i<allElements.length; i++ ) {
	allElements[i].addEventListener( 'mouseover', handleMouseEvent, useCapture );
	allElements[i].addEventListener( 'mouseout', handleMouseEvent, useCapture );
    }
    
    logPhaseInfo();
}

function logPhaseInfo() {
    var phaseText = useCapture ? 'CAPTURE' : 'BUBBLING';
    console.log('=== Phase switched to: ' + phaseText + ' ===');
    console.log('Current phase: ' + phaseText);
    console.log('Note: For mouseover/mouseout on interactive elements, BUBBLING is more favorable.');
}

addEventListener( 'load', addHandlers, false );

