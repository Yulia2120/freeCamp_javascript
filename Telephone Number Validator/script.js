const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

const handlePhoneNumberValidation = () => {
  const phoneNumber = userInput.value.trim();
  if (phoneNumber === "") {
    alert("Please provide a phone number");
    return;
  }

  if (isValidPhoneNumber(phoneNumber)) {
    result.textContent = "Valid US number: " + phoneNumber;
    result.style.color = "green";
  } else {
    result.textContent = "Invalid US number: " + phoneNumber;
    result.style.color = "red";
  }
};

checkBtn.addEventListener("click", handlePhoneNumberValidation);

clearBtn.addEventListener("click", () => {
  result.textContent = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlePhoneNumberValidation();
  }
});

const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;
  return regex.test(phoneNumber);
};
