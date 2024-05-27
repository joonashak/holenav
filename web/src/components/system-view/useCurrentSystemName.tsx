import { useParams } from "react-router-dom";

/**
 * Get system name from URL params. Does not check for valid value but is
 * type-safe.
 */
const useCurrentSystemName = (): string => {
  const params = useParams<Record<"systemName", string | undefined>>();

  if (!params.systemName) {
    throw new Error("System name parameter is required.");
  }

  return params.systemName;
};

export default useCurrentSystemName;
