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
UrlChecker validates the format of a URL while the user is typing.

1. For valid URLs, the existence check is debounced 750ms to avoid unnecessary requests.

2. A client-side mock server simulates an asynchronous network request with a random delay between 300 and 1500 ms.

For demonstration:
- URLs containing "file" return an existing File.
- URLs containing "folder" return an existing Folder.
- Other URLs return exists: false.

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
