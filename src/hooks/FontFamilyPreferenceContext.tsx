import React, { createContext, ReactNode, useContext, useState } from "react";
import { USE_SYSTEM_FONT } from "../constants/fonts";

interface FontFamilyPreferenceValue {
  useSystemFont: boolean;
  setUseSystemFont: (value: boolean) => void;
}

const FontFamilyPreferenceContext = createContext<
  FontFamilyPreferenceValue | undefined
>(undefined);

export function FontFamilyPreferenceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [useSystemFont, setUseSystemFont] = useState(USE_SYSTEM_FONT);

  return (
    <FontFamilyPreferenceContext.Provider
      value={{ useSystemFont, setUseSystemFont }}
    >
      {children}
    </FontFamilyPreferenceContext.Provider>
  );
}

export function useFontFamilyPreference() {
  const context = useContext(FontFamilyPreferenceContext);
  if (!context) {
    throw new Error(
      "useFontFamilyPreference must be used within a FontFamilyPreferenceProvider",
    );
  }
  return context;
}
