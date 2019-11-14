import validator from 'validator';

//Trims all objects in request body, if is a string then will also sanitize the string value
export const trimAndSanitize = async (body) => {
    Object.keys(body).map((key) => {
        body[key] = typeof body[key] === 'string' && key !== 'password' ? validator.trim(validator.blacklist(body[key], '<>$')) : validator.trim(body[key])
    })
    return body;
}