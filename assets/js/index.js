var signupForm = document.getElementById('signup-form');
var email = document.getElementById('email');
var interest = document.getElementById('interest');
var SAVED_APPLICANTS = 'saved_applicants';

// validate input change
email.addEventListener('keyup', validateEmailField);
interest.addEventListener('change', validateInterestField);

// validation on form submission
signupForm.addEventListener('submit', function processForm(e) {
  e.preventDefault();

  if (validateEmailField() && validateInterestField()) {
    var emailValue = document.getElementById('email').value || '';
    submitApplication(emailValue);
  }
});

/**
 * validates email field
 *
 * @returns Boolean
 */
function validateEmailField() {
  var emailValue = document.getElementById('email').value || '';
  var emailMessageElement = document.getElementById('email-message');

  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  if (emailValue.trim().match(emailFormat)) {
    removeErrorMessage(emailMessageElement);
    return true
  } else {
    addErrorMessage('Please enter a valid email address.', emailMessageElement);
    return false
  }
}

/**
 * validates interest field
 *
 * @returns Boolean
 */
function validateInterestField() {
  var interestValue = document.getElementById('interest').value || '';
  var interestMessageElement = document.getElementById('interest-message');

  if (interestValue.trim().length) {
    removeErrorMessage(interestMessageElement);
    return true
  } else {
    addErrorMessage('Please select an interest.', interestMessageElement);
    return false
  }
}

/**
 * adds error message and error-message class to element
 *
 * @param {String} errorMessage
 * @param {DOMElement} element
 */
function addErrorMessage(errorMessage, element) {
  element.innerHTML = errorMessage;
  element.classList.add('error-message');
}


/**
 * removes error message and error-message class from element
 *
 * @param {DOMElement} element
 */
function removeErrorMessage(element) {
  element.classList.remove('error-message');
  element.innerHTML = '';
}

/**
 * submits the application
 *
 * @param {String} APPLICATION_SUBMITTED
 */
function submitApplication(emailValue) {
  if (checkIfApplicantDoesNotExist(emailValue)) {
    var submitButton = document.getElementById('submit-button');
    var formWrapper = document.getElementById('form-wrapper');
    var successMessage = document.getElementById('success-message');

    var previousInnerHTML = submitButton.innerHTML;
    submitButton.innerHTML = 'submitting...';

    setTimeout(() => {
      submitButton.innerHTML = previousInnerHTML;
      formWrapper.classList.add('d-hide');
      successMessage.classList.remove('d-hide');
      saveApplicant(emailValue);
    }, 2000);
  } else {
    window.alert('You can only submit an application once!');
  }
}

/**
 * gets saved applicants from localStorage
 *
 * @returns Array
 */
function getSavedApplicants() {
  if (localStorage.getItem(SAVED_APPLICANTS)) {
    return JSON.parse(localStorage.getItem(SAVED_APPLICANTS));
  } else {
    return [];
  }
}

/**
 * saves an appplicant email into localStorage SAVED_APPLICANTS
 *
 * @param {String} applicantEmail
 */
function saveApplicant(applicantEmail) {
  var savedApplicants = getSavedApplicants();
  savedApplicants.push(applicantEmail);
  localStorage.setItem(SAVED_APPLICANTS, JSON.stringify(savedApplicants));
}

/**
 * checks if applicant email does not exists in the saved applicants array and return true or false
 *
 * @param {String} applicantEmail
 * @returns Boolean
 */
function checkIfApplicantDoesNotExist(applicantEmail) {
  var savedApplicants = getSavedApplicants();
  var applicantDoesNotExists = (savedApplicants.indexOf(applicantEmail) === -1);
  return applicantDoesNotExists;
}
