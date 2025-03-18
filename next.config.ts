import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //images optimise jsut to make sure that our image is one that only get optimised
  images:{
    remotePatterns: [{
      hostname:"iwgg2l2l6b.ufs.sh",
      port: "",
      protocol: "https"
    }]
  }
};

export default nextConfig;
