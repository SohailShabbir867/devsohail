# EmailJS setup

1. Create an EmailJS service and two templates: a contact notification and an automatic reply.
2. Set the notification template's recipient to `{{to_email}}` and reply-to to `{{reply_to}}`. It receives `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{message}}`, and `{{to_email}}`.
3. Set the automatic reply template's recipient to `{{email}}` (or `{{to_email}}`) and reply-to to `{{reply_to}}`. It receives `{{to_name}}`, `{{email}}`, `{{to_email}}`, `{{from_name}}`, `{{reply_to}}`, and `{{message}}`.
4. Copy `.env.example` to `.env.local`, fill in the EmailJS service ID, both template IDs, and the EmailJS public key. Restart the Vite server after changing environment values.
5. Add the same variables to the production hosting environment before deploying.

The public key is exposed in the browser by design. Do not put an EmailJS private key in a `VITE_` variable or commit real environment values.
