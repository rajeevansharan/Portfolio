# NodeMailer Email Setup Guide

## 📧 Implementation Complete!

Your contact form now uses **NodeMailer** to send emails directly to your inbox instead of EmailJS.

---

## 🚀 Setup Instructions

### Step 1: Install NodeMailer

Run this command in your project terminal:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 2: Configure Email Credentials

#### Option A: Using Gmail (Recommended for beginners)

1. **Enable 2-Step Verification**

   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click on "2-Step Verification" and enable it

2. **Generate App Password**

   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Create `.env.local` file** in your project root:

```env
EMAIL_USER=rajeevansharan@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

#### Option B: Using Other Email Providers

**Outlook/Hotmail:**

```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

Update `route.ts`: Change `service: 'gmail'` to `service: 'hotmail'`

**Custom SMTP (e.g., custom domain):**

```env
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
```

Uncomment the alternative transporter configuration in `route.ts`

### Step 3: Update `.gitignore`

Make sure `.env.local` is in your `.gitignore` file (it should be by default):

```
# .gitignore
.env.local
.env*.local
```

### Step 4: Test the Implementation

1. Start your development server:

```bash
npm run dev
```

2. Go to the contact section on your portfolio

3. Fill out the form and submit

4. Check your email inbox for:
   - Message from the contact form (with sender details)
   - Check sender's email for auto-reply confirmation

---

## 📂 Files Created/Modified

### New Files:

1. **`app/api/send-email/route.ts`**

   - API endpoint that handles email sending
   - Uses NodeMailer to send emails
   - Sends two emails:
     - One to YOU with the contact form details
     - One to the SENDER as an auto-reply

2. **`.env.local.example`**
   - Template for environment variables
   - Copy this to `.env.local` with your real credentials

### Modified Files:

1. **`components/ui/contact.tsx`**
   - Removed EmailJS dependency
   - Updated to call `/api/send-email` endpoint
   - Better error handling

---

## ✨ Features Implemented

### 1. Email to You (Portfolio Owner)

- **Subject:** "New Contact Form Message from [Name]"
- **Contains:**
  - Sender's name
  - Sender's email (clickable)
  - Message content
  - Timestamp
  - Professional HTML formatting

### 2. Auto-Reply to Sender

- **Subject:** "Thank you for contacting me!"
- **Contains:**
  - Personalized greeting with their name
  - Confirmation that message was received
  - Copy of their message
  - Expected response time
  - Your contact details
  - Professional branding

### 3. Security Features

- ✅ Input validation (name, email, message)
- ✅ Email format validation
- ✅ Environment variables for credentials
- ✅ Error handling with user-friendly messages
- ✅ CORS protection (API route only accessible from your domain in production)

### 4. User Experience

- ✅ Loading states during submission
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ No page refresh needed
- ✅ Validation feedback

---

## 🔧 Troubleshooting

### Issue: "Failed to send email"

**Solution 1: Check credentials**

```bash
# Verify your .env.local file exists and has correct values
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Solution 2: For Gmail - Use App Password**

- DO NOT use your regular Gmail password
- You MUST generate an App Password (see Step 2 above)

**Solution 3: Allow Less Secure Apps (Gmail legacy)**

- If you can't use App Password, go to [Less secure apps](https://myaccount.google.com/lesssecureapps)
- Enable "Allow less secure apps" (NOT recommended)

### Issue: "Connection timeout"

**Check your firewall/antivirus:**

- Some security software blocks SMTP ports
- Temporarily disable and test

**Try different ports:**

```typescript
// In route.ts, try port 465 with secure: true
port: 465,
secure: true,
```

### Issue: Emails going to spam

**Solution:**

- Add your domain to SPF records (for production)
- Use a professional email (not Gmail) for production
- Send test emails to yourself first

---

## 🌐 Production Deployment (Vercel/Netlify)

### On Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `EMAIL_USER` = your email
   - `EMAIL_PASSWORD` = your app password
4. Redeploy your site

### On Netlify:

1. Go to Site settings > Build & deploy > Environment
2. Add the same variables
3. Redeploy

---

## 📊 Email Flow Diagram

```
User fills form
    ↓
Clicks "Send Message"
    ↓
Form validates input
    ↓
Sends POST request to /api/send-email
    ↓
NodeMailer processes request
    ↓
    ├─→ Email sent to YOU (portfolio owner)
    │   - Subject: "New Contact Form Message from [Name]"
    │   - Contains: Name, Email, Message, Timestamp
    │
    └─→ Auto-reply sent to SENDER
        - Subject: "Thank you for contacting me!"
        - Contains: Confirmation, Message copy, Response time
    ↓
Success message displayed to user
    ↓
Form resets
```

---

## 🎨 Customization Options

### Change Email Templates

Edit the HTML in `app/api/send-email/route.ts`:

```typescript
// For the email to yourself
const mailOptionsToYou = {
  subject: `Custom subject here`,
  html: `Your custom HTML here`,
};

// For the auto-reply
const mailOptionsToSender = {
  subject: `Custom auto-reply subject`,
  html: `Your custom auto-reply HTML`,
};
```

### Add CC/BCC

```typescript
const mailOptionsToYou = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  cc: "manager@company.com", // Carbon copy
  bcc: "backup@company.com", // Blind carbon copy
  // ... rest of config
};
```

### Add Attachments

```typescript
const mailOptions = {
  // ... other options
  attachments: [
    {
      filename: "portfolio.pdf",
      path: "./public/cv.pdf",
    },
  ],
};
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to Git
2. **Use App Passwords** for Gmail (not regular password)
3. **Rotate passwords** regularly
4. **Use environment variables** in production
5. **Enable 2FA** on your email account
6. **Monitor your email** for unusual activity
7. **Rate limiting** (optional): Add rate limiting to prevent spam

---

## ⚡ Next Steps (Optional Enhancements)

### 1. Add Rate Limiting

Prevent spam by limiting submissions:

```bash
npm install rate-limiter-flexible
```

### 2. Add CAPTCHA

Integrate Google reCAPTCHA:

```bash
npm install react-google-recaptcha
```

### 3. Add Email Queue

For high traffic, use a queue system:

```bash
npm install bull
```

### 4. Database Logging

Store form submissions in a database:

- Firebase, Supabase, MongoDB, etc.

---

## ✅ Testing Checklist

- [ ] Install nodemailer package
- [ ] Create `.env.local` with credentials
- [ ] Test with your own email first
- [ ] Check spam folder
- [ ] Verify both emails are received
- [ ] Test error handling (wrong credentials)
- [ ] Test validation (empty fields)
- [ ] Test on mobile device
- [ ] Test in production environment
- [ ] Verify environment variables in deployment

---

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify `.env.local` credentials
3. Test with a simple email first
4. Check email provider's SMTP settings
5. Review NodeMailer documentation: [nodemailer.com](https://nodemailer.com/)

---

**🎉 Congratulations!** Your contact form is now production-ready with professional email functionality!
