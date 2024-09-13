# Dynamic Forms Application

## Overview

This web application demonstrates a dynamic form interface using Next.js for the frontend, Node.js for the backend, and PostgreSQL for the database. Users can interact with two types of forms, each with validation rules and functionality to synchronize data with an online Excel sheet.

## Links

Google Sheets: https://docs.google.com/spreadsheets/d/1xKt69AUJI3FYW_sCpTFLD29T4Ust7itlUCVD8poDDHU/edit?gid=0#gid=0
Hosted App:

## Features

- **Dynamic Form Selection**: Two buttons ("Form A" and "Form B") allow users to select between two forms.
- **Form Validation**: Ensures the following:
  - Name field is non-empty and contains only alphabetic characters.
  - Country code is selected from a predefined list.
  - Phone number is numeric and conforms to the format specified by the selected country code.
- **Database Integration**: Data from the forms are stored in a PostgreSQL database.
- **Data Synchronization**: Automatically updates an online Excel sheet with the form data.

## Technologies

- **Frontend**: Next.js (React)
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Data Synchronization**: Integration with an online Excel sheet

## Setup

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Online Excel sheet setup for data synchronization

### Installation

1. **For local installation clone backend repo and install:**

      ```bash
      git clone https://github.com/Aparajith24/form-app-backend
      cd form-app-backend
      npm install
      node index.js
        ```
    Check the README.md file in the backend repo for more details.

2. **Clone the repository:**

    ```bash
    git clone https://github.com/Aparajith24/form-app-sde.git
    cd form-app-sde
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the application:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. **Navigate to `http://localhost:3000` in your browser.**
2. **Click on "Form A" or "Form B" to display the respective form.**
3. **Fill out the form fields and submit.**
