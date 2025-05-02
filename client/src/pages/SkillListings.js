import React, { useEffect, useState } from "react";
import axios from "axios";

function SkillListings() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Skill Listings</h1>
      <ul>
        {skills.map((skill) => (
          <li key={skill._id} className="mb-2">
            <strong>{skill.name}</strong>: {skill.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillListings;
