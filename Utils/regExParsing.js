module.exports.regexParsed = (text) => {
  let removedSpaces = text
    .toLowerCase()
    .replace(/\n+/g, "\n")
    .replace(/Curriculum\s*\n\s*Vitae/gi, "")
    .replace(/\s*Resume\s*/, "")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/(\S)\n(@\S+)/g, "$1$2")
    .replace(/(\S)@\n(\S+)/g, "$1@$2")
    .replace(/^\s+/gm, "")
    .replace(/\s+$/gm, "")
    .trim();
  removedSpaces += "\n";

  const obj = {};
  obj.name = removedSpaces.match(/^(.*)$/m)[1];
  obj.email = removedSpaces.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  )[0];
  const phonenumber = removedSpaces.match(
    /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3,5}\)?[-.\s]?){1,2}\d{3,5}/
  );

  if (phonenumber) obj.phoneNumber = phonenumber[0];

  let Summary = removedSpaces.match(
    /^Summary\s*([\s\S]*?)(?=\n\s*(education|projects|technical\s*\n\s*skills|$))/im
  );
  let Objective = removedSpaces.match(
    /^objective\s*([\s\S]*?)(?=\n\s*(education|projects|technical\s*\n\s*skills|experience|academic\s*qualifications?|$))/im
  );
  if (Summary) {
    obj.summary = Summary[0].replace(/^summary\s*.*?\n\s*/m, "");
  }
  if (Objective) {
    obj.objective = Objective[0].replace(/^objective\s*.*?\n\s*/m, "");
  }
  let Education = removedSpaces.match(
    /^(education|qualifications?|academic\s*qualifications?|educational\s*qualifications?)\s*([\s\S]*?)(?=\n\s*(projects|technical\s*skills?|experience|coursework|skills?|$))/im
  );
  if (Education) {
    let heading = Education[1];
    Education = Education[0].replace(heading, "").trim();
    obj.education = Education;
  }

  let Project = removedSpaces.match(
    /(?:^|\n)(Projects?|Personal\s*Projects?|Key\s*Projects?)\s*:?[\s\n]*([\s\S]*?)(?=\n\s*(technical\s*skill|skills|experience|leadership\s*experience|Education|coursework|$))/i
  );

  if (Project) {
    let heading = Project[1];
    Project = Project[0].replace(heading, "").trim();
    obj.project = Project;
  }
  let Experience = removedSpaces.match(
    /(?:^|\n)(experiences?|Work\s*experiences?|employment\s*history|career\s*experience?|Job\s*experiences?|professional\s*experiences?|relevant\s*experiences?|previous\s*employment|career\s*history|job\s*history|professional\s*background|career\s*overview)\s*:?[\s\n]*([\s\S]*?)(?=\n\s*(technical\s*skills?|skills?|education|coursework|projects?|personal\s*projects?|key\s*projects?|$))/i
  );
  if (Experience) {
    let heading = Experience[1];
    Experience = Experience[0].replace(heading, "").trim();
    obj.experience = Experience;
  }
  let Skills = removedSpaces.match(
    /(?:^|\n)(skills?|technical\s*skills|soft\s*skills)\s*:?[\s\n]*([\s\S]*?)(?=\n\s*(education|coursework|projects?|personal\s*projects?|key\s*projects?|activities?|languages?|personal\s*details?|experiences?|extra-curricular\s* activities|$))/i
  );
  if (Skills) {
    let heading = Skills[1];
    Skills = Skills[0].replace(heading, "").trim();
    obj.skills = Skills;
  }
  let Achievement = removedSpaces.match(
    /(?:^|\n)(achievements?)\s*:?[\s\n]*([\s\S]*?)(?=\n\s*(education|coursework|projects?|personal\s*projects?|key\s*projects?|activities?|languages?|personal\s*details?|experiences?|extra-curricular\s* activities|$))/i
  );
  if (Achievement) {
    let heading = Achievement[1];
    Achievement = Achievement[0].replace(heading, "").trim();
    obj.achievement = Achievement;
  }
  console.log(obj);
  return obj;
};
