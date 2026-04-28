export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0
}

export interface ValidationResult {
  valid: boolean
  message: string
}

export function validateLoginForm(email: string, password: string): ValidationResult {
  if (!isNonEmpty(email)) {
    return { valid: false, message: 'Email is required' }
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: 'Please enter a valid email address' }
  }
  if (!isNonEmpty(password)) {
    return { valid: false, message: 'Password is required' }
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' }
  }
  return { valid: true, message: '' }
}

export function validateSignupForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): ValidationResult {
  if (!isNonEmpty(name)) {
    return { valid: false, message: 'Full name is required' }
  }
  if (!isNonEmpty(email)) {
    return { valid: false, message: 'Email is required' }
  }
  if (!isValidEmail(email)) {
    return { valid: false, message: 'Please enter a valid email address' }
  }
  if (!isNonEmpty(password)) {
    return { valid: false, message: 'Password is required' }
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' }
  }
  if (password !== confirmPassword) {
    return { valid: false, message: 'Passwords do not match' }
  }
  return { valid: true, message: '' }
}
