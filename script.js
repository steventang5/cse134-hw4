const formEmail = document.getElementById("email");
const allowedPattern = new RegExp(formEmail.getAttribute("pattern"));
const error = document.getElementById("error");
let form_errors = [];

function addFormError(field, message) {
    form_errors.push({
        field: field.id,
        message: message,
    });
}


formEmail.addEventListener("input", function() {
    const value = formEmail.value;
    if (value !== "" && !allowedPattern.test(value)) {
      formEmail.setCustomValidity("Invalid email format.");

      error.textContent = "Please enter a valid email address";
      error.style.opacity = 1;

      addFormError(commentsField, "Invalid email format.");

      setTimeout(() => {
        error.style.opacity = 0;
      }, 2000);
    } else {
      formEmail.setCustomValidity("");
    }
});

const commentsField = document.getElementById("comments");
const charCountSpan = document.getElementById("charCount");
const maxChars = 1000; 
const warningThreshold = 50; 

commentsField.addEventListener("input", function(){
  const currentLength = commentsField.value.length;
  const remaining = maxChars - currentLength;
  
  charCountSpan.textContent = `${remaining}/1000`;

  if(remaining < warningThreshold){
    charCountSpan.style.color = "red";
  }else{
    charCountSpan.style.color = "";
  }

  if(remaining < 0){
    commentsField.setCustomValidity("You have exceeded the character limit.");
    error.textContent = "You have exceeded the character limit.";
      error.style.opacity = 1;
      
      addFormError(commentsField, "Exceeded character limit.");

      setTimeout(() => {
        error.style.opacity = 0;
      }, 2000);
  }else{
    commentsField.setCustomValidity("");
  }
});



const form = document.getElementById("conatct"); 
form.addEventListener("submit", function(){
    const hiddenErrors = document.querySelector("input[name='form-errors']");
    if (hiddenErrors) {
      hiddenErrors.value = form_errors
        .map(err => `${err.field}: ${err.message}`)
        .join("; ");
    }
  });


