import React,{useState,useEffect} from "react";
import Cookies from 'js-cookie'

function Quiz() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRole = Cookies.get("role"); // Role is just an identifier, not a collection name
      if (userRole) {
        setRole(userRole);
      }
    };

    fetchUserData();
  }, []);
  return <div></div>;
}

export default Quiz;
