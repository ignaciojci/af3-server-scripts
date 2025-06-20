// Filter AF3 history for 'Saved draft' only
// i.e. clicking on other buttons ('Completed', 'In Progress', and the rest) to hide them
// Show 100 items per page (bottom of the table)
// Paste to console

// Function to submit results for a range of rows (1-based indices)
function submitRange(startIndex, endIndex) {
    // Find all "rows" within the table
    const rows = document.querySelectorAll('table.mat-mdc-table tr.mat-mdc-row');

    if (rows.length === 0) {
        console.error("No 'rows' to click found in the table.");
        return;
    }

    // Convert 1-based indices to 0-based indices
    const start = startIndex - 1;
    const end = endIndex - 1;

    // Validate the range
    if (start < 0 || end >= rows.length || start > end) {
        console.error("Invalid range. Please provide valid start and end indices.");
        return;
    }

    console.log(`Processing rows from index ${startIndex} to ${endIndex}...`);
    
    // Function to click the "Preview" button in the menu
    function clickPreviewButton() {
        const previewButton = document.querySelector('div.actions-bottom button.mdc-button');

        if (previewButton) {
            console.log("Found the 'Preview' button. Clicking...");
            previewButton.click(); // Click the "Preview" button
        } else {
            console.error("Preview button not found.");
        }
    }
    
    // Function to click the "Submit" button in the menu
    function clickSubmitButton() {
        const submitButton = document.querySelector('div.mat-mdc-dialog-surface button.confirm');
        
        if (submitButton) {
            console.log("Found the 'Submit' button. Clicking...");
            submitButton.click(); // Click the "Submit" button
        } else {
            console.error("Submit button not found.");
        }
    }

    // Iterate through the specified range of rows
    for (let i = start; i <= end; i++) {
        setTimeout(() => {
            console.log(`Processing row ${i + 1}...`);
            rows[i].click(); // Click the "more options" button
            
            // Wait for the view to update, then click the "Preview" button
            setTimeout(() => {
                clickPreviewButton();
            }, 500); // Adjust the delay if the view takes longer to update
            
            // Wait for the preview to appear, then click the "Submit" button
            setTimeout(() => {
                clickSubmitButton();
            }, 500); // Adjust the delay if the preview dialog takes longer to appear
        }, (i - start) * 2000); // Add a delay between each row to avoid overlapping actions
    }
}

submitRange(1,30)
