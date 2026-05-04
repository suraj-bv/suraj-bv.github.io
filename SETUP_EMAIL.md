# Setting Up Email.js for Contact Form

Your contact form is now configured to send emails using **Email.js**. Follow these steps to enable it:

## Step 1: Sign Up for Email.js

1. Go to [emailjs.com](https://www.emailjs.com)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Add Your Email Service

1. In the Email.js dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose **Gmail** (or your preferred email provider)
4. For Gmail:
   - Sign in with your account (surajbv5566@gmail.com)
   - Authorize Email.js to send emails
   - Complete the setup

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use these template variables:
   - `{{from_name}}` - Visitor's name
   - `{{from_email}}` - Visitor's email
   - `{{message}}` - Message content

Example template:

```
Subject: New Contact Form Submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save the template and note the **Template ID** (looks like `template_xxxxx`)

## Step 4: Get Your Credentials

1. Go to **Account** > **API Keys**
2. Copy your **Public Key** (prefixed with key ID)
3. Go back to **Email Services** and copy your **Service ID** (looks like `service_xxxxx`)

## Step 5: Create `.env.local` File

In the project root, create a file named `.env.local` with:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

Replace the values with what you copied from Email.js.

## Step 6: Restart Dev Server

```bash
npm run dev
```

The contact form will now send emails directly to surajbv5566@gmail.com!

## Testing

1. Fill out the contact form on your website
2. Click "Send Message"
3. You should receive an email in your inbox

---

**Note:** Email.js has a free tier with up to 200 emails/month, perfect for a portfolio!
