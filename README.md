# UrlChecker

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.22.

## Starting the project

## Prerequisites
Before you can run this project, ensure you have the following installed:
- Node.js (v22.13.0)
- npm (v10.9.2)

### Package Installation
```
npm install
```

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload whenever you modify any of the source files.


## Description
UrlChecker is a simple web application that allows users to check the validity of URLs. It provides a simple interface where users can input a URL, 
and the application will verify if the URL is reachable and valid. 


### Mock API for URL Checking

#### URL Examples
URL must start with `http://` or `https://`. Here are some examples of valid URLs:
- http://www.example.com
- https://www.example.com


The application uses a mock API to simulate URL checking.
e.g., if you input `https://www.google.com`, the service will return a valid URL response.

### File or folder checking
Mock API does not check for the existence of files or folders on the server. It only validates the format of the provided URL.

The API checks against if the URL contains the word **'file'** or **'folder'** in the path. 
If it does, it will return a success response, regardless of whether the file or folder actually exists on the server.


#### Examples of file or folder checking
e.g. if you input `https://www.example.com/file.txt`, the mock API will return a success response, but it does not verify if the file actually exists on the server.
if you input `https://www.example.com/folder/`, the mock API will return a success response, but it does not verify if the folder actually exists on the server.
