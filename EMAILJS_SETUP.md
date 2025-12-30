# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Copy your **Service ID**

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Contact Form Submission from {{from_first_name}} {{from_last_name}}

**Body:**
```
You have a new message from your portfolio contact form:

From: {{from_first_name}} {{from_last_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Zip Code: {{from_zipcode}}

Message:
{{message}}
```

4. Save the template
5. Copy your **Template ID**

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (also called User ID)
3. Copy it

## Step 5: Configure Your App
1. Create `.env.local` file in your project root (copy from `.env.local.example`)
2. Add your credentials:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Update `components/Contact.tsx` to use environment variables instead of placeholder strings

## Step 6: Update Contact Component
Replace the placeholder values in Contact.tsx:

```typescript
const result = await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  {
    from_first_name: formData.firstName,
    from_last_name: formData.lastName,
    from_email: formData.email,
    from_phone: formData.phone,
    from_zipcode: formData.zipCode,
    message: formData.message,
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

## Testing
1. Restart your dev server after adding `.env.local`
2. Fill out the contact form
3. Submit and check your email

## Free Tier Limits
- 200 emails/month
- Upgrade for more emails

## Troubleshooting
- Make sure all IDs are correct
- Check browser console for errors
- Verify email service is connected
- Test template in EmailJS dashboard
