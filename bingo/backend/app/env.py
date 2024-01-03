import boto3

def getDBPassword(region, name):
    session = boto3.Session()

    creds = session.get_credentials()

    current_creds = creds.get_frozen_credentials()

    AWS_REGION = region

    ssmClient = boto3.client("ssm", region_name=AWS_REGION, aws_access_key_id=current_creds.access_key, aws_secret_access_key=current_creds.secret_key)

    response = ssmClient.get_parameters(Names=[name], WithDecryption=True)

    return response['Parameters'][0]['Value']
