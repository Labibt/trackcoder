import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  LandingPage,
  AuthPage,
  ProfilePage,
  FriendPage,
  LeaderboardPage,
  AddFriendPage,
  UpdateProfilePage,
  PasswordChangePage,
  ReportBugPage,
} from "../pages";

const AppRoutes = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/user/leaderboard" element={<LeaderboardPage />} />
        <Route path="/user/addFriend" element={<AddFriendPage />} />
        <Route path="/user/edit-profile" element={<UpdateProfilePage />} />
        <Route path="/user/password-change" element={<PasswordChangePage />} />
        <Route path="/user/friend/:friendname" element={<FriendPage />} />
        <Route path="/user/report-bug" element={<ReportBugPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRoutes;
