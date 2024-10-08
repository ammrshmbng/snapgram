import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
// import { LikedPosts } from "@/_root/pages";
import {
  useFollowUser,
  useGetMyFollowing,
  useGetPostsByUserId,
  useGetUserById,
  useUnfollowUser,
} from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import { useUserContext } from "@/context/useUserContext";
import { IUser } from "@/types";

interface StabBlockProps {
  value: string | number | undefined;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="gap-2 flex-center">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const { data } = useGetUserById(id || "") as any;
  const { data: posts } = useGetPostsByUserId(id || "") as any;
  const currentUser = data?.data.data as IUser;

  // query for get my following
  const { data: myFollowing, isLoading: isLoadingMyFollowing } =
    useGetMyFollowing();
  const myFollowingUsersId = myFollowing?.data.users.map((user: any) => user.id);
 console.log(myFollowingUsersId)
  // query to follow and unfollow
  const { mutateAsync: followUser, isPending: isLoadingFollow } = useFollowUser();
  const { mutateAsync: unfollowUser, isPending: isLoadingUnfollow } = useUnfollowUser();


  const handleFollowUser = async () => {
    
    try {
      await followUser(id || "");
      // Anda mungkin ingin memperbarui UI atau melakukan tindakan lain setelah berhasil mengikuti
    } catch (error) {
      console.error("Gagal mengikuti pengguna:", error);
      // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna
    }
  };


  const handleUnfollowUser = async () => {
    try {
      await unfollowUser(id || "");
      // Anda mungkin ingin memperbarui UI atau melakukan tindakan lain setelah berhasil berhenti mengikuti
    } catch (error) {
      console.error("Gagal berhenti mengikuti pengguna:", error);
      // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna
    }
  };

  if (!currentUser)
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-col flex-1 xl:flex-row max-xl:items-center gap-7">
          <img
            src={
              currentUser.profilePictureUrl ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="rounded-full w-28 h-28 lg:h-36 lg:w-36"
          />
          <div className="flex flex-col justify-between flex-1 md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="w-full text-center xl:text-left h3-bold md:h1-semibold">
                {currentUser.name}
              </h1>
              <p className="text-center small-regular md:body-medium text-light-3 xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="z-20 flex flex-wrap items-center justify-center gap-8 mt-10 xl:justify-start">
              <StatBlock value={posts?.data.totalItems} label="Posts" />
              <StatBlock value={currentUser.totalFollowers} label="Followers" />
              <StatBlock value={currentUser.totalFollowing} label="Following" />
            </div>

            <p className="max-w-screen-sm text-center small-medium md:base-medium xl:text-left mt-7">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${(myFollowingUsersId?.includes(id) || id === user.id) && "hidden"}`}>
              <Button type="button" className="px-8 shad-button_primary"
                onClick={handleFollowUser}
              >
                Follow
              </Button>
            </div>
            <div className={`${!myFollowingUsersId?.includes(id) && "hidden"}`}>
              <Button type="button" className="px-8 shad-button_primary"
                onClick={handleUnfollowUser}
              >
                Unfollow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {
        <div className="flex w-full max-w-5xl">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      }

      <Routes>
        <Route
          index
          element={<GridPostList posts={posts?.data.posts} showUser={false} />}
        />
        {/* {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )} */}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
