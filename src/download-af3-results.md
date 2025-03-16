### Script to Download AF3 Results

**How to Use:**

1. **Open/Reload** the AlphaFold results page in your browser.
2. **Change the view** to show the desired number of results (default is 10, can be set to 25 or 100).
3. **Open the Developer Console**:
   - In Chrome: Press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac).
   - In Firefox: Press `Ctrl + Shift + K` (Windows/Linux) or `Cmd + Option + K` (Mac).
4. **Paste the script** into the console and press `Enter`.
5. **Call the `downloadRange` function** with the desired start and end indices. For example:
   ```javascript
   downloadRange(1, 10); // Downloads rows 1 to 10
   ```

---

### Script:

```javascript
// Function to download results for a range of rows (1-based indices)
function downloadRange(startIndex, endIndex) {
    // Find all "more options" buttons within the table
    const moreOptionsButtons = document.querySelectorAll('table.mat-mdc-table button.mat-mdc-menu-trigger');

    if (moreOptionsButtons.length === 0) {
        console.error("No 'more options' buttons found in the table.");
        return;
    }

    // Convert 1-based indices to 0-based indices
    const start = startIndex - 1;
    const end = endIndex - 1;

    // Validate the range
    if (start < 0 || end >= moreOptionsButtons.length || start > end) {
        console.error("Invalid range. Please provide valid start and end indices.");
        return;
    }

    console.log(`Processing rows from index ${startIndex} to ${endIndex}...`);

    // Function to click the "Download" button in the menu
    function clickDownloadButton() {
        const downloadButton = Array.from(document.querySelectorAll('span.mat-mdc-menu-item-text'))
            .find(span => span.textContent.trim() === "Download");

        if (downloadButton) {
            console.log("Found the 'Download' button. Clicking...");
            downloadButton.click(); // Click the "Download" button
        } else {
            console.error("Download button not found in the menu.");
        }
    }

    // Iterate through the specified range of rows
    for (let i = start; i <= end; i++) {
        setTimeout(() => {
            console.log(`Processing row ${i + 1}...`);
            moreOptionsButtons[i].click(); // Click the "more options" button

            // Wait for the menu to appear, then click the "Download" button
            setTimeout(() => {
                clickDownloadButton();
            }, 500); // Adjust the delay if the menu takes longer to appear
        }, (i - start) * 1000); // Add a delay between each row to avoid overlapping actions
    }
}
```

---

### Example Usage:

```javascript
downloadRange(1, 10); // Downloads rows 1 to 10
downloadRange(11, 25); // Downloads rows 11 to 25
downloadRange(1, 100); // Downloads rows 1 to 100 (if 100 results are visible)
```

---

### Notes:

1. **Adjust Delays**:
   - If the menu takes longer to appear, increase the delay in the `setTimeout` functions (e.g., change `500` to `1000` for a 1-second delay).
   
2. **Permissions**:
   - Some browsers may block multiple automatic downloads. You may need to allow downloads from the site.

3. **Error Handling**:
   - If the "Download" button is not found, the script logs an error and continues to the next row.

4. **View Settings**:
   - Ensure the table displays the desired number of results (e.g., 10, 25, or 100) before running the script.
