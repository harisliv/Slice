import { useState } from 'react';
import { Stack } from '@mui/system';
import { InfoCardList, InfoCardUrl } from './InfoCard.styles';
import type { InfoCardProps } from './InfoCard.types';
import Grid from '@mui/material/Grid2';
import { CircularProgress, Box } from '@mui/material';
import SocialLink from '../SocialMediaLink';
import PdfLink from '../PdfLink';
import { Paragraph } from '../Global';
import { convertFileSize } from '@app/lib/general';
import { buildSocialLinks } from './infoCard.utils';

export default function InfoCard({ title, content }: InfoCardProps) {
  function renderContent() {
    switch (content?.type) {
      case 'text':
        return (
          <Paragraph variant="medium-regular">
            {content?.value && content?.value !== '' ? content?.value : '-'}
          </Paragraph>
        );

      case 'number':
        return (
          <Paragraph variant="medium-regular">
            {content?.value && !isNaN(content?.value) ? content?.value : '-'}
          </Paragraph>
        );

      case 'url':
        return content?.value && content?.value !== '' ? (
          <InfoCardUrl
            href={content.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.value}
          </InfoCardUrl>
        ) : (
          <Paragraph variant="medium-regular">-</Paragraph>
        );

      case 'social':
        const socialLinks = buildSocialLinks(content.value);

        if (socialLinks.length === 0) {
          return <Paragraph variant="medium-regular">-</Paragraph>;
        }

        return (
          <Grid container spacing={2} marginTop={1}>
            {socialLinks.map(({ platform, url }) => (
              <Grid key={platform} size={{ sm: 4, xs: 12 }} container>
                <SocialLink platform={platform} url={url} />
              </Grid>
            ))}
          </Grid>
        );

      case 'list':
        return content?.value?.length ? (
          <InfoCardList $showDot={content?.showDot}>
            {content.value?.map((item, index) => (
              <li key={index}>
                <Paragraph variant="medium-regular">{item}</Paragraph>
              </li>
            ))}
          </InfoCardList>
        ) : (
          <Paragraph variant="medium-regular">-</Paragraph>
        );

      case 'doc':
        return content?.value?.filename ? (
          <PdfLink
            filename={content.value?.filename}
            url={content.value?.url}
            size={content.value?.size}
          />
        ) : (
          <Paragraph variant="medium-regular">-</Paragraph>
        );

      case 'docMultiple':
        return content?.value?.length ? (
          <div>
            {content?.value?.map((fileReport) => (
              <PdfLink
                key={fileReport?.filename}
                filename={fileReport?.filename}
                url={fileReport?.url}
                size={convertFileSize(fileReport?.size)}
              />
            ))}
          </div>
        ) : (
          <Paragraph variant="medium-regular">-</Paragraph>
        );

      case 'image':
        if (!content?.src) {
          return <Paragraph variant="medium-regular">-</Paragraph>;
        }

        return (
          <ImageWithLoading
            src={content.src}
            alt={content.alt || 'Logo image'}
          />
        );

      default:
        return null;
    }
  }

  return (
    <Stack>
      {content?.type === 'list' && content.doubleTitle && (
        <Paragraph variant="medium-bold">{content.doubleTitle}</Paragraph>
      )}
      <Paragraph variant="medium-bold">{title}</Paragraph>
      {renderContent()}
    </Stack>
  );
}

// Component to handle image loading state for URL images
function ImageWithLoading({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block', maxWidth: 150 }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      {hasError ? (
        <Paragraph variant="medium-regular">Failed to load image</Paragraph>
      ) : (
        <img
          src={src}
          alt={alt}
          className="file-thumbnail"
          style={{
            maxWidth: 150,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Box>
  );
}
