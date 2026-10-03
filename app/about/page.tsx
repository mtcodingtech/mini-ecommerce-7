"use client";
import { useCategoryStore } from "@/store/useCategoryStore";
import React from "react";

function About() {
  const { selectedCategory } = useCategoryStore();
  console.log("About selectedCategory", selectedCategory);
  return (
    <div>
      <h2>Khin Khin</h2>
    </div>
  );
}

export default About;
