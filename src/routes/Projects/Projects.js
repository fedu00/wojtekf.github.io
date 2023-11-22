import { useState, useEffect } from "react"
import AnimateSection from "../../components/AnimateSection/AnimateSection"
import { SectionWrapper } from "routes/Projects/Projects.styles"
import axios from "axios"
import ProjectsStack from "components/ProjectsStack/ProjectsStack"
import ProjectExperience from "components/ProjectsExperience/ProjectExperience"
import ProjectsContainer from "components/ProjectsContainer/ProjectsContainer"

const Projects = ({ projectsRef }) => {
  const [projects, setProjects] = useState([])
  const [experienceProjects, setExperienceProjects] = useState([])
  const [dropDownExperience, setDropDownExperience] = useState(false)

  const API_TOKEN = "1ab3a70712337882e49d01c85666d9"

  console.log("projects", projects)

  useEffect(() => {
    axios
      .post(
        "https://graphql.datocms.com/",
        {
          query: `
          {
            allExperiences{
              date
              title
              aboutProject
              role
              technologies
            }
              allProjects {
                id
                title
                stack
                content
                githublink
                websitelink
                shoplink
                image {
                  url
                }
              }
            }
      `,
        },
        {
          headers: {
            authorization: `Bearer ${API_TOKEN}`,
          },
        }
      )
      .then(({ data: { data } }) => {
        setExperienceProjects(data.allExperiences.reverse())
        setProjects(
          data.allProjects.map((element) => {
            return { ...element, stack: element.stack.split(",") }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <SectionWrapper ref={projectsRef}>
      <h2>Stack</h2>
      <div></div>
      <ProjectsStack />
      <ProjectExperience
        experienceProjects={experienceProjects}
        setDropDownExperience={setDropDownExperience}
        dropDownExperience={dropDownExperience}
      />
      <ProjectsContainer projects={projects} />
    </SectionWrapper>
  )
}

export default Projects
