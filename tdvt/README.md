# TDVT datasets

## Import the datasets in your cluster
### Calcs
```
mongoimport --uri "{your connection URL}" --db=tdvt --drop --collection Calcs --type=json --file={Path to tdvt/datasets directory}/Calcs.json
```
### Staples
```
mongoimport --uri "{your connection URL}" --db=tdvt --drop --collection Staples --type=json --file={Path to tdvt/datasets directory}/Staples.json
```

## Configure your Data Federation
Add the following to `databases`
```
{
    "name":"tdvt",
    "collections":[
        {
            "name":"Staples",
            "dataSources":[
                {
                    "collection":"Staples",
                    "storeName":"{your store name}",
                    "database":"tdvt"
                }
            ]
        },
        {
            "name":"Calcs",
            "dataSources":[
                {
                    "collection":"Calcs",
                    "storeName":"{your store name}",
                    "database":"tdvt"
                }
            ]
        }
    ]
}
```

## Set the schemas

### Make sure to be on the correct database
```
use tdvt
```

### Load Calcs schema
```
db.runCommand({ 
    sqlSetSchema: "Calcs", 
    schema: { 
        version: 1, 
        jsonSchema: { 
            bsonType: ['object'], 
            properties: { 
                bool2: { bsonType: ['bool', 'null'] }, 
                date3: { bsonType: ['date', 'null'] }, 
                _id: { bsonType: ['objectId', 'null'] }, 
                num2: { bsonType: ['double', 'null'] }, 
                time1: { bsonType: ['date', 'null'] }, 
                num4: { bsonType: ['double', 'null'] }, 
                int1: { bsonType: ['null', 'int'] }, 
                num1: { bsonType: ['double', 'null'] }, 
                bool0: { bsonType: ['bool', 'null'] }, 
                datetime0: { bsonType: ['date', 'null'] }, 
                date2: { bsonType: ['date', 'null'] }, 
                time0: { bsonType: ['date', 'null'] }, 
                date0: { bsonType: ['null', 'date'] }, 
                int3: { bsonType: ['int', 'null'] }, 
                str0: { bsonType: ['string', 'null'] }, 
                date1: { bsonType: ['date', 'null'] }, 
                int0: { bsonType: ['int', 'null'] }, 
                str3: { bsonType: ['string', 'null'] }, 
                key: { bsonType: ['string', 'null'] }, 
                num0: { bsonType: ['null', 'double'] }, 
                datetime1: { bsonType: ['string', 'null'] }, 
                str1: { bsonType: ['string', 'null'] }, 
                int2: { bsonType: ['int', 'null'] }, 
                zzz: { bsonType: ['string', 'null'] }, 
                bool3: { bsonType: ['null', 'bool'] }, 
                bool1: { bsonType: ['bool', 'null'] }, 
                num3: { bsonType: ['double', 'null'] }, 
                str2: { bsonType: ['string', 'null'] } 
            } 
        } 
    } 
})
```

The schema definition is also available in `Calcs_schema.json` for reference.

### Load Staples schema
```
db.runCommand({ 
    sqlSetSchema: "Staples", 
    schema: { 
        "version": 1, 
        "jsonSchema": { 
            bsonType: ['object'], 
            properties: { 
                PID: { bsonType: ['int'] }, 
                'Ship Priority': { bsonType: ['string'] }, 
                'Total Cycle Time': { bsonType: ['double'] }, 
                'Employee Salary': { bsonType: ['decimal'] }, 
                'Ship Mode': { bsonType: ['string'] }, 
                'Product ID': { bsonType: ['string'] }, 
                'Gross Profit': { bsonType: ['double'] }, 
                'Product Name': { bsonType: ['string'] }, 
                'Fill Time': { bsonType: ['double'] }, 
                'Market Segment': { bsonType: ['string'] }, 
                'Ship Handle Cost': { bsonType: ['decimal'] }, 
                'Supplier Name': { bsonType: ['string'] }, 
                'Order Quantity': { bsonType: ['double'] }, 
                'Order Priority': { bsonType: ['string'] }, 
                'Supplier Balance': { bsonType: ['double'] }, 
                'Ship Date': { bsonType: ['date'] }, 
                'Supplier State': { bsonType: ['string'] }, 
                'Prod Type4': { bsonType: ['string'] }, 
                'Customer State': { bsonType: ['string'] }, 
                'Employee Yrs Exp': { bsonType: ['double'] }, 
                'Employee Dept': { bsonType: ['string'] }, 
                'Manager Name': { bsonType: ['string'] }, 
                'Product In Stock': { bsonType: ['string'] }, 
                'Supplier Region': { bsonType: ['string'] }, 
                'Receive Time': { bsonType: ['double'] }, 
                'Order Date': { bsonType: ['date'] }, 
                'Prod Type1': { bsonType: ['string'] }, 
                'Product Base Margin': { bsonType: ['double'] }, 
                'Order Quarter': { bsonType: ['string'] }, 
                'Customer Balance': { bsonType: ['double'] }, 
                'Ship Promo': { bsonType: ['string'] }, 
                '': { bsonType: ['int'] }, 
                'Item Count': { bsonType: ['int'] }, 
                'Customer Name': { bsonType: ['string'] }, 
                'Sales Total': { bsonType: ['double'] }, 
                'Prod Type2': { bsonType: ['string'] }, 
                Discount: { bsonType: ['double'] }, 
                'Received Date': { bsonType: ['date'] }, 
                'Order Year': { bsonType: ['int'] }, 
                'Customer Segment': { bsonType: ['string'] }, 
                'Ship Charge': { bsonType: ['decimal'] }, 
                'Tax Rate': { bsonType: ['double'] }, 
                'Employee Name': { bsonType: ['string'] }, 
                'Prod Type3': { bsonType: ['string'] }, 
                'Order ID': { bsonType: ['string'] }, 
                _id: { bsonType: ['objectId'] }, 
                'Order Status': { bsonType: ['string'] }, 
                Price: { bsonType: ['decimal'] }, 
                'Call Center Region': { bsonType: ['string'] }, 
                'Order Month': { bsonType: ['int'] }, 
                'Product Container': { bsonType: ['string'] } 
            } 
        } 
    } 
})
```
The schema definition is also available in `Staples_schema.json` for reference.

### Validate the data is inserted correctly
```
db.aggregate([{$sql: {statement: "SELECT count(*) FROM \"Calcs\"",format: "jdbc",formatVersion: 1, dialect: "mongosql"}}])
```
Expected result : `[ { '': { _1: 17 } } ]`

```
db.aggregate([{$sql: {statement: "SELECT count(*) FROM \"Staples\"",format: "jdbc",formatVersion: 1, dialect: "mongosql"}}])
```
Expected result : `[ { '': { _1: 54860 } } ]`
