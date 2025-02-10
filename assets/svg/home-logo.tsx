import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const HomeLogo = (props: SvgProps) => (
  <Svg width={36} height={42} fill="none" {...props}>
    <Path
      fill={props.fill ?? '#000'}
      d="M27.876 19.466c-.18-.087-.362-.17-.546-.25-.322-5.973-3.557-9.393-8.991-9.428h-.074c-3.25 0-5.953 1.4-7.616 3.945l2.988 2.068c1.243-1.902 3.193-2.308 4.63-2.308h.05c1.788.012 3.138.537 4.012 1.56.636.745 1.061 1.774 1.272 3.073-1.586-.271-3.302-.355-5.136-.249-5.165.3-8.487 3.34-8.264 7.562.114 2.142 1.172 3.985 2.98 5.188 1.528 1.018 3.496 1.516 5.542 1.403 2.702-.15 4.821-1.19 6.3-3.09 1.123-1.444 1.833-3.315 2.146-5.672 1.288.783 2.242 1.815 2.77 3.055.895 2.107.948 5.57-1.854 8.394-2.455 2.474-5.406 3.544-9.865 3.577-4.947-.037-8.688-1.637-11.12-4.756C4.822 30.618 3.645 26.4 3.6 21c.044-5.4 1.221-9.618 3.499-12.538 2.432-3.119 6.173-4.72 11.12-4.756 4.983.037 8.789 1.645 11.314 4.779 1.239 1.537 2.172 3.47 2.788 5.723l3.502-.943c-.746-2.773-1.92-5.163-3.518-7.146C29.07 2.101 24.333.043 18.232 0h-.024C12.119.043 7.437 2.11 4.292 6.142 1.491 9.732.048 14.725 0 20.985v.03c.049 6.26 1.492 11.254 4.292 14.843 3.145 4.033 7.827 6.1 13.916 6.142h.024c5.413-.038 9.229-1.467 12.372-4.635 4.113-4.144 3.989-9.339 2.634-12.528-.973-2.287-2.827-4.144-5.362-5.37Zm-9.347 8.864c-2.264.128-4.616-.897-4.732-3.092-.086-1.628 1.149-3.445 4.872-3.661.426-.025.844-.037 1.255-.037 1.352 0 2.617.132 3.767.386-.429 5.404-2.945 6.28-5.162 6.404Z"
    />
  </Svg>
);
export default HomeLogo;
