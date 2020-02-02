var signupForm = document.getElementById('signup-form');
var email = document.getElementById('email');
var interest = document.getElementById('interest');
var submitButton = document.getElementById('submit-button');
var formWrapper = document.getElementById('form-wrapper');
var successMessage = document.getElementById('success-message');

email.addEventListener('keyup', validateEmailField);
interest.addEventListener('change', validateInterestField);

signupForm.addEventListener('submit', function processForm(e) {
  e.preventDefault();

  if (validateEmailField() || validateInterestField()) {
    var previousInnerHTML = submitButton.innerHTML;
    submitButton.innerHTML = 'submitting...';
    setTimeout(() => {
      submitButton.innerHTML = previousInnerHTML;
      formWrapper.classList.add('d-hide');
      successMessage.classList.remove('d-hide');
    }, 2000);
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

function addErrorMessage(errorMessage, eleement) {
  eleement.innerHTML = errorMessage;
  eleement.classList.add('error-message');
}

function removeErrorMessage(eleement) {
  eleement.classList.remove('error-message');
  eleement.innerHTML = '';
}
