# Authentication, Authorization, Validation, Verification — Notes

## Overview
- **Authentication:** Proving identity (who you are).
- **Authorization:** Determining permissions (what you can do).
- **Validation:** Ensuring inputs meet format/constraints.
- **Verification:** Confirming claims or states (e.g., email/phone verification, 2FA).

---

## Authentication (AuthN)
- Goal: Uniquely identify a user or system.
- Common methods: passwords, OAuth/OIDC, API keys, JWTs, client certificates, PKI.
- Session vs token:
  - Sessions: server-side state (cookie + session id).
  - Tokens (JWT): stateless; signed claims; verify signature + expiry.
- Best practices:
  - Use adaptive/hashed password storage (bcrypt/argon2) with salt.
  - Use secure cookie flags: `HttpOnly`, `Secure`, `SameSite`.
  - Short-lived access tokens + refresh tokens.
  - Rate-limit authentication endpoints and add CAPTCHA on risky flows.
- Threats: credential stuffing, brute force, stolen tokens, replay attacks.

## Authorization (AuthZ)
- Goal: Enforce access control to resources and actions.
- Models:
  - RBAC (Role-Based Access Control)
  - ABAC (Attribute-Based Access Control)
  - ACLs (Access Control Lists)
- Principles:
  - Least privilege: grant minimal rights.
  - Deny by default: allow only explicit permissions.
  - Use centralized policy service or middleware where possible.
- Implementation tips:
  - Check authorization server-side for every sensitive action.
  - Avoid relying on front-end checks for enforcement.
  - Use resource-based checks (owner vs non-owner) + role checks.

## Validation
- Purpose: Prevent malformed, unexpected, or malicious input.
- Types:
  - Syntactic (types, formats), semantic (business rules), and security (sanitization).
- Techniques:
  - Validate on server-side always; client-side only for UX.
  - Use strong typing/validation libraries (Joi, Yup, Zod, express-validator).
  - Normalize data (trim, canonicalize) before validation.
  - Reject vs sanitize: prefer reject for ambiguous input.
- Avoid: Allowing unchecked JSON or trusting size/content limits.

## Verification
- Use cases: confirm email/phone, enroll MFA, verify identity documents.
- Patterns:
  - Send one-time codes (OTPs) or verification links with time-limited tokens.
  - Rate-limit verification attempts and expire tokens.
  - Record verification status in user profile (verified_email: true).
- Security notes:
  - Signed tokens for links (HMAC or JWT) to avoid arbitrary token guessing.
  - Use separate channels for recovery (avoid sending secrets over insecure channels).

## Flows & Examples (high-level)
- Registration:
  1. Validate input (email, password strength).
  2. Hash password and create user record with `verified=false`.
  3. Send verification email with signed token.
- Login:
  1. Validate input.
  2. Authenticate credentials.
  3. Issue access token (short) + refresh token (long, stored securely).
  4. Attach session or token to client with secure cookie or Authorization header.
- Authorization check example:
  - On `DELETE /posts/:id`, verify `user.id === post.ownerId` OR user has `admin` role.

## Best Practices Checklist
- Use HTTPS everywhere.
- Store minimal sensitive data; encrypt at rest when needed.
- Implement account lockouts + notify users on suspicious activity.
- Log auth events (login success/fail, password changes) for audit.
- Use MFA for high-risk accounts and actions.
- Keep tokens short-lived; use refresh token rotation.

## Common Pitfalls
- Trusting client-side checks for security.
- Using unsalted/fast hashes for passwords.
- Not expiring or revoking tokens on logout/password change.
- Mixing authentication and authorization logic in the wrong layers.

## References / Resources
- OWASP Authentication Cheat Sheet
- OWASP Session Management Cheat Sheet
- RFC 7519 (JWT)
- NIST Digital Identity Guidelines

---

If you want, I can:
- Add code examples (Express + JWT + bcrypt) into Day-09/Backend.
- Convert this to a `txt` file to match existing notes.
