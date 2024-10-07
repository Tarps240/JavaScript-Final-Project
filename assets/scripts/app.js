// Handle login

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the username exists in localStorage
    const storedUser = localStorage.getItem(`user_${username}`);
    if (!storedUser) {
        alert('Username not found. Please sign up first.');
        return;
    }

    // Parse the stored user data
    const userData = JSON.parse(storedUser);

    // Validate the password
    if (password === userData.password) {
        // Store the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);
        // Redirect to the dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Incorrect password. Please try again.');
    }
});


  // Handle sign-up
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Check if the username already exists
    const existingUser = localStorage.getItem(`user_${newUsername}`);
    if (existingUser) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    // Store the new user credentials in localStorage
    localStorage.setItem(`user_${newUsername}`, JSON.stringify({ password: newPassword }));
    alert('Account created successfully! You can now log in.');
    
    // Redirect to the login page
    window.location.href = 'login.html';
});


// Display logged-in user on dashboard

window.addEventListener("DOMContentLoaded", function () {
  const usernameDisplay = document.getElementById("usernameDisplay");
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    window.location.href = "login.html"; // Redirect to login if not logged in
  } else {
    usernameDisplay.textContent = loggedInUser;
  }
});

// Handle logout

document.getElementById("logOutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser"); // Clear user data
  window.location.href = "login.html"; // Redirect to login page
});

// Handle habit logging

document
  .getElementById("habitForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect the habit data

    const habits = {
      water: document.getElementById("water").value,
      meals: document.getElementById("meals").value,
      exercise: document.getElementById("exercise").value,
      sleep: document.getElementById("sleep").value,
      mood: document.getElementById("mood").value,
    };

    // Store the data in localStorage

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      localStorage.setItem(`habits_${loggedInUser}`, JSON.stringify(habits));
      alert("Habits logged successfully!");
      window.location.href = "dashboard.html"; // Redirect back to dashboard
    } else {
      alert("You are not logged in. Please log in first.");
    }
  });

// Display habit data on the dashboard

window.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`));
    if (habits) {
      document.getElementById(
        "waterIntake"
      ).textContent = `${habits.water}/8 cups`;
      document.getElementById(
        "mealsLogged"
      ).textContent = `${habits.meals}/4 meals`;
      document.getElementById(
        "exerciseDuration"
      ).textContent = `${habits.exercise} min`;
      document.getElementById(
        "sleepHours"
      ).textContent = `${habits.sleep} hours`;
      document.getElementById("moodStatus").textContent =
        habits.mood >= 7 ? "Happy" : "Neutral";
    }
  }
});

// Progress visualization using Chart.js

// window.addEventListener("DOMContentLoaded", function () {
//   const loggedInUser = localStorage.getItem("loggedInUser");
//   if (loggedInUser) {
//     const habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`));
//     if (habits) {
//       const ctx = document.getElementById("progressChart").getContext("2d");
//       const progressChart = new Chart(ctx, {
//         type: "bar",
//         data: {
//           labels: ["Water Intake", "Meals", "Exercise", "Sleep", "Mood"],
//           datasets: [
//             {
//               label: "Your Daily Wellness Data",
//               data: [
//                 habits.water,
//                 habits.meals,
//                 habits.exercise,
//                 habits.sleep,
//                 habits.mood,
//               ],
//               backgroundColor: [
//                 "#FFD700",
//                 "#FFD700",
//                 "#FFD700",
//                 "#FFD700",
//                 "#FFD700",
//               ],
//               borderColor: [
//                 "#000000",
//                 "#000000",
//                 "#000000",
//                 "#000000",
//                 "#000000",
//               ],
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     }
//   }
// });

// Progress visualization using Chart.js
window.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const habits = JSON.parse(localStorage.getItem(`habits_${loggedInUser}`));

    if (habits) {
      const ctx = document.getElementById("progressChart").getContext("2d");

      const progressChart = new Chart(ctx, {
        type: "bar", // We're creating a bar chart
        data: {
          labels: ["Water Intake", "Meals", "Exercise", "Sleep", "Mood"], // Categories of habits
          datasets: [
            {
              label: "Your Daily Wellness Data",
              data: [
                habits.water,
                habits.meals,
                habits.exercise,
                habits.sleep,
                habits.mood,
              ], // Values from the logged habits
              backgroundColor: [
                "rgba(255, 215, 0, 0.7)", // Gold for Water
                "rgba(255, 215, 0, 0.7)", // Gold for Meals
                "rgba(255, 215, 0, 0.7)", // Gold for Exercise
                "rgba(255, 215, 0, 0.7)", // Gold for Sleep
                "rgba(255, 215, 0, 0.7)", // Gold for Mood
              ],
              borderColor: [
                "rgba(0, 0, 0, 1)", // Black border
                "rgba(0, 0, 0, 1)",
                "rgba(0, 0, 0, 1)",
                "rgba(0, 0, 0, 1)",
                "rgba(0, 0, 0, 1)",
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
});

// Request notification permission

if ("Notification" in window) {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

// Send a reminder notification

function sendReminder() {
  if (Notification.permission === "granted") {
    new Notification("Reminder", {
      body: "Don’t forget to log your wellness habits today!",
      icon: "path/to/icon.png", // optional
    });
  }
}

// Example: Send a reminder every 24 hours (for demo)

setTimeout(sendReminder, 1000 * 60 * 60 * 24); // Change to suit your time interval
