export type InfoCardContent =
  | { type: 'text'; value?: string | null }
  | { type: 'number'; value?: number | null }
  | { type: 'url'; value?: string | null }
  | { type: 'social'; value?: SocialLink | null }
  | {
      type: 'list';
      value?: string[] | null;
      doubleTitle?: string;
      showDot?: boolean;
    }
  | {
      type: 'doc';
      value?: { filename: string; url: string; size: string } | null;
    }
  | {
      type: 'docMultiple';
      value?: { filename: string; url: string; size: number }[] | null;
    }
  | { type: 'image'; src?: string | null; alt?: string | null };

export interface InfoCardProps {
  title?: string;
  content?: InfoCardContent;
}

export type SocialLink = {
  [key: string]: string | null;
};
