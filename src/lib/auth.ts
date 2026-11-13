export type StudentSession = {
  userId: string;
  displayName: string;
  email: string;
  batch: string;
  loggedInAt: string;
};

const STORAGE_KEY = 'zs_student_session';

/** Demo portal credentials for local / staging LMS access. */
export const DEMO_STUDENT = {
  userId: 'student',
  email: 'student@zssofttech.com',
  password: 'student123',
  displayName: 'ZS Student',
  batch: 'QA Testing · 2026',
} as const;

export function authenticateStudent(
  userIdOrEmail: string,
  password: string
): StudentSession | null {
  const id = userIdOrEmail.trim().toLowerCase();
  const pwd = password;

  const matchesDemo =
    (id === DEMO_STUDENT.userId || id === DEMO_STUDENT.email) &&
    pwd === DEMO_STUDENT.password;

  if (!matchesDemo) return null;

  return {
    userId: DEMO_STUDENT.userId,
    displayName: DEMO_STUDENT.displayName,
    email: DEMO_STUDENT.email,
    batch: DEMO_STUDENT.batch,
    loggedInAt: new Date().toISOString(),
  };
}

export function saveSession(session: StudentSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('zs-auth-change'));
}

export function getSession(): StudentSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StudentSession;
    if (!parsed?.userId || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('zs-auth-change'));
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
