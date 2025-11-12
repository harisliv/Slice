import { createBrowserRouter, RouterProvider } from "react-router";
import PrivateContentProvider from "./PrivateContentProvider";
import HydratedErrorBoundary from "./HydratedErrorBoundary";
import {
  Home,
  CourseProfileDisplayMode,
  StudentManagement,
  MyStudents,
  WorkCentre,
  CourseProfile,
  CreateAssignment,
  AssignmentManagement,
} from "@app/pages";

const router = createBrowserRouter([
  {
    Component: PrivateContentProvider,
    ErrorBoundary: HydratedErrorBoundary,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/course-profile",
        children: [
          {
            Component: CourseProfileDisplayMode,
            index: true,
          },
          {
            path: "edit",
            Component: CourseProfile,
          },
          {
            path: "edit/initialStep/:initialStep/initialTab/:initialTab",
            Component: CourseProfile,
            loader: ({ params }) => ({
              initialTab: params.initialTab,
              initialStep: params.initialStep,
            }),
          },
        ],
      },
      {
        path: "/assignment-management",
        children: [
          {
            Component: AssignmentManagement,
            index: true,
          },
          {
            path: "create-assignment/new",
            Component: CreateAssignment,
          },
          {
            path: "create-assignment/:assignmentId",
            Component: CreateAssignment,
            loader: ({ params }) => ({
              assignmentId: params.assignmentId,
            }),
          },
        ],
      },
      {
        path: "/student-management",
        children: [
          {
            Component: StudentManagement,
            index: true,
          },
          {
            path: "my-students",
            Component: MyStudents,
          },
          {
            path: "work-centre",
            Component: WorkCentre,
          },
        ],
      },
    ],
  },
]);

export default function HydratedRouterProvider() {
  return <RouterProvider router={router} />;
}
