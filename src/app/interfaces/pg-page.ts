export interface PgPage {
  id: string;
  contentTypeId: string;
  title: string;
  description: string;
  keywords?: string;
  keywordsSearch?: string[];
  canonicalLink: string;
  preventIndexing: boolean;
  slug: string;
  blocks: Block[];
  modals: Block[];
  popup?: Block;
  template?: Block;
  footer: Block;
  header: Block;
  pageCaching?: number;
}

export interface Block {
  id: string;
  contentTypeId: string;
  contentType: string;
  fields?: any[];
  modalId?: string;
}
