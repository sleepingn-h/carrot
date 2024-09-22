type Fetch = {
  id: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  editedAt?: {
    seconds: number;
    nanoseconds: number;
  };
};

type User = {
  userID: string;
  userName: string;
  photoURL: string;
};

export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type GeoArticle = { lat: number | null; lng: number | null };

export type SimpleArticle = {
  __type: string;
  name: string;
  imageURL: string;
  price: number | null;
  category: string;
  desc: string;
  area: string;
  user: User;
  geocode: GeoArticle;
};

export type FetchArticle = SimpleArticle & Fetch;

export type SimpleBizArticle = {
  __type: string;
  name: string;
  imageURL: string;
  url: string;
  price?: number | null;
  category: string;
  desc: string;
  area: string;
  user: User;
};

export type FetchBizArticle = SimpleBizArticle & Fetch;

export type ArticleKeys = keyof FetchArticle;

export type Nearby = {
  category: string;
  title: string;
  content: string;
  user: User;
  area: string;
  comments: Comment[];
};

export type Comment = {
  comment: string;
  user: User;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
};

export type FetchNearby = Nearby & Fetch;
