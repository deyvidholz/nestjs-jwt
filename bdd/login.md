Scenario: A user make a request to the authentication in the system.
Given: I set a payload with a bad formated email OR password
When: I post to /auth
Then: I receive a http status code of 400.

Scenario: A user make a request to the authentication in the system.
Given: I set a empty payload
When: I post to /auth
Then: I receive a http status code of 400

Scenario: A user make a request to the authentication in the system.
Given: I set up a payload with a non-registered email
When: I post to /auth
Then: I receive a http status code of 401

Scenario: A user make a request to the authentication in the system.
Given: I set a mismatching password in the payload
When: I post to /auth
Then: I receive a http status code of 401

Scenario: A user make a request to the authentication in the system.
Given: I set up a payload with valid credentials (email AND password)
When: I post to /auth
Then: I receive a status code of 200
And the field accessToken containing a valid jwt token
And the field expiresIn with a future timestamp.
