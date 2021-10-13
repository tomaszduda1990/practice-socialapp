import { useEffect, useState } from "react";
import { debounce } from "lodash";

const useMediaQuery = (mediaQuery) => {
  const [match, setMatches] = useState(window.matchMedia(mediaQuery).matches);
  useEffect(() => {
    const handler = () => {
      setMatches(window.matchMedia(mediaQuery).matches);
    };
    window.addEventListener("resize", debounce(handler, 1000));
    return () => {
      window.removeEventListener("resize", debounce(handler, 1000));
    };
  }, []);
  return match;
};

export default useMediaQuery;
