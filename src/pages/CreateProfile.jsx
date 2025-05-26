import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import ProfileService from "../services/ProfileService";
import AuthService from "../services/AuthService";
import EditProfileForm from "../components/EditProfileForm";

const profileService = new ProfileService();
const authService = new AuthService();

export default function CreateProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    gender: "MALE",
    birthDate: "",
    location: "",
    bio: "",
    interests: "",
    profilePhoto: "",
    preferredRelationship: "CASUAL",
  });

  useEffect(() => {
    const user = authService.getUserInfo();
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchExistingProfile = async () => {
      try {
        const { data } = await profileService.getByUserId(user.id);
        if (data) {
          setFormData({
            name: data.name || user.firstname || "",
            lastName: data.lastName || user.lastname || "",
            gender: data.gender || "MALE",
            birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
            location: data.location || "",
            bio: data.bio || "",
            interests: data.interests || "",
            profilePhoto: data.profilePhoto || "",
            preferredRelationship: data.preferredRelationship || "CASUAL",
          });
        } else {
          setFormData((prev) => ({
            ...prev,
            name: user.firstname || "",
            lastName: user.lastname || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = authService.getUserInfo();
    if (!user) {
      navigate("/login");
      return;
    }

    const profileData = {
      user: {
        id: user.id,
        firstname: formData.name,
        lastname: formData.lastName,
      },
      name: formData.name,
      lastName: formData.lastName,
      gender: formData.gender,
      birthDate: formData.birthDate,
      location: formData.location,
      bio: formData.bio,
      interests: formData.interests,
      profilePhoto: formData.profilePhoto,
      preferredRelationship: formData.preferredRelationship
    };

    try {
      setLoading(true);
      const { data: existingProfile } = await profileService.getByUserId(user.id);

      if (existingProfile) {
        await profileService.update(existingProfile.id, profileData);
        profileService.clearCache();
      } else {
        await profileService.create(profileData);
        profileService.clearCache();
      }

      navigate("/profile", {
        update: true,
        state: {
          notification: {
            show: true,
            type: "success",
            message: t("profile.savedSuccess")
          }
        }
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(`${t("profile.errorSaving")} ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-gray-900 dark:text-gray-100">{t("common.loading")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 lg:pt-20 pb-20 pt-4">
        <EditProfileForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          t={t}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
