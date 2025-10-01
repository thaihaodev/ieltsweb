import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";

// Pages
import HomePage from "../pages/Home/HomePage";
import CoursesPage from "../pages/Courses/CoursesPage";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import ListeningPage from "../pages/Testing/Listening/ListeningPage";
import ReadingPage from "../pages/Testing/Reading/ReadingPage";
import WritingPage from "../pages/Testing/Writing/WritingPage";
import SpeakingPage from "../pages/Testing/Speaking/SpeakingPage";
import VipPackagesPage from "../pages/VipPackage/VipPackagesPage";
import MyVipPackagePage from "../pages/VipPackage/MyVipPackagePage";
import ForgotPasswordPage from "../pages/Login/ForgotPasswordPage";
import RegistrationSuccessPage from "../pages/Register/RegistrationSuccessPage";
import ProfilePage from "../pages/Profile/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register/success" element={<RegistrationSuccessPage />} />
       
      {/* Cần bọc Header và Footer */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/testing/listening" element={<ListeningPage />} />
        <Route path="/testing/reading" element={<ReadingPage />} />
        <Route path="/testing/writing" element={<WritingPage />} />
        <Route path="/testing/speaking" element={<SpeakingPage />} />
        <Route path="/vip-packages" element={<VipPackagesPage />} />
        <Route path="/my-vip-package" element={<MyVipPackagePage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
