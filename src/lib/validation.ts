const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

const COMMON_WEAK_PASSWORDS = new Set([
  'password', 'password1', 'password12', 'password123', 'passw0rd',
  '12345678', '123456789', '1234567890', '87654321',
  'qwerty123', 'qwertyui', 'qwertyuiop', '1q2w3e4r',
  'letmein', 'letmein1', 'admin123', 'welcome1', 'welcome123',
  'iloveyou', 'monkey123', 'football', 'baseball', 'dragon123',
  'trustno1', 'abc12345', 'changeme', 'changeme1', 'zxcvbnm1',
  'sunshine', 'princess', 'superman', 'master123', '00000000',
  '11111111', 'abcdefgh', 'abcd1234', 'test1234', 'jobassistant',
]);

function hasLongRun(password: string, minRun = 4): boolean {
  const s = password.toLowerCase();
  let ascRun = 1;
  let descRun = 1;
  let repeatRun = 1;
  for (let i = 1; i < s.length; i++) {
    const prev = s.charCodeAt(i - 1);
    const curr = s.charCodeAt(i);
    ascRun = curr === prev + 1 ? ascRun + 1 : 1;
    descRun = curr === prev - 1 ? descRun + 1 : 1;
    repeatRun = curr === prev ? repeatRun + 1 : 1;
    if (ascRun >= minRun || descRun >= minRun || repeatRun >= minRun) return true;
  }
  return false;
}

/** Returns an error message if the password is too weak, or undefined if it's acceptable. */
export function getPasswordError(password: string): string | undefined {
  if (password.length < 8) {
    return 'Must be at least 8 characters long.';
  }
  const lower = password.toLowerCase().trim();
  if (COMMON_WEAK_PASSWORDS.has(lower)) {
    return 'That password is too common. Choose something harder to guess.';
  }
  if (/^\d+$/.test(password)) {
    return 'Use more than just numbers.';
  }
  if (hasLongRun(password)) {
    return 'Avoid simple sequences or repeated characters, like "12345678" or "aaaaaaaa".';
  }
  return undefined;
}
