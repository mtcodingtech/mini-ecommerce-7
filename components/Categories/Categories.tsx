"use client";
import { useCategories } from "@/hooks/useCategories";
import { CategoryType } from "@/types/general-types";
import { Container, Grid } from "@mui/material";
import React from "react";
import Category from "./Category";

function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <>
      <Container maxWidth="lg">
        <Grid container sx={{ border: "1px solid grey" }}>
          {categories
            .slice(0, 6)
            .map((category: CategoryType, index: number) => {
              const isLastChild = categories.slice(0, 6).length - 1 === index;
          
              return (
                <React.Fragment key={index}>
                  <Category
                    category={category}
                    index={index}
                    isLastChild={isLastChild}
                  />
                </React.Fragment>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}

export default Categories;
