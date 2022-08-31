const stripeCheckoutURL = 'https://6sw3d8obja.execute-api.us-east-1.amazonaws.com/default/';
const stripeCustomerPortalURL = 'https://zb0q5aym3j.execute-api.us-east-1.amazonaws.com/default/'

export const createCheckoutSession = async (lookup_key) => {
    const result = await fetch(stripeCheckoutURL, {
        method: 'POST',
        body: JSON.stringify({
            lookup_key: lookup_key
        })
    })

    return result.json();
}

export const createCustomerPortalSession = async (session_id) => {
    const result = await fetch(stripeCustomerPortalURL, {
        method: 'POST',
        body: JSON.stringify({
            session_id: session_id

        })
    })

    return result.json();
}