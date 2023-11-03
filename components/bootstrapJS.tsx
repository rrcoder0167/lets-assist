'use client'
import { useEffect } from "react";

export default function bootstrapJS() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return null;
}