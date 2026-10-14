# Manual Test Matrix: String / Non-String Comparisons (SQL-3314)

Test each combination in Tableau Desktop using a calculated filter against an extended-JSON string literal. The **Sample Filter** column shows one concrete form to enter in the calculated-filter dialog; any equivalent field/literal values work.

| Type Pair          | Comparison | Sample Filter                                                      | Validated |
| ------------------ | ---------- | ------------------------------------------------------------------ | --------- |
| (str, int)         | `>`        | `'{"$numberInt": "5"}' > [intField]`                               |    yes       |
| (str, int)         | `>=`       | `'{"$numberInt": "5"}' >= [intField]`                              |     yes      |
| (str, int)         | `<`        | `'{"$numberInt": "5"}' < [intField]`                               |      yes     |
| (str, int)         | `<=`       | `'{"$numberInt": "5"}' <= [intField]`                              |     yes      |
| (str, int)         | `==`       | `'{"$numberInt": "5"}' == [intField]`                              |    yes       |
| (str, int)         | `!=`       | `'{"$numberInt": "5"}' != [intField]`                              |   yes        |
| (int, str)         | `>`        | `[intField] > '{"$numberInt": "5"}'`                               |      yes     |
| (int, str)         | `>=`       | `[intField] >= '{"$numberInt": "5"}'`                              |       yes    |
| (int, str)         | `<`        | `[intField] < '{"$numberInt": "5"}'`                               |       yes    |
| (int, str)         | `<=`       | `[intField] <= '{"$numberInt": "5"}'`                              |        yes   |
| (int, str)         | `==`       | `[intField] == '{"$numberInt": "5"}'`                              |      yes     |
| (int, str)         | `!=`       | `[intField] != '{"$numberInt": "5"}'`                              |     yes      |
| (str, real)        | `>`        | `'{"$numberDouble": "5.5"}' > [realField]`                         |       yes    |
| (str, real)        | `>=`       | `'{"$numberDouble": "5.5"}' >= [realField]`                        |       yes    |
| (str, real)        | `<`        | `'{"$numberDouble": "5.5"}' < [realField]`                         |      yes     |
| (str, real)        | `<=`       | `'{"$numberDouble": "5.5"}' <= [realField]`                        |     yes      |
| (str, real)        | `==`       | `'{"$numberDouble": "5.5"}' == [realField]`                        |      yes     |
| (str, real)        | `!=`       | `'{"$numberDouble": "5.5"}' != [realField]`                        |    yes       |
| (real, str)        | `>`        | `[realField] > '{"$numberDouble": "5.5"}'`                         |     yes      |
| (real, str)        | `>=`       | `[realField] >= '{"$numberDouble": "5.5"}'`                        |     yes      |
| (real, str)        | `<`        | `[realField] < '{"$numberDouble": "5.5"}'`                         |     yes      |
| (real, str)        | `<=`       | `[realField] <= '{"$numberDouble": "5.5"}'`                        |      yes     |
| (real, str)        | `==`       | `[realField] == '{"$numberDouble": "5.5"}'`                        |       yes    |
| (real, str)        | `!=`       | `[realField] != '{"$numberDouble": "5.5"}'`                        |       yes    |
| (str, datetime)    | `>`        | `'{"$date": "2024-01-01T00:00:00.000Z"}' > [saleDate]`             |           |
| (str, datetime)    | `>=`       | `'{"$date": "2024-01-01T00:00:00.000Z"}' >= [saleDate]`            |           |
| (str, datetime)    | `<`        | `'{"$date": "2024-01-01T00:00:00.000Z"}' < [saleDate]`             |           |
| (str, datetime)    | `<=`       | `'{"$date": "2024-01-01T00:00:00.000Z"}' <= [saleDate]`            |           |
| (str, datetime)    | `==`       | `'{"$date": "2024-01-01T00:00:00.000Z"}' == [saleDate]`            |           |
| (str, datetime)    | `!=`       | `'{"$date": "2024-01-01T00:00:00.000Z"}' != [saleDate]`            |           |
| (datetime, str)    | `>`        | `[saleDate] > '{"$date": "2024-01-01T00:00:00.000Z"}'`             |           |
| (datetime, str)    | `>=`       | `[saleDate] >= '{"$date": "2024-01-01T00:00:00.000Z"}'`            |           |
| (datetime, str)    | `<`        | `[saleDate] < '{"$date": "2024-01-01T00:00:00.000Z"}'`             |           |
| (datetime, str)    | `<=`       | `[saleDate] <= '{"$date": "2024-01-01T00:00:00.000Z"}'`            |           |
| (datetime, str)    | `==`       | `[saleDate] == '{"$date": "2024-01-01T00:00:00.000Z"}'`            |           |
| (datetime, str)    | `!=`       | `[saleDate] != '{"$date": "2024-01-01T00:00:00.000Z"}'`            |           |

Notes:

- `==` is the Tableau calculated-field syntax; it maps to `=` in the generated SQL.
- The type pair is the argument order in the dialect entry, e.g. `(datetime, str)` maps to the `[saleDate] > '{"$date": ...}'` form with the timestamp cast applied to the string operand, while `(str, datetime)` is the reversed form with the cast applied to the field.
- Replace `[intField]`, `[realField]`, and `[saleDate]` with actual fields from your data source.
