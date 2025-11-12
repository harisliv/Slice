import { ContentContainer, HeaderComponent } from "@app/lib/ui";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <ContentContainer>
      <HeaderComponent
        handleLogout={() => {
          // Logout functionality removed - no authentication
        }}
        menuItems={[
          {
            text: "Home",
            url: "/",
          },
          {
            text: "Course Profile",
            url: "/course-profile",
          },
          {
            text: "Assignment Management",
            url: "/assignment-management",
          },
          {
            text: "Student Management",
            url: "/student-management",
          },
        ]}
        LinkComponent={NavLink}
      />
    </ContentContainer>
  );
}
