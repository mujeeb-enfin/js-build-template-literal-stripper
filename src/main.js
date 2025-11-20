// src/main.js
import { initLogin } from '/assets/componets/auth/login.js';
// import { initRegister } from '/assets/componets/auth/register.js';
// import { renderOverview } from '/assets/componets/dashboard/overview.js';
// import { displayProfile } from '/assets/componets/dashboard/profile.js';
// import { showReports } from '/assets/componets/dashboard/reports.js';

// 2. Execute the initialization logic once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log("--- Application Start ---");
    
    // Call the functions to initialize or render the components
    initLogin();
    initRegister();
    renderOverview();
    displayProfile();
    showReports();

    console.log("--- Application End (All Components Loaded) ---");
});