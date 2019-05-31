variable "aws_access_key" {
  type        = "string"
  description = ""
}

variable "aws_secret_key" {
  type        = "string"
  description = ""
}

variable "aws_region" {
  type        = "string"
  description = ""
}

variable "bucket_name" {
  type        = "string"
  description = ""
}

provider "aws" {
    access_key = "${var.aws_access_key}"
    secret_key = "${var.aws_secret_key}"
    region = "${var.aws_region}"
}

resource "aws_s3_bucket" "prod_bucket" {
    bucket = "${var.bucket_name}"
    acl = "public-read"


    policy = <<EOF
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "PublicReadForGetBucketObjects",
            "Effect": "Allow",
            "Principal": {
                "Service": "s3.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.bucket_name}/*"
        }
    ]
}
EOF
}
