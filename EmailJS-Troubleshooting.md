# EmailJS Troubleshooting Guide

## Overview of Changes Made

We've made several improvements to fix the EmailJS contact form issues:

1. **Updated the EmailJS SDK** from v2.6.4 to v3.11.0 (the latest version)
2. **Improved error handling** with detailed console logs and user-friendly error messages
3. **Added a timestamp parameter** to prevent potential caching issues
4. **Created a standalone test page** (`public/emailjs-test.html`) to isolate and troubleshoot EmailJS issues
5. **Provided an alternative implementation** (`public/javascripts/contact-alternative.js`) that tries multiple approaches

## Common EmailJS Issues and Solutions

### 1. Service/Template ID Issues

**Problem:** The most common issue is incorrect Service ID or Template ID.

**Solution:**
- Log into your EmailJS dashboard: https://dashboard.emailjs.com/
- Verify your service ID (`service_8lomhfn`) and template ID (`template_fyodjdo`) are correct
- Ensure the template parameters match what you're sending (`from_name`, `email_id`, `subject`, `message`)

### 2. CORS Issues

**Problem:** EmailJS requests may be blocked by CORS policies, especially during local development.

**Solution:**
- Make sure your EmailJS account allows requests from your domain
- In EmailJS dashboard, go to "Account" → "Security" and add your domains
- For local testing, add `http://localhost:3000` to allowed domains

### 3. Rate Limiting and Usage Limits

**Problem:** Free EmailJS accounts have usage limitations.

**Solution:**
- Check if you've hit the free tier limits (200 emails/month)
- Consider upgrading your EmailJS plan if needed
- Check your EmailJS dashboard for any account warnings

### 4. Template Parameter Mismatch

**Problem:** The parameters you're sending don't match what the template expects.

**Solution:**
- In your EmailJS dashboard, check the template to see what variables it expects
- Make sure the form field names match the template variables
- The current implementation uses: `from_name`, `email_id`, `subject`, and `message`

### 5. Network/Connection Issues

**Problem:** Network issues can prevent the form from working.

**Solution:**
- Try the standalone test page (`emailjs-test.html`) which provides detailed logs
- Check browser console for network errors
- Try from a different network connection

## How to Use the Alternative Implementation

To use the alternative implementation:

1. Edit `src/index.tsx` and change:
   ```html
   <script src="/javascripts/main.js" defer></script>
   ```
   to:
   ```html
   <script src="/javascripts/contact-alternative.js" defer></script>
   ```

2. Rebuild and deploy the site

The alternative implementation:
- Tries both `send()` and `sendForm()` methods if the first one fails
- Has better error reporting
- Includes automatic status message clearing when typing
- Has more robust initialization

## Testing With the Standalone Page

1. Open `emailjs-test.html` in your browser
2. Fill out the form and submit
3. Check the debug console at the bottom for detailed logs
4. If this works but the main site doesn't, compare the implementations

## Contact

If issues persist, please check your EmailJS dashboard for any account-specific issues or contact EmailJS support. 