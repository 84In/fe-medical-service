import {
  Achievement,
  Doctor,
  Education,
  Experience,
  WorkingHour,
} from "@/types";

export const addEducation = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void
) => {
  const newEducation: Education = {
    id: -Date.now(),
    degree: "",
    institution: "",
    year: "",
    description: "",
  };
  setDoctor({
    ...doctor,
    education: [...(doctor.education || []), newEducation],
  });
};

export const updateEducation = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number,
  field: keyof Education,
  value: string
) => {
  const updatedEducation = [...(doctor.education || [])];
  updatedEducation[index] = { ...updatedEducation[index], [field]: value };
  setDoctor({ ...doctor, education: updatedEducation });
};

export const removeEducation = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number
) => {
  const updatedEducation = [...(doctor.education || [])];
  updatedEducation.splice(index, 1);
  setDoctor({ ...doctor, education: updatedEducation });
};

export const addWorkExperience = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void
) => {
  const newExperience: Experience = {
    id: -Date.now(),
    position: "",
    organization: "",
    startYear: "",
    endYear: "",
    description: "",
  };
  setDoctor({
    ...doctor,
    workExperience: [...(doctor.workExperience || []), newExperience],
  });
};

export const updateWorkExperience = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number,
  field: keyof Experience,
  value: string
) => {
  const updatedExperience = [...(doctor.workExperience || [])];
  updatedExperience[index] = { ...updatedExperience[index], [field]: value };
  setDoctor({ ...doctor, workExperience: updatedExperience });
};

export const removeWorkExperience = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number
) => {
  const updatedExperience = [...(doctor.workExperience || [])];
  updatedExperience.splice(index, 1);
  setDoctor({ ...doctor, workExperience: updatedExperience });
};

export const addAchievement = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void
) => {
  const newAchievement: Achievement = {
    id: -Date.now(),
    title: "",
    year: "",
    type: "AWARD",
    description: "",
  };
  setDoctor({
    ...doctor,
    achievements: [...(doctor.achievements || []), newAchievement],
  });
};

export const updateAchievement = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number,
  field: keyof Achievement,
  value: string | Achievement["type"]
) => {
  const updatedAchievements = [...(doctor.achievements || [])];
  updatedAchievements[index] = {
    ...updatedAchievements[index],
    [field]: value,
  };
  setDoctor({ ...doctor, achievements: updatedAchievements });
};

export const removeAchievement = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number
) => {
  const updatedAchievements = [...(doctor.achievements || [])];
  updatedAchievements.splice(index, 1);
  setDoctor({ ...doctor, achievements: updatedAchievements });
};

export const updateWorkingHour = (
  doctor: Partial<Doctor> | Doctor,
  setDoctor: (doctor: any) => void,
  index: number,
  field: keyof WorkingHour,
  value: string | boolean
) => {
  const updatedHours = [...(doctor.workingHours || [])];
  updatedHours[index] = { ...updatedHours[index], [field]: value };
  setDoctor({ ...doctor, workingHours: updatedHours });
};
