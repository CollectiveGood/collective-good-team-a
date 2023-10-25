// NEED GOOGLE CLI AND https://cloud.google.com/docs/authentication/client-libraries
// https://cloud.google.com/docs/authentication/provide-credentials-adc#how-to
// gcloud auth application-default login

// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage({ projectId: "150959018727" });

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: 'key.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = "bucket_test";

async function createBucket() {
  // Creates the new bucket
  const buckets = await storage.getBuckets();
  console.log(buckets);
}

createBucket().catch(console.error);
