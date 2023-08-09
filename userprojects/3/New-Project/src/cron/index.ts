import cron from "node-cron";


const configCronJobs = () => {
  if (process.env.NODE_ENV === "local") return;


  if (process.env.CRON_JOBS !== "ENABLED") return;
 
  // runs every day at 6 AM

  if (process.env.AUTO_DB_BACKUP === "ENABLED") {
    // runs the job every day at 12 30 AM (IST)
    // cron.schedule("00 17 * * *", attemptBackup);

    // runs the job every day at 11 30 AM (IST)
    // cron.schedule("00 06 * * *", attemptBackup);

    // runs the job every day at 8 00 PM (IST)
    // cron.schedule("30 02 * * *", attemptBackup);
  }
};

export default configCronJobs;
