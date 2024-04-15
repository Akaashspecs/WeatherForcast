"use client";

import React, { createContext, ReactNode } from "react";

import { RootStore, RootType, RootStoreType } from "./models/RootStore"; // Import your MST root store instance

// Create a context for your MST store
const MobXContext = createContext<RootType | RootStoreType | null>(null);

// Create a provider component
export const MobXProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MobXContext.Provider value={RootStore}>{children}</MobXContext.Provider>
  );
};
