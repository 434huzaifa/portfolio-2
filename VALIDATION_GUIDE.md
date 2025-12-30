# Portfolio Data Validation Guide

## Overview
Your portfolio now uses **Zod** for comprehensive data validation with specific error messages. Instead of showing a generic "data invalid" message, the system now displays exactly what's wrong and where.

## Features

### ✅ Specific Error Messages
When there's a validation error, you'll see:
- **Field Path**: Shows exactly where the error occurred (e.g., "hero → name")
- **Error Message**: Clear description of what's wrong
- **Multiple Errors**: All errors are displayed at once, not just the first one

### ✅ Better Developer Experience
- **No More Cryptic Errors**: Each error tells you exactly what field is missing or invalid
- **Quick Fix Guide**: Built-in tips for common validation issues
- **Reload Button**: Easy way to check if your fixes worked

### ✅ Validation Coverage
The system validates:
- **Required Fields**: Ensures all necessary data is present
- **Data Types**: Verifies strings, arrays, booleans are correct types
- **URLs**: Validates that links are properly formatted
- **Emails**: Checks email addresses are valid
- **Arrays**: Ensures collections have required minimum items

## Example Error Display

```
⚠️ Portfolio Data Validation Errors

There are 3 issue(s) with your portfolio data. Please fix the following errors in portfolio-data.json:

1. hero → socialLinks → github: GitHub URL must be valid
2. projects → categories → 0 → projects → 0 → techStack: At least one tech stack item is required
3. contact → email: Email must be valid
```

## Common Validation Rules

### Required Fields
- All section titles (e.g., `skills.title`, `experience.title`)
- Hero section: `name`, `title`, `tagline`, `description`
- Projects: `name`, `type`, `tagline`, `description`, `liveLink`
- Experience: `company`, `position`, `location`, `duration`

### URL Validation
URLs must start with `http://` or `https://`:
- `socialLinks.github`
- `socialLinks.linkedin`
- `socialLinks.whatsapp` (optional)
- `contact.whatsapp` (optional)
- Award links (optional)

### Email Validation
Must be valid email format:
- `hero.socialLinks.email`
- `contact.email`

### Arrays with Minimum Items
These arrays must have at least one item:
- `hero.primaryTech`
- `about.highlights`
- `about.focus`
- `skills.categories`
- `project.techStack`

## How to Fix Validation Errors

1. **Read the Error Path**: 
   - `hero → socialLinks → github` means check `hero.socialLinks.github` in your JSON

2. **Check the Error Message**:
   - "URL must be valid" → Ensure URL starts with `http://` or `https://`
   - "is required" → Add the missing field
   - "must be an array" → Wrap the value in square brackets `[]`
   - "At least one item required" → Add at least one item to the array

3. **Common Fixes**:
   ```json
   // ❌ Wrong
   "github": "github.com/username"
   
   // ✅ Correct
   "github": "https://github.com/username"
   
   // ❌ Wrong
   "techStack": "React"
   
   // ✅ Correct
   "techStack": ["React"]
   
   // ❌ Wrong - missing required field
   "hero": {
     "name": "John Doe"
     // missing title, tagline, description...
   }
   
   // ✅ Correct
   "hero": {
     "name": "John Doe",
     "title": "Software Engineer",
     "tagline": "Building amazing things",
     "description": "Passionate developer..."
   }
   ```

4. **Save and Reload**: Click the "🔄 Reload After Fixing" button or refresh the page

## Optional Fields

These fields can be omitted:
- `hero.photo`
- `hero.showPhoto`
- `hero.socialLinks.whatsapp`
- `contact.whatsapp`
- `project.thumbnail`
- `project.problem`
- `project.solution`
- `project.myRole`
- Most `visible` and `showInSeeMore` flags

## Tips

1. **Use a JSON Validator**: Tools like jsonlint.com can catch syntax errors
2. **Check Commas**: Missing or extra commas are common JSON errors
3. **Verify Quotes**: All strings must use double quotes `"`, not single quotes `'`
4. **Test URLs**: Make sure your URLs actually work in a browser
5. **Keep Backups**: Before making major changes, copy your working JSON

## Troubleshooting

### "Unexpected token" Error
- Check for missing commas between properties
- Look for trailing commas before closing braces `}`
- Ensure all strings are properly quoted

### URL Validation Failing
- URLs must include the protocol: `https://` or `http://`
- No spaces in URLs
- Use URL encoding for special characters

### Array Validation Failing
- Ensure arrays use square brackets: `[]`
- Arrays with minimum requirements need at least one item
- Array items should be properly formatted

## Getting Help

If you're stuck:
1. Check the browser console for detailed Zod validation output
2. Look at the example `portfolio-data.json` for proper structure
3. Compare your data structure with the TypeScript types in `lib/types.ts`
4. Review the Zod schemas in `lib/portfolio-utils.ts`

---

**Note**: The validation system is designed to help you catch errors early. If you see a validation error page, don't worry - just follow the error messages to fix the issues in your JSON file.
