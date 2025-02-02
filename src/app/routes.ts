export const routeRoot = () => "";

// Authentication Routes
const routeAuth = () => routeRoot() + "/auth"; // Note that it is not exported, as it is not a valid route.
export const routeLogin = (params?: { redirectTo?: string }) => {
  const search = new URLSearchParams(params).toString();
  return routeAuth() + `/login${search ? "?" + search : ""}`;
};
export const routeSignup = () => routeAuth() + "/signup";

// Profile route
export const routeProfile = () => routeRoot() + "/profile";

// Project Routes
export const routeProjects = () => routeRoot() + "/projects";
export const routeProject = (projectId = ":projectId") =>
  routeProjects() + `/${projectId}`;
export const routeProjectExport = (projectId = ":projectId") =>
  routeProject(projectId) + `/export`;
