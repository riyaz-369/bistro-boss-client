/**
 * 1. install stripe and stripe react
 * 2. create card element
 * 3. create stripe account and get publishable(pk) key
 * 4. use publishable key and usee stripe to get card information and error
 * 5. create payment intent post in the server. and return client secret. install stripe on the server side and get client secret. make sure you used the
 *    payment method type: ["card"]
 * 6. from client side get the client secret and save it state.
 * 7. use confirm card payment and pass user information, card and client secret
 * 8. display transaction id
 */
