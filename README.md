# Web Application Mimicking Google Sheets

## Overview
This project is a web-based spreadsheet application that mimics the core functionalities of **Google Sheets**. It supports **data entry, mathematical functions, data validation, file upload, find & replace, and visualization** using charts.

## Features
- **Spreadsheet Interface**: Interactive grid layout similar to Google Sheets.
- **Mathematical Functions**: SUM, AVERAGE, MAX, MIN, COUNT.
- **Data Quality Functions**: TRIM, UPPER, LOWER, REMOVE_DUPLICATES, FIND_AND_REPLACE.
- **File Upload & Load**: Load JSON files into the spreadsheet.
- **Graph Generation**: Visualize numerical data using bar charts.
- **Find & Replace**: Replace text inside the spreadsheet cells.

## Tech Stack & Why Used

### **Frontend**
- **React**: Used for building a dynamic and interactive UI.
- **Ant Design**: Provides a modern and professional look for UI components.
- **Chart.js**: Used for rendering visual charts from spreadsheet data.
- **CSS (Custom Styling)**: Styles the spreadsheet to resemble Google Sheets.

### **Backend**
(Current implementation is frontend-only, but could be extended with a backend)
- **Node.js with Express (Optional)**: If implemented, it would handle saving/loading data.
- **MongoDB (Optional)**: Could store user spreadsheets for persistence.

### **Data Structures Used & Why**
1. **JavaScript Objects (`cells` state in React)**
   - Stores spreadsheet data in key-value pairs (`{ cellID: value }`).
   - Efficient lookup and updates.

2. **Arrays (for Row & Column Management)**
   - Used for rendering spreadsheet rows & columns dynamically.
   - Helps in iterating through cell data efficiently.

3. **Regular Expressions (Regex in Find & Replace)**
   - Enables efficient searching and replacing of text in cells.

## Setup & Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/google-sheets-clone.git
   cd google-sheets-clone
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## How to Use
- **Enter data in spreadsheet cells.**
- **Perform mathematical operations** by clicking respective function buttons.
- **Use Find & Replace** to update text.
- **Upload a JSON file** containing spreadsheet data.
- **Generate a graph** using numerical data.

## Future Improvements
- **Backend Integration**: Save and load spreadsheets from a database.
- **Excel File Support**: Allow exporting and importing Excel files.
- **Advanced Formulas**: Support for more complex cell calculations.

## Contributors
- **Shivam Chaudhary** - Developer

## License
MIT License

