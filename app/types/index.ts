export type TCategory = {
    id: string;
    catName: string;
  };

export type TProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  publicId?: string;
  createdAt: string;
  catName?: string;
  spots: string;
  location: string;
  eventTime: string;
  authorEmail: string;
  author: {
    name: string;
  };
}