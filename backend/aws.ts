// NEED TO ADD AWS_ACCESS_KEY and AWS_SECRET_ACCESS_KEY from AWS

import * as async from "async";
import * as AWS from "aws-sdk";
require("dotenv").config();

if (process.argv.length < 3) {
  console.log(
    "Usage: node s3.js <the bucket name> <the AWS Region to use>\n" +
      "Example: node s3.js my-test-bucket us-east-2"
  );
  process.exit(1);
}
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
};
const s3: AWS.S3 = new AWS.S3({
  apiVersion: "2006-03-01",
  credentials: credentials,
});

const bucket_name: string = process.argv[2];

AWS.config.update({
  credentials: credentials,
});

const create_bucket_params: any = {
  Bucket: bucket_name,
};

const delete_bucket_params: any = {
  Bucket: bucket_name,
};

// List all of your available buckets in this AWS Region.
function listMyBuckets(callback: any): void {
  s3.listBuckets(function (err, data) {
    if (err) {
    } else {
      console.log("My buckets now are:\n");

      for (let i: number = 0; i < data.Buckets!.length; i++) {
        console.log(data.Buckets![i].Name);
      }
    }

    callback(err);
  });
}

// Create a bucket in this AWS Region.
function createMyBucket(callback: any): void {
  console.log("\nCreating a bucket named '" + bucket_name + "'...\n");

  s3.createBucket(create_bucket_params, function (err, data) {
    if (err) {
      console.log(err.code + ": " + err.message);
    }

    callback(err);
  });
}

// Delete the bucket you just created.
function deleteMyBucket(callback: any): void {
  console.log("\nDeleting the bucket named '" + bucket_name + "'...\n");

  s3.deleteBucket(delete_bucket_params, function (err, data) {
    if (err) {
      console.log(err.code + ": " + err.message);
    }

    callback(err);
  });
}

// Call the AWS operations in the following order.
async.series([
  listMyBuckets,
  createMyBucket,
  listMyBuckets,
  deleteMyBucket,
  listMyBuckets,
]);
