## Description

- This is a [Next.js](https://nextjs.org/) project.
- The app is hosted on AWS Amplify. (new versions are automatically deployed from main branch)
- Media files are hosted separately on s3 and served through Cloudfront.

## Media optimization

Before uploading media to S3 it should be optimized using image and video generators.

```bash
node ./data-utils/image-generator.mjs
```

```bash
node ./data-utils/video-generator.mjs
```

Run the app:

```bash
npm run dev
```
