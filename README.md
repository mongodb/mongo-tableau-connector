# mongo-tableau-connector

This repository contains a custom Tableau connector for the MongoDB
SQL Interface, wrapping our JDBC driver (see
[mongodb/mongo-jdbc-driver](https://github.com/mongodb/mongo-jdbc-driver)).

The releases are available for download at the following location.  Replace `[plugin-version]` with plugin version:  
https://translators-connectors-releases.s3.us-east-1.amazonaws.com/mongo-tableau-connector/mongodb-jdbc-[plugin-version].taco

## Authentication

The MongoDB Tableau connector uses a connection dialog that includes fields such as **MongoDB URI** and **Database**, along with optional advanced settings depending on authentication mechanism. 

### Username and Password
Authenticates using a username and password.
- `username`: Your MongoDB username
- `password`: Your MongoDB password

### X509
For X509 authentication, you can specify the certificate in two ways:

#### Using PEM File Path
- In `mongodb_jdbc.properties`, set the `x509pempath` property to the file path of your PEM certificate  
  Example:  
  `x509pempath=/certs/client-cert.pem`
- In Tableau’s connection dialog, check the **"Provide PEM Contents"** checkbox if the file is encrypted
- Enter the passphrase in the **"Password"** field that appears

#### Using PEM Contents
- In Tableau’s connection dialog, check the **"Provide PEM Contents"** checkbox
- Paste the full **unencrypted** PEM certificate content directly into the **"Password"** field
- If the PEM is **encrypted**, provide a JSON object in the **"Password"** field with the keys `pem` and `passphrase`: 
  - `{ "pem": "...", "passphrase": "..." }`

### GSSAPI (Kerberos)
Kerberos authentication using a principal name.
- `username`: The principal name (e.g., `user@EXAMPLE.COM`)

### OIDC
OpenID Connect authentication — no additional properties or fields required in the connection dialog.