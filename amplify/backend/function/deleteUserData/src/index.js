/* Amplify Params - DO NOT EDIT
	API_NANJI_GRAPHQLAPIIDOUTPUT
	API_NANJI_USERTABLE_ARN
	API_NANJI_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tablename = process.env.API_nanji_USERTABLE_NAME;

exports.handler = async event => {
  const ownerField = 'owner'; // owner is default value but if you specified ownerField on auth rule, that must be specified here
  const identityClaim = 'username'; // username is default value but if you specified identityField on auth rule, that must be specified here
  var condition = {};
  condition[ownerField] = {
    ComparisonOperator: 'EQ',
  };

  condition[ownerField]['AttributeValueList'] = [
    event.identity.claims[identityClaim],
  ];

  console.log(`EVENT: ${JSON.stringify(event)}`);

  //   await new Promise(async (res) => {

  //   })

  if (event.request.userAttriutes.sub) {
    let params = {
      TableName: process.env.API_nanji_USERTABLE_NAME,
      Key: {
        id: event.request.userAttriutes.sub,
      },
    };

    try {
      await dynamodb.deleteItem(params);
      console.log('Success');
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Error: ID is not defined');
  }

  //  Uncomment below to enable CORS requests
  //  headers: {
  //      "Access-Control-Allow-Origin": "*",
  //      "Access-Control-Allow-Headers": "*"
  //  },
};
