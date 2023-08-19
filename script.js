// Function to validate the selected day
function isValidDay() {
    // Get the input elements and values for day, month, and year
    const dateInput = document.getElementById("date");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const date = parseInt(document.getElementById("date").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    // Get message elements and labels for styling
    const dateMessage = document.getElementById("dateMessage");
    const dateLabel = document.getElementById("dateLabel");
    const monthLabel = document.getElementById("monthLabel");
    const yearLabel = document.getElementById("yearLabel");

    // Check if the entered date is not a number (NaN)
    if (isNaN(date)) {
        dateLabel.style.color = "hsl(0, 100%, 67%)";
        dateInput.style.borderColor = "hsl(0, 100%, 67%)";
        dateMessage.textContent = "This field is required";
        return false;
    }

    // Check if the entered date is a valid date
    const isValidDate = new Date(year, month - 1, date).getDate() === date;
    if (!isValidDate) {
        dateLabel.style.color = "hsl(0, 100%, 67%)";
        dateInput.style.borderColor = "hsl(0, 100%, 67%)";
        monthInput.style.borderColor = "hsl(0, 100%, 67%)";
        monthLabel.style.color = "hsl(0, 100%, 67%)";
        yearInput.style.borderColor = "hsl(0, 100%, 67%)";
        yearLabel.style.color = "hsl(0, 100%, 67%)";
        dateMessage.textContent = "Must be a valid date";
        return false;
    }

    // Check if the entered date is within valid day range
    if (date < 1 || date > 31) {
        dateLabel.style.color = "hsl(0, 100%, 67%)";
        dateInput.style.borderColor = "hsl(0, 100%, 67%)";
        dateMessage.textContent = "Must be a valid day";
        return false;
    }

    // If all checks pass, return true
    return true;
};


// Function to validate the month input
function isValidMonth(){    
    // Get the month input element and its value
    const monthInput = document.getElementById("month"); 
    const month = parseInt(document.getElementById("month").value);
    
    // Get the message element for displaying validation messages
    const monthMessage = document.getElementById("monthMessage");
    
    // Get the label element associated with the month input
    const monthLabel = document.getElementById("monthLabel");

    // Check if the value is not a number (NaN)
    if (isNaN(month)) {
        // Highlight the input border and label with red color
        monthInput.style.borderColor = "red";             
        monthLabel.style.color = "hsl(0, 100%, 67%)";   
        
        // Display the error message
        monthMessage.textContent = "This field is required";
        
        // Return false to indicate validation failure
        return false;
    }

    // Check if the month value is not within the valid range (1-12)
    if (month < 1 || month > 12) {      
        // Highlight the input border and label with a faded red color
        monthInput.style.borderColor = "hsl(0, 100%, 67%)";             
        monthLabel.style.color = "hsl(0, 100%, 67%)";    
        
        // Display the error message
        monthMessage.textContent = "Must be a valid month";
        
        // Return false to indicate validation failure
        return false;
    }
    
    // Return true to indicate validation success
    return true;
};


// Function to validate the year input
function isValidYear(){
    // Get the current date
    const currentDate = new Date();    

    // Get the year input element and its value
    const yearInput = document.getElementById("year"); 
    const year = parseInt(document.getElementById("year").value);

    // Get elements for displaying messages and labels
    const yearMessage = document.getElementById("yearMessage");
    const yearLabel = document.getElementById("yearLabel");

    // Check if the year input is not a valid number
    if (isNaN(year)) {   
        // Apply styling to indicate an error
        yearInput.style.borderColor = "hsl(0, 100%, 67%)";              
        yearLabel.style.color = "hsl(0, 100%, 67%)";   
        yearMessage.textContent = "This field is required";
        return false; // Return false to indicate validation failure
    }

    // Check if the input year is in the future
    if (year > currentDate.getUTCFullYear()) {       
        // Apply styling to indicate an error
        yearInput.style.borderColor = "hsl(0, 100%, 67%)";               
        yearLabel.style.color = "hsl(0, 100%, 67%)";    
        yearMessage.textContent = "Must be in the past";
        return false; // Return false to indicate validation failure
    }

    return true; // Return true to indicate validation success
};

// Function to calculate age
function calculateAge() {
    // Get the selected birthdate components from the input elements
    const date = parseInt(document.getElementById("date").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    
    // Check if the selected day, month, and year are valid
    const validDay = isValidDay();
    const validMonth = isValidMonth();
    const validYear = isValidYear();

    // If any of the validations fail, prevent further execution
    if (!validDay || !validMonth || !validYear) {
        return;
    }


    // Get the current date and time
    const currentDate = new Date();
    const birthdate = new Date(`${year}-${month}-${date}`);

    const difference = currentDate - birthdate;
    const ageDate = new Date(difference);

    // Calculate the difference between birthdate and current date
    let yearsDiff = ageDate.getUTCFullYear() - 1970;
    let monthsDiff = ageDate.getUTCMonth();
    let daysDiff = ageDate.getUTCDate();

    // Adjust months and years if birthdate month is 
    // later in the year or if days difference is negative
    // if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    //     yearsDiff--;
    //     monthsDiff += 12;
    // }
    
    // Adjust for negative values for month and year
    if (monthsDiff < 0 || yearsDiff < 0) {
        yearsDiff = 0;
        monthsDiff = 0;
    }
    
    // Adjust days if the difference is negative
    if (daysDiff < 0) {
        monthsDiff--;
        const daysInLastMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        ).getDate();
        daysDiff += daysInLastMonth;
    }

    // Check if 'ageData' is present in local storage
    if (localStorage.getItem('ageData')) {
        // Delete old data from local storage
        localStorage.removeItem('ageData');
    }

    // Create a JSON object
    const ageData = {
        years: yearsDiff,
        months: monthsDiff,
        days: daysDiff
    };
    
    // Convert the JSON object to a string
    const ageDataString = JSON.stringify(ageData);

    // Save the string in local storage
    localStorage.setItem('ageData', ageDataString);

    // Call stored data function
    getStoredData();
}

// Retrieve the age data from local storage
const getStoredData = () =>{
    // Retrieve the data from local storage
    const storedAgeString = localStorage.getItem('ageData');

    // Parse the JSON string back to an object
    const storedAge = JSON.parse(storedAgeString);

    // Access the individual values
    const storedYears = storedAge.years;
    const storedMonth = storedAge.months;
    const storedDay = storedAge.days;

    // Get the elements where we'll display the calculated age
    const currentYears = document.getElementById("currentYears");
    const currentMonths = document.getElementById("currentMonths");
    const currentDays = document.getElementById("currentDays");
    const currentYear = document.getElementById("currentYear");
    const currentMonth = document.getElementById("currentMonth");
    const currentDay = document.getElementById("currentDay");

    // Update the elements' content with the calculated age
    storedYears < 2
        ? (currentYear.textContent = "year")
        : (currentYear.textContent = "years");
    storedMonth < 2
        ? (currentMonth.textContent = "month")
        : (currentMonth.textContent = "months");
    storedDay < 2
        ? (currentDay.textContent = "day")
        : (currentDay.textContent = "days");
    currentYears.textContent = storedYears;
    currentMonths.textContent = storedMonth;
    currentDays.textContent = storedDay;
}

// Call stored data function
getStoredData();