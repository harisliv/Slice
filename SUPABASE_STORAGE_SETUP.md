# Supabase Storage Setup Guide

## Overview

This application uses Supabase Storage to store files (images and PDFs) instead of storing them as base64 in the database. This provides better performance and scalability.

## Storage Buckets

The application requires two storage buckets:

1. **`course-assets`** - For course logos and images
2. **`course-documents`** - For progress reports and PDF documents

## Setup Instructions

### 1. Create Storage Buckets

You need to create the storage buckets in your Supabase project. You can do this via:

#### Option A: Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Create bucket named `course-assets`:
   - Name: `course-assets`
   - Public: ✅ **Yes** (so files can be accessed via public URLs)
   - File size limit: 5 MB (or as needed)
   - Allowed MIME types: `image/jpeg`, `image/png`, `image/jpg`
5. Create bucket named `course-documents`:
   - Name: `course-documents`
   - Public: ✅ **Yes**
   - File size limit: 25 MB (or as needed)
   - Allowed MIME types: `application/pdf`

#### Option B: SQL (via Supabase SQL Editor)

```sql
-- Create course-assets bucket for logos and images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-assets',
  'course-assets',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/jpg']
);

-- Create course-documents bucket for PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-documents',
  'course-documents',
  true,
  26214400, -- 25 MB
  ARRAY['application/pdf']
);
```

### 2. Set Up Storage Policies

You need to set up Row Level Security (RLS) policies to allow file uploads and access. Run these SQL commands in the Supabase SQL Editor:

```sql
-- Policy for course-assets bucket: Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads to course-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-assets');

-- Policy for course-assets bucket: Allow public read access
CREATE POLICY "Allow public read access to course-assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'course-assets');

-- Policy for course-documents bucket: Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads to course-documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-documents');

-- Policy for course-documents bucket: Allow public read access
CREATE POLICY "Allow public read access to course-documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'course-documents');

-- Optional: Allow users to delete their own files
CREATE POLICY "Allow authenticated delete from course-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-assets');

CREATE POLICY "Allow authenticated delete from course-documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-documents');
```

### 3. Edge Function Configuration

The Edge Function `file-upload` requires the `SUPABASE_SERVICE_ROLE_KEY` environment variable to be set. This is automatically available in Supabase Edge Functions, but you can verify it in your Supabase dashboard under **Settings > API**.

### 4. File Structure

Files are organized in storage as follows:

```
course-assets/
  └── {courseId}/
      └── logos/
          └── {timestamp}-{filename}

course-documents/
  └── {courseId}/
      └── reports/
          └── {timestamp}-{filename}
```

### 5. Environment Variables

Make sure your `.env` file has:

```env
VITE_API_URL=https://zuhicljjejsotxhqealn.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## How It Works

### File Upload Flow

1. **User selects a file** in the frontend (logo or PDF)
2. **Frontend calls** the Edge Function: `/functions/v1/document/upload/{courseId}/type/{type}`
3. **Edge Function**:
   - Receives the file via multipart/form-data
   - Determines the appropriate bucket based on file type
   - Uploads the file to Supabase Storage
   - Returns the file path
4. **Frontend** constructs the public URL and stores it in the form data

### URL Format

Public URLs are generated in the format:

```
{SUPABASE_URL}/storage/v1/object/public/{bucket}/{filePath}
```

Example:

```
https://zuhicljjejsotxhqealn.supabase.co/storage/v1/object/public/course-assets/initiative-1/logos/1234567890-logo.jpg
```

## Logo Storage

Logos are stored as **Supabase Storage URLs** in the database:

- Logos are uploaded to the `course-assets` bucket
- The storage URL is stored in the `initiative_profiles.data.logoUrl` field
- Maximum file size: 1 MB
- Supported formats: JPEG, PNG

## Testing

After setup, test the file upload:

1. Go to Course Profile > Course Information
2. Try uploading a logo (should work with base64 or storage)
3. Go to Goals, Targets and Monitoring > Monitoring
4. Try uploading a progress report PDF (should use Supabase Storage)

## Troubleshooting

### Error: "Bucket not found"

- Make sure you've created both buckets in Supabase Storage
- Check bucket names match exactly: `course-assets` and `course-documents`

### Error: "Permission denied"

- Verify RLS policies are set up correctly
- Check that buckets are set to public
- Ensure the Edge Function has access to `SUPABASE_SERVICE_ROLE_KEY`

### Error: "File too large"

- Check bucket file size limits
- Adjust limits in bucket settings if needed

### Files not accessible

- Verify buckets are set to **public**
- Check that the public URL format is correct
- Ensure RLS policies allow public read access

## Security Considerations

- **Public buckets**: Files are publicly accessible via URL. If you need private files, adjust the policies accordingly.
- **Service role key**: The Edge Function uses the service role key which has full access. Keep it secure.
- **File validation**: The Edge Function validates file types, but you may want to add additional validation.

## Migration from Base64

If you're migrating existing base64 logos to Supabase Storage:

1. Create a migration script to:
   - Read base64 data from database
   - Convert to file
   - Upload to Supabase Storage
   - Update database with new URL
2. Run the migration
3. Update the frontend to use storage URLs

---

**Last Updated**: 2025-01-09
