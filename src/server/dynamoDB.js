const dynamoDBPutItemURL = 'https://4yiapq6tx7.execute-api.us-east-1.amazonaws.com/default/subscriptions'

export const dynamoDBPutItem = async (uid, userEmail, subscriptionType, licenseExpiryDate, trialPeriod) => {
    const results = await fetch(dynamoDBPutItemURL, {
        method: 'POST',
        body: JSON.stringify({
            uid,
            userEmail,
            subscriptionType,
            licenseExpiryDate,
            trialPeriod
        })
    });

    return results.json();
}