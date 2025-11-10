import { Stack } from '@mui/system';
import { InfoCardList, InfoCardUrl } from './InfoCard.styles';
import type { InfoCardProps } from './InfoCard.types';
import Grid from '@mui/material/Grid2';
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
        return content?.src ? (
          <img
            src={`data:image/png;base64,${content.src}`}
            alt={content.alt || 'Logo image'}
            className="file-thumbnail"
            style={{ maxWidth: 150 }}
          />
        ) : (
          <Paragraph variant="medium-regular">-</Paragraph>
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
