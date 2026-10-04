"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Profile,
  QuotaType,
  AnalysisResponse,
  HistoryItem,
  FormContextType,
} from "@/types";

const initialProfile: Profile = {
  age: "",
  medicalConditions: "Tidak Ada",
  allergies: "Tidak Ada",
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<Profile>(initialProfile);
  const [selectedImage, setSelectedImageState] = useState<string | null>(null);
  const [analysisResult, setAnalysisResultState] = useState<AnalysisResponse | null>(null);
  const [quota, setQuotaState] = useState<QuotaType>({
    remaining: 5,
    total: 5,
  });
  const [history, setHistoryState] = useState<HistoryItem[]>([]);

  // Fetch kuota dari server + baca localStorage saat mounting
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Fetch kuota real-time dari server API
    fetch("/api/analyze")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.quota) {
          setQuotaState(data.quota);
          localStorage.setItem("curelens_quota", JSON.stringify(data.quota));
        }
      })
      .catch((err) => console.error("Gagal sinkronisasi kuota dari server:", err));

    // 2. Baca data tersimpan di localStorage
    const savedHistory = localStorage.getItem("curelens_history_v2");
    const savedImage = localStorage.getItem("curelens_saved_image");
    const savedAnalysis = localStorage.getItem("curelens_analysis_result");
    const savedProfile = localStorage.getItem("curelens_profile");

    if (savedProfile) {
      try {
        setProfileState(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Gagal membaca profil dari localStorage:", e);
      }
    }

    if (savedHistory) {
      try {
        setHistoryState(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Gagal membaca riwayat dari localStorage:", e);
      }
    }

    if (savedImage) setSelectedImageState(savedImage);

    if (savedAnalysis) {
      try {
        setAnalysisResultState(JSON.parse(savedAnalysis));
      } catch (e) {
        console.error("Gagal membaca hasil analisis dari localStorage:", e);
      }
    }
  }, []);

  const setProfile = (newProfile: React.SetStateAction<Profile>) => {
    setProfileState((prev) => {
      const updated = typeof newProfile === "function" ? newProfile(prev) : newProfile;
      localStorage.setItem("curelens_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const setSelectedImage = (image: string | null) => {
    setSelectedImageState(image);
    if (image) {
      localStorage.setItem("curelens_saved_image", image);
    } else {
      localStorage.removeItem("curelens_saved_image");
    }
  };

  const setAnalysisResult = (action: React.SetStateAction<AnalysisResponse | null>) => {
    setAnalysisResultState((prev) => {
      const updated = typeof action === "function" ? action(prev) : action;
      if (updated) {
        localStorage.setItem("curelens_analysis_result", JSON.stringify(updated));
      } else {
        localStorage.removeItem("curelens_analysis_result");
      }
      return updated;
    });
  };

  const setQuota = useCallback((action: React.SetStateAction<QuotaType>) => {
    setQuotaState((prev) => {
      const updated = typeof action === "function" ? action(prev) : action;
      localStorage.setItem("curelens_quota", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const setHistory = (action: React.SetStateAction<HistoryItem[]>) => {
    setHistoryState((prev) => {
      const updated = typeof action === "function" ? action(prev) : action;
      localStorage.setItem("curelens_history_v2", JSON.stringify(updated));
      return updated;
    });
  };

  const addHistoryItem = (newItem: HistoryItem) => {
    setHistoryState((prevHistory) => {
      const exists = prevHistory.some(
        (item) =>
          item.id === newItem.id ||
          (item.medicineName === newItem.medicineName && item.detail === newItem.detail)
      );
      if (exists) return prevHistory;

      const updated = [newItem, ...prevHistory];
      localStorage.setItem("curelens_history_v2", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteHistoryItem = (idToDelete: string) => {
    setHistoryState((prevHistory) => {
      const updated = prevHistory.filter((item) => item.id !== idToDelete);
      localStorage.setItem("curelens_history_v2", JSON.stringify(updated));
      return updated;
    });
  };

  const resetForm = () => {
    setProfileState(initialProfile);
    setSelectedImageState(null);
    setAnalysisResultState(null);
    localStorage.removeItem("curelens_profile");
    localStorage.removeItem("curelens_saved_image");
    localStorage.removeItem("curelens_analysis_result");
  };

  return (
    <FormContext.Provider
      value={{
        profile,
        setProfile,
        formData: profile,
        setFormData: setProfile,
        selectedImage,
        setSelectedImage,
        analysisResult,
        setAnalysisResult,
        quota,
        setQuota,
        history,
        setHistory,
        addHistoryItem,
        deleteHistoryItem,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};