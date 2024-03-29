# Versioning  
Versions will follow the [semantic versioning](https://semver.org/) system.  
The following guidelines will be used to determine when each version component will be updated:
- **major**: backwards-breaking changes 
- **minor**: functionality added in a backwards compatible manner
- **patch**: backwards compatible bug fixes

# Release Process
### Pre-Release Tasks

#### Start Release Ticket
Move the JIRA ticket for the release to the "In Progress" state.
Ensure that its fixVersion matches the version being released.

#### Complete the Release in JIRA
Go to the [SQL releases page](https://jira.mongodb.org/projects/SQL?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page&status=unreleased), and ensure that all the tickets in the fixVersion to be released are closed.
Ensure that all the tickets have the correct type. Take this opportunity to edit ticket titles if they can be made more descriptive.
The ticket titles will be published in the changelog.

If you are releasing a patch version but a ticket needs a minor bump, update the fixVersion to be a minor version bump.
If you are releasing a patch or minor version but a ticket needs a major bump, stop the release process immediately.

The only uncompleted ticket in the release should be the release ticket.
If there are any remaining tickets that will not be included in this release, remove the fixVersion and assign them a new one if appropriate.

Close the release on JIRA, adding the current date (you may need to ask the SQL project manager to do this).

#### Ensure Evergreen Passing
Ensure that the build you are releasing is passing the tests on the evergreen waterfall.

### Release Tasks

#### Ensure master up to date
Ensure you have the `master` branch checked out, and that you have pulled the latest commit from `mongodb/mongo-tableau-connector`.

#### Create the tag and push
Create an annotated tag and push it:
```
git tag -a -m X.Y.Z vX.Y.Z
git push --tags
```
This should trigger an Evergreen version that can be viewed on the [mongo-tableau-connector waterfall](https://evergreen.mongodb.com/waterfall/mongo-tableau-connector).
If it does not, you may have to ask the project manager to give you the right permissions to do so.
Make sure to run the 'release' task, if it is not run automatically.

#### Set Evergreen Priorities
Some evergreen variants may have a long schedule queue.
To speed up release tasks, you can set the task priority for any variant to 101 for release candidates and 200 for actual releases.
If you do not have permissions to set priority above 100, ask the project manager to set the
priority.

### Post-Release Tasks

#### Wait for evergreen
Wait for the evergreen version to finish, and ensure that the release task completes successfully.

#### Verify release artifacts
Check that the released TACO file is available at the URL:  
`https://translators-connectors-releases.s3.us-east-1.amazonaws.com/mongo-tableau-connector/mongodb-jdbc-<plugin-version>.taco`  

##### Ensure plugin-version is correct
Ensure that the `plugin-version` in [manifest.xml](https://github.com/mongodb/mongo-tableau-connector/blob/master/connector/manifest.xml)
is updated with the correct version.
- Rename the file from `taco` to `zip` and unzip. Check the manifest file.

##### Verify TACO works with Tableau
Download and install the TACO file.  
Verify that it is able to connect to Atlas Data Lake with Tableau, extract data, 
and add columns to the worksheet.

#### Close Release Ticket
Move the JIRA ticket tracking this release to the "Closed" state.

#### Ensure next release ticket and fixVersion created
Ensure that a JIRA ticket tracking the next release has been created
and is assigned the appropriate fixVersion.
