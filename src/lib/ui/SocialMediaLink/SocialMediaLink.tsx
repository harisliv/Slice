import Link from '@mui/material/Link';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon
} from '@app/lib/icons';
import type { SocialLinkProps } from './SocialMediaLink.types';
import {
  LinkWrapper,
  IconWrapper,
  TextWrapper
} from './SocialMediaLink.styles';
import { Box } from '@mui/material';

const IconComponent = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'Facebook':
      return <FacebookIcon />;
    case 'Instagram':
      return <InstagramIcon />;
    case 'LinkedIn':
      return <LinkedinIcon />;
    case 'Twitter':
      return <XIcon />;
    case 'YouTube':
      return <YoutubeIcon />;
    default:
      return null;
  }
};

export default function SocialLink({ platform, url }: SocialLinkProps) {
  return (
    <Box display="flex" alignItems="center">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        <LinkWrapper>
          <IconWrapper>
            <IconComponent platform={platform} />
          </IconWrapper>
          <TextWrapper>{url}</TextWrapper>
        </LinkWrapper>
      </Link>
    </Box>
  );
}
