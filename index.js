// Importing the 'http' module and 'employees' from another file using ES6 import syntax.
// The 'http' module is used to create a web server, while 'employees' contains data to display.
import { createServer, STATUS_CODES } from "http";
import { employees } from "./Employee.js";

// Display a message in the console for debugging purposes.
console.log("Lab 03 - NodeJs");

// Define the server port. If no environment variable is set, it defaults to port 8081.
const port = process.env.PORT || 8081;

// Create a web server using the HTTP core API.
// The server listens for requests and responds based on the URL and method (GET).
const server = createServer((req, res) => {
    // Check if the request method is not GET. If it's not, return a 405 Method Not Allowed error.
    if (req.method !== 'GET') {
            // Seting the header to JSON for error response

        res.writeHead(405, { "Content-Type": "application/json" });

        res.end(`{"error": "${STATUS_CODES[405]}"}`);
        return;  // Exit early to prevent further code execution after response has ended.
    } else {
        // If the request URL is '/', return a welcome message.
        if (req.url === '/') {
            // Seting the header to HTML for the welcome message
        res.writeHead(200, { "Content-Type": "text/html" });
        
            // Display a welcome message in HTML format.
            res.write("<h1>Welcome to Lab Exercise 03 Employee List Fetching</h1>");
            res.end();  // End the response after writing the message.
            return;  // Prevent any further code execution after response ends.
        }

        // If the request URL is '/employee', return the list of employees in JSON format.
        if (req.url === '/employee') {
            // Set the header to JSON for the employee list response
        res.writeHead(200, { "Content-Type": "application/json" });
            // Write the employees array as a JSON string.
            res.write(JSON.stringify(employees));
            res.end();  // End the response.
            return;  // Stop further code execution.
        }

        // If the request URL is '/employee/names', return only the full names of employees, sorted alphabetically.
        if (req.url === '/employee/names') {
            // Create an array of full names (first name + last name) and sort it.
            let names = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();
            // Seting~ the header to JSON for the sorted names response
            res.writeHead(200, { "Content-Type": "application/json" });
            
            // Write the sorted names as a JSON string.
            res.write(JSON.stringify(names));
            res.end();  // End the response.
            return;  // Stop further code execution. added after facing error
        }

        // If the request URL is '/employee/totalsalary', calculate and return the total salary of all employees.
        if (req.url === '/employee/totalsalary') {
            // Calculate the total salary by summing up the 'Salary' field of all employees.
            let totalSalary = employees.reduce((acc, emp) => acc + emp.Salary, 0);
            // Seting the header to JSON for the total salary response
            res.writeHead(200, { "Content-Type": "application/json" });
            // Write the total salary in the specified JSON format.
            res.write(JSON.stringify({ total_salary: totalSalary }));
            res.end();  // End the response.
            return;  // Stop further code execution.
        }

        // If no matching route is found, return a 404 Not Found error.
        // Seting the header to JSON for the error response
        res.writeHead(404, { "Content-Type": "application/json" });
        // Write the error message in JSON format.

        res.write(`{"error": "${STATUS_CODES[404]}"}`);
    }
});

// Start the server and listen on the specified port and Once the server starts, it logs the message to the console.

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

/*
one ERROR: i faced was ERR_STREAM_WRITE_AFTER_END
"ERR_STREAM_WRITE_AFTER_END" error because 'res.end()' was called multiple times for the same request.
In Node.js, calling 'res.end()' signals the end of the response, so no further data can be written after this.
To avoid this error, 'return' statements can be added after each 'res.end()' call. This ensures that once a response is sent, the server stops executing further code for that request.
This prevents any additional data from being written to the stream after the response has ended.
*/
