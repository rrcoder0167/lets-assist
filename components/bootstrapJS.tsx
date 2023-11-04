'use client';
import React, { useEffect } from "react";

const BootstrapJS = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return null;
};

export default BootstrapJS;