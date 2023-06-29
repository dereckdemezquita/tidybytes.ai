We will work on developping the dashboard. This will be the main page of the application.

1. There is a navigation bar at the top of the page
    1. The navigation bar has the website logo and the name of the currently selected app
    1. Account name on the right (clicking it will navigate to the user settings page)

The dashboard is capable of hosting various different apps.

We will start by working on the tabular data app. This is an app for cleaning up tabular style data. Below I describe the app for working with tabular data.

The main panel for the tabular data app is split into 2 main parts:

1. A side bar (collapsible)
    1. Upload data element
    2. Detects data type (csv, excel, etc)
        1. If excel is detected allow for selection of sheet; select menu of sheets
    3. Footer
        1. "Big Data? Use our API!" with a link to user settings with the API section selected
        2. A data privacy link
1. Main panel
    1. Data preview table; shows
        1. First 15 rows of data
        2. First 20 columns of data
            1. Column names
            2. A row is added with gray background below the headers that displays data type
        3. Every column is clickable; clicking on a column will highlight it
        4. Below the table is a panel that some text that shows some recommendations for the selected column