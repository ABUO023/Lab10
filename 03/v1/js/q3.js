// Q3: Form validation for search form

function addHandlers() {
    var form = document.forms['formEmployee'];
    
    // Add submit event listener to validate before sending to server
    form.addEventListener('submit', validateForm, false);
}

function validateForm(e) {
    var stype = document.getElementById('stype');
    var skey = document.getElementById('skey');
    
    // Remove any existing error messages
    clearErrors();
    
    var isValid = true;
    
    // 3.2: Check if an option has been selected (not the default "Choisissez une option!")
    if (stype.value === '0') {
	displayError('Vous devez choisir une option de recherche!');
	stype.focus();
	isValid = false;
	e.preventDefault();
	return false;
    }
    
    // 3.1: Check if the search field is not empty
    if (skey.value.trim() === '') {
	displayError('Le champ de recherche ne peut pas être vide!');
	skey.focus();
	isValid = false;
	e.preventDefault();
	return false;
    }
    
    // 3.3: If phone number option (value="4") is selected, validate phone format
    if (stype.value === '4') {
	if (!validatePhoneFormat(skey.value)) {
	    displayError('Format de numéro de téléphone invalide! Formats acceptés: (XXX) XXX-XXXX, XXX-XXX-XXXX ou XXXXXXXXXX');
	    skey.focus();
	    skey.select();
	    isValid = false;
	    e.preventDefault();
	    return false;
	}
    }
    
    // 3.4: If extension option (value="5") is selected, validate extension format
    if (stype.value === '5') {
	if (!validateExtensionFormat(skey.value)) {
	    displayError('Format de poste téléphonique invalide! Le poste doit être composé de 4 chiffres (ex: 1234).');
	    skey.focus();
	    skey.select();
	    isValid = false;
	    e.preventDefault();
	    return false;
	}
    }
    
    // If validation failed, don't submit
    if (!isValid) {
	e.preventDefault();
	return false;
    }
    
    // Validation passed - form can be submitted
    return true;
}

function validatePhoneFormat(phone) {
    // Accept multiple formats:
    // (613) 562-5800 or (613)562-5800
    // 613-562-5800
    // 6135625800
    var phoneRegex = /^(\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/;
    return phoneRegex.test(phone.trim());
}

function validateExtensionFormat(ext) {
    // Extension should be exactly 4 digits
    var extRegex = /^\d{4}$/;
    return extRegex.test(ext.trim());
}

function displayError(message) {
    var form = document.querySelector('.content form');
    
    // Create error message element
    var errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.color = '#C00000';
    errorDiv.style.fontWeight = 'bold';
    errorDiv.style.marginBottom = '10px';
    errorDiv.style.padding = '10px';
    errorDiv.style.backgroundColor = '#FFE0E0';
    errorDiv.style.border = '2px solid #C00000';
    errorDiv.style.borderRadius = '4px';
    errorDiv.appendChild(document.createTextNode(message));
    
    // Insert error message before the form
    form.parentNode.insertBefore(errorDiv, form);
}

function clearErrors() {
    var errorMsg = document.getElementById('error-message');
    if (errorMsg) {
	errorMsg.parentNode.removeChild(errorMsg);
    }
}

// Add event listeners when page loads
addEventListener('load', addHandlers, false);

