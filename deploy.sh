#!/bin/bash
# Deploy webapp
export AWS_DEFAULT_REGION=us-west-2

# Build ember in production
ember build --environment=production

# Deploy ember app to s3
aws s3 sync ./dist s3://normalize.selby.io

echo "https://normalize.selby.io/"
