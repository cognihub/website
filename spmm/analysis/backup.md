# Backup

While there are native options for automated backups with Firebase CLI, for the Cognihub needs we will proceed with a manual backing up implementation. More specifically,
We will introduce a `backupFirebase` route handler that will download all documents from each collection specified as a zip file. The backup firebase functionallity will
be available from admin page.

References

1. [Backups in Firebase](https://firebase.google.com/docs/firestore/backups)
2. [Automated Backups in Firebase](https://firebase.google.com/docs/database/backups)
3. [NexttJS Stream Files from Route Handlers](https://www.ericburel.tech/blog/nextjs-stream-files)
