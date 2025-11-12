import type { SocialLink } from './InfoCard.types';

export type SocialLinkItem = {
  platform: string;
  url: string;
};

export function buildSocialLinks(
  socialValue?: SocialLink | null
): SocialLinkItem[] {
  const socialLinks: SocialLinkItem[] = [];

  if (
    socialValue?.Twitter &&
    typeof socialValue.Twitter === 'string' &&
    socialValue.Twitter.trim() !== ''
  ) {
    socialLinks.push({ platform: 'Twitter', url: socialValue.Twitter });
  }
  if (
    socialValue?.Facebook &&
    typeof socialValue.Facebook === 'string' &&
    socialValue.Facebook.trim() !== ''
  ) {
    socialLinks.push({
      platform: 'Facebook',
      url: socialValue.Facebook
    });
  }
  if (
    socialValue?.LinkedIn &&
    typeof socialValue.LinkedIn === 'string' &&
    socialValue.LinkedIn.trim() !== ''
  ) {
    socialLinks.push({
      platform: 'LinkedIn',
      url: socialValue.LinkedIn
    });
  }
  if (
    socialValue?.Instagram &&
    typeof socialValue.Instagram === 'string' &&
    socialValue.Instagram.trim() !== ''
  ) {
    socialLinks.push({
      platform: 'Instagram',
      url: socialValue.Instagram
    });
  }
  if (
    socialValue?.YouTube &&
    typeof socialValue.YouTube === 'string' &&
    socialValue.YouTube.trim() !== ''
  ) {
    socialLinks.push({ platform: 'YouTube', url: socialValue.YouTube });
  }

  return socialLinks;
}
