export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    caption: string;
    // imageUrl?: URL | undefined | string;
    file: File[];
    
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    file: File[];
    imageUrl?: URL | string;
  };
  
  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    profilePictureUrl?: string;
    bio?: string;
    phoneNumber?: string;
    totalFollowing?: number | string | undefined;
    totalFollowers?: number | string | undefined;

  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
    passwordRepeat: string;
  };
  
export interface Post {
  posts: PostElement[];
}

export interface PostElement {
  id:         string;
  userId:     string;
  imageUrl?:   string;
  caption?:    string;
  isLike:     boolean;
  totalLikes: number;
  user?:       IUser;
  createdAt:  Date;
  updatedAt:  Date;
}