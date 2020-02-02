var signupForm = document.getElementById('signup-form');
var email = document.getElementById('email');
var interest = document.getElementById('interest');
var APPLICATION_SUBMITTED = 'application_submitted';

email.addEventListener('keyup', validateEmailField);
interest.addEventListener('change', validateInterestField);

signupForm.addEventListener('submit', function processForm(e) {
  e.preventDefault();

  if (localStorage.getItem(APPLICATION_SUBMITTED)) {
    window.alert('You can only submit an application once!')
  } else if (validateEmailField() || validateInterestField()) {
    submitApplication(APPLICATION_SUBMITTED);
  }
});

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

function addErrorMessage(errorMessage, element) {
  element.innerHTML = errorMessage;
  element.classList.add('error-message');
}

function removeErrorMessage(element) {
  element.classList.remove('error-message');
  element.innerHTML = '';
}

function submitApplication(APPLICATION_SUBMITTED) {
  var submitButton = document.getElementById('submit-button');
  var formWrapper = document.getElementById('form-wrapper');
  var successMessage = document.getElementById('success-message');

  var previousInnerHTML = submitButton.innerHTML;
  submitButton.innerHTML = 'submitting...';

  setTimeout(() => {
    submitButton.innerHTML = previousInnerHTML;
    formWrapper.classList.add('d-hide');
    successMessage.classList.remove('d-hide');
    localStorage.setItem(APPLICATION_SUBMITTED, true);
  }, 2000);
}
