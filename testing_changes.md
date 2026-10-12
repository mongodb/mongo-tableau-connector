# Testing Dialect Changes Locally

Workflow for updating and testing `connector/dialect.tdd`the results in Tableau Desktop, mirroring what Evergreen runs in CI via our `evergreen.yml`
## 1. One-time setup: virtual environment + connector-plugin-sdk

> **Note:** The Tableau connector-plugin-sdk is **not** part of this repository — it is
> not tracked in git, so a fresh clone of this repo won't have it. You must clone it
> yourself:
>
> ```bash
> git clone https://github.com/tableau/connector-plugin-sdk.git
> ```


CI does this in the `setup python virtual environment` and `install connector plugin sdk`
functions. Locally, from the repo root:

```bash
# Create the venv (skip if .venv/ already exists)
python3 -m venv .venv

# Clone connector-plugin-sdk at the repo root if you don't have it (see note above)
git clone https://github.com/tableau/connector-plugin-sdk.git

# Install the packager into the venv
source .venv/bin/activate
( cd connector-plugin-sdk/connector-packager && pip install -e . )
```

Activate the venv in every new shell before running the packager:

```bash
source .venv/bin/activate
```

## 2. Edit the dialect

Make your changes to `connector/dialect.tdd`. Note that Tableau only reads the dialect
at startup, so every change requires a full Tableau restart. Closing Tableau and re-running the command to launch Tableau.

## 3. Validate (same as the CI `compile` task)

This is the local equivalent of the `validate connector XML format` Evergreen function:

```bash
source .venv/bin/activate
( cd connector-plugin-sdk/connector-packager && python3 -m connector_packager.package \
   --validate-only --verbose ../../connector/ --log ../../logs )
```

- Output prints to the console. Look for `Validation succeeded.`

### Building the taco

To produce the  `.taco` that Tablea will use run:

```bash
( cd connector-plugin-sdk/connector-packager && python3 -m connector_packager.package \
   --verbose ../../connector/ --dest ../../package --log ../../logs )
mv package/mongodb_jdbc-*.taco connector/mongodb_jdbc.taco
```

## 4. Launch Tableau

Tableau only reads the connector at startup, so relaunch it after every change. The
launch below points `ConnectPluginsPath` at the `connector/` folder, which now contains
the `mongodb_jdbc.taco` you moved there in step 3 — that is how Tableau picks up your
changes:

```bash
"/Applications/Tableau Desktop (Apple silicon) 2025.3.app/Contents/MacOS/Tableau" \
  -DDisableVerifyConnectorPluginSignature=true \
  -DConnectPluginsPath=/{path-to-mongo-tableau-connector}/mongo-tableau-connector/connector &
```

Notes:

- `ConnectPluginsPath` points at the `connector/` folder, and the `mongodb_jdbc.taco`
  you moved there in step 3 is what Tableau loads. After each dialect change, rebuild
  and re-move the taco (step 3), then relaunch Tableau with this command.
- The locally built taco isn't signed, so `DisableVerifyConnectorPluginSignature=true`
  is always required.
- Both flags only apply to Tableau instances launched this way; launching from the
  Dock/Finder ignores them.
- Tableau caches the connector's function list at startup, and existing datasources
  cache function availability. After relaunching, test against a **new datasource**.

Verify Tableau loaded your taco — the `Loading connector plugin` line should show the
`mongo-tableau-connector/connector/mongodb_jdbc.taco` path:

```bash
grep "Loading connector plugin" "$HOME/Documents/My Tableau Repository/Logs"/log*.txt \
  | grep "mongo-tableau-connector/connector" | tail -1
```

> **Note:** Tableau rotates its logs across launches (`log.txt`, `log_1.txt`,
> `log_2.txt`, …), so the current session's entries are not necessarily in `log.txt`.
> That is why the grep above checks all of them.

## Troubleshooting

- **Logs**: Tableau Desktop writes logs to `~/Documents/My Tableau Repository/Logs/`
  (`log.txt` plus rotated copies `log_1.txt`, `log_2.txt`, … — look for
  `connector-plugin` entries in all of them, since the current session may not be in
  `log.txt`). Not in `~/Library/Tableau/` — that directory only holds `Connectors/`
  and `Drivers/`.
- **Stale taco**: if the log shows a `.taco` path other than
  `mongo-tableau-connector/connector/mongodb_jdbc.taco` (e.g. one in
  `~/Library/Tableau/Connectors/` or `~/Documents/My Tableau Repository/Connectors/`),
  that stale taco wins or competes with yours. Remove stale tacos and fully restart
  Tableau.
- **"Function ... not available on non-aggregates"**: usually means the running
  Tableau process loaded an old connector version. Restart Tableau fully and recheck
  the `Loading connector plugin` line in the log.
