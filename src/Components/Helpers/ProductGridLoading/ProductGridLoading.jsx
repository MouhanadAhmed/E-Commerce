import React from "react"
import ContentLoader from "react-content-loader"

const ProductGridLoading = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#d2d0d0"
    foregroundColor="#f3f2f2"
    {...props}
  >
    <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    <circle cx="31" cy="31" r="15" /> 
    <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
    <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 
  </ContentLoader>
)

export default ProductGridLoading

