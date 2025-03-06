const express = require("express");
const killPort = require("kill-port");
const cors = require("cors");

const backend_start_server = () => {
  // Kill port 8259 before starting
  killPort(8259, "tcp")
    .then(() => {
      console.log("Port 8259 is now free");

      // Make own API
      const server = express();

      // Enable CORS for requests from port 3000
      if(require.main === module){
        server.use(cors({ origin: "*" }));
      }
      else{
        server.use(cors({ origin: "http://localhost:3000" }));
      }

      

      server.get("/api/greeting", (req, res) => {
        res.json({ message: "Hello from the server!" });
      });

      const port = process.env.PORT || 8259;
      server.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Error occurred while killing port 8259:", err);
    });
};

// Call the function if this file is executed directly
if (require.main === module) {
  backend_start_server();
}

module.exports = backend_start_server;
