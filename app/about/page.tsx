"use client";
import { useCategoryStore } from "@/store/useCategoryStore";
import React from "react";

function About() {
  const { selectedCategory } = useCategoryStore();
  console.log("About selectedCategory", selectedCategory);
  return (
    <div>
      <h2>MT</h2>
    </div>
  );
}

export default About;
