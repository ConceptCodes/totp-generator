# TOTP Generator CLI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple command-line tool to generate Time-Based One-Time Passwords (TOTPs) using the `node-2fa` library. This tool allows you to generate TOTP secrets, display them as QR codes (to scan in your authenticator app of choice), and verify the generated tokens.

## Features
- Generate TOTP secrets using the node-2fa library.
- Display TOTP secrets as QR codes for easy scanning.
- Verify the correctness of generated TOTP codes.

## Prerequisites

Before using this tool, make sure you have Node.js and Yarn installed on your system.

- Node v18+
- Yarn 1.22.x

## Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/conceptcodes/totp-generator.git
   cd totp-generator
   ```

2. Install the required dependencies:

    ```sh
    bun install
    ```

## Usage
To run the TOTP Generator CLI, execute the following command in your terminal:

```sh
bun start
```

Follow the on-screen prompts to provide your application name and username. The CLI will then generate a TOTP secret for you and display it as a QR code. You will be prompted to enter the TOTP code to verify its correctness.


