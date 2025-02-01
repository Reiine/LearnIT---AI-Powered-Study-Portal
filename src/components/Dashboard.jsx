import React, { useState, useEffect } from "react";
import TeacherDash from "./TeacherDash";
import StudentDash from "./StudentDash";
import Cookies from "js-cookie";

function Dashboard({userName}) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRole = Cookies.get("role"); // Role is just an identifier, not a collection name
      if (userRole) {
        setRole(userRole)
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {role=='teacher'?
        <TeacherDash userName={userName} />
        :
        <StudentDash userName={userName} />
    
      }
    </>
  );
}

export default Dashboard;
