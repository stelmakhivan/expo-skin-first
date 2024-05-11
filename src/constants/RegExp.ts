// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// Simple phone number validation, for now only for US numbers
// Probably it's better to use a library like libphonenumber
export const PHONE_REGEXP = /^(\+\d{1,3}\s?)?(\d{3}\s?){2}\d{4,6}$/g;
